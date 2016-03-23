module Actions where

import Prelude
import Control.Monad.Aff (later')
import Control.Monad.Reader.Trans (lift)
import Data.Generic (class Generic, gShow)

import Redux.Action (Action, action, dispatch, asyncAction)

data CounterAction
  = Increment Int
  | Decrement Int
derive instance genericCounterAction :: Generic CounterAction
instance showCounterAction :: Show CounterAction where
  show = gShow

data VisibilityFilter
  = ShowAll
  | ShowActive
  | ShowCompleted
derive instance genericVisibilityFilter :: Generic VisibilityFilter
instance showVisibilityFilter :: Show VisibilityFilter where
  show = gShow

data TodoAction
  = TodoCreate String
  | TodoComplete Int
  | SetVisibilityFilter VisibilityFilter
derive instance genericTodoAction :: Generic TodoAction
instance showTodoAction :: Show TodoAction where
  show = gShow

showAll :: VisibilityFilter
showAll = ShowAll

showCompleted :: VisibilityFilter
showCompleted = ShowCompleted

showActive :: VisibilityFilter
showActive = ShowActive

-- Simple actions
increment :: Int -> Action CounterAction
increment = action <<< Increment

decrement :: Int -> Action CounterAction
decrement = action <<< Decrement

-- This demonstrates async actions. This creates a thunk that will be processed
-- by redux-thunk middleware. You can do async calls using libs like Affjax and
-- dispatch new actions based on the result.
decrementAsync n =
  asyncAction $
  do action <- lift <<< later' 1000 $ pure (decrement n)
     dispatch action

addTodo :: String -> Action TodoAction
addTodo = action <<< TodoCreate

completeTodo :: Int -> Action TodoAction
completeTodo = action <<< TodoComplete

setVisibilityFilter :: VisibilityFilter -> Action TodoAction
setVisibilityFilter filter = action (SetVisibilityFilter filter)
