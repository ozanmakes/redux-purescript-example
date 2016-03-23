import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import Actions, { addTodo, completeTodo, setVisibilityFilter } from "../Actions"
import AddTodo from "../components/AddTodo"
import TodoList from "../components/TodoList"
import Footer from "../components/Footer"
import Counter from "../components/Counter"

class App extends Component {
  render () {
    // Injected by connect() call:
    const { dispatch, visibleTodos, visibilityFilter, counter } = this.props
    return (
      <div>
        <AddTodo
          onAddClick={text =>
            dispatch(addTodo(text))
                     } />
        <TodoList
          todos={visibleTodos}
          onTodoClick={id =>
            dispatch(completeTodo(id))
                      } />
        <Footer
          filter={visibilityFilter}
          onFilterChange={nextFilter =>
            dispatch(setVisibilityFilter(nextFilter))
                         } />
        <Counter
          counter={counter}
          increment={() => dispatch(Actions.increment(5))}
          decrement={() => dispatch(Actions.decrementAsync(3))}
        />
      </div>
    )
  }
}

function selectTodos (todos, filter) {
  switch (filter) {
  case Actions.showCompleted:
    return todos.filter(todo => todo.completed)
  case Actions.showActive:
    return todos.filter(todo => !todo.completed)
  default:
    return todos
  }
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select (state) {
  return {
    visibleTodos: selectTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter,
    counter: state.counter
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(App)
