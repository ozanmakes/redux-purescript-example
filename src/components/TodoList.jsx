import React, { Component, PropTypes } from "react"
import Todo from "./Todo"

export default class TodoList extends Component {
  renderTodo (todo) {
    return (
      <Todo key={todo.idx} {...todo} onClick={() => this.props.onTodoClick(todo.idx)} />
    )
  }

  render () {
    return (
      <ul>
        {this.props.todos.map(todo => this.renderTodo(todo))}
      </ul>
    )
  }
}
