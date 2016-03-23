module Reducers where

import Prelude
import Data.Maybe (Maybe(Just))
import Data.Array ((:))
import Data.Foldable (maximum)

import Redux.Reducer (ReduxReducer, Reducer, reducer)
import Actions

newtype Todo =
  Todo {idx :: Int
       ,text :: String
       ,completed :: Boolean}

newtype TodoList = TodoList (Array Todo)

visibilityImpl :: Reducer TodoAction VisibilityFilter
visibilityImpl (SetVisibilityFilter filter) _  = filter
visibilityImpl _ filter = filter

visibilityFilter :: ReduxReducer TodoAction VisibilityFilter
visibilityFilter = reducer visibilityImpl showAll

todosImpl :: Reducer TodoAction TodoList
todosImpl (TodoCreate text) (TodoList xs) = TodoList (x : xs)
  where x = Todo { idx: idx, text: text, completed: false }
        idx = case maximum (map getIdx xs) of
                Just num -> num + 1
                otherwise -> 0
        getIdx (Todo todo) = todo.idx
todosImpl (TodoComplete idx) (TodoList xs) = TodoList (map f xs)
  where f (Todo todo)
          | todo.idx == idx = Todo (todo {completed = true})
        f p = p
-- If our patterns are not exhaustive we need to define a fallback that returns
-- the state unchanged. In this case it is necessary because our reducer doesn't
-- handle SetVisibilityFilter action.
todosImpl _ state = state

todos :: ReduxReducer TodoAction TodoList
todos = reducer todosImpl (TodoList [])  -- Empty list is the initial value

counterImpl :: Reducer CounterAction Int
counterImpl (Increment amount) n = n + amount
counterImpl (Decrement amount) n = n - amount

counter :: ReduxReducer CounterAction Int
counter = reducer counterImpl 0  -- 0 is the initial value
