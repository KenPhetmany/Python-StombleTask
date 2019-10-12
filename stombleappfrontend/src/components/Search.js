// frontend/src/components/Modal.js

import React, { Component } from "react";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = e => {
    this.props.onChange(e.target.value);
  };

  render() {
    return (
      <div>
        <label for="search-input">Search</label>

        <input id="search-input" onChange={this.handleChange} type="search" />
      </div>
    );
  }
}
