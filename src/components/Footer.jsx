import React, { Component, PropTypes } from "react"
import Actions from "../Actions";

export default class Footer extends Component {
  renderFilter(filter, name) {
    if (filter === this.props.filter) {
      return name
    }

    return (
      <a href="#" onClick={e => {
          e.preventDefault()
          this.props.onFilterChange(filter)
        }}>
        {name}
      </a>
    )
  }

  render() {
    return (
      <p>
        Show:
        {" "}
        {this.renderFilter(Actions.showAll, "All")}
        {", "}
        {this.renderFilter(Actions.showCompleted, "Completed")}
        {", "}
        {this.renderFilter(Actions.showActive, "Active")}
        .
      </p>
    )
  }
}

Footer.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  filter: PropTypes.oneOf([
    Actions.showAll,
    Actions.showCompleted,
    Actions.showActive
  ]).isRequired
}
