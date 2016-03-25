module Actions
  ( RedditAction(..), Subreddit, Post
  , selectSubreddit
  , invalidateSubreddit
  , fetchPostsIfNeeded
  ) where

import Prelude

import Control.Bind ((>=>))
import Control.Monad.Reader.Trans (lift)
import Control.Monad.Eff.Class (liftEff)
import Control.Monad (when)

import Data.Either (Either(..))
import Data.Maybe (Maybe(..))
import Data.Foreign (Foreign, unsafeFromForeign)
import Data.Foreign.Class (class IsForeign, readJSON, readProp)
import Data.Foreign.Index (prop)
import Data.Date (nowEpochMilliseconds)
import Data.Time (Milliseconds)
import Data.StrMap as StrMap

import Network.HTTP.Affjax (get)

import Redux.Action (action, asyncAction, dispatch, getState)

newtype Post = Post Foreign
instance postIsForeign :: IsForeign Post where
  read value = Post <$> readProp "data" value

newtype PostList = PostList (Array Post)
instance responseIsForeign :: IsForeign PostList where
  read value = PostList <$> (value # (prop "data" >=> readProp "children"))

type Subreddit = String

data RedditAction
  = SelectSubreddit Subreddit
  | InvalidateSubreddit Subreddit
  | RequestPosts Subreddit
  | ReceivePosts Subreddit
                 (Array Post)
                 Milliseconds

selectSubreddit = action <<< SelectSubreddit

invalidateSubreddit = action <<< InvalidateSubreddit

fetchPosts subreddit =
  do result <- get ("https://www.reddit.com/r/" ++ subreddit ++ ".json")
     now <- liftEff nowEpochMilliseconds
     return $
       case readJSON result.response of
         Right (PostList posts) -> Just (ReceivePosts subreddit posts now)
         _ -> Nothing

shouldFetchPosts state subreddit =
  case StrMap.lookup subreddit state.postsBySubreddit of
    Nothing -> true
    Just {isFetching: true} -> false
    Just posts -> posts.didInvalidate

fetchPostsIfNeeded subreddit =
  asyncAction $
  do state <- unsafeFromForeign <$> getState
     when (shouldFetchPosts state subreddit) $
       do dispatch $ action (RequestPosts subreddit)
          result <- lift $ fetchPosts subreddit
          case result of
            Just a -> dispatch (action a)
            Nothing -> pure unit
