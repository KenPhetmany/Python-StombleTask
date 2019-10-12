// frontend/src/App.js

import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";
import Search from "./components/Search";

class App extends Component {
  constructor(props) {
    super(props);
    this.searchByString = this.searchByString.bind(this);
    this.state = {
      stringtofilter: "",
      modal: false,
      currentItem: {
        title: "",
        description: "",
        date_due: "",
        completed: false
      },
      todoList: []
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  handlecompleted(item) {
    item.completed = !item.completed;
    axios.put("http://localhost:8000/api/todolists/" + item.id + "/", {
      completed: item.completed,
      date_due: item.date_due,
      description: item.description,
      title: item.title
    });
  }

  refreshList = () => {
    axios
      .get("http://localhost:8000/api/todolists/")
      .then(res => this.setState({ todoList: res.data }))
      .catch(err => console.log(err));
  };

  searchByString(s) {
    this.setState({ stringtofilter: s });
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  renderTableData() {
    return this.state.todoList
      .filter((item, index) => {
        console.log("strinf to filter" + this.state.stringtofilter);
        return item.title
          .toUpperCase()
          .includes(this.state.stringtofilter.toUpperCase());
      })
      .map((item, index) => {
        const { id, title, description, date_due, completed } = item;
        return (
          <tr key={id}>
            <td>{id}</td>
            <td>{title}</td>
            <td>{description}</td>
            <td>{date_due}</td>
            <td>
              <input
                type="checkbox"
                defaultChecked={completed}
                onClick={() => this.handlecompleted(item)}
              ></input>
            </td>
            <td>
              <button
                onClick={() => this.handleDelete(item)}
                className="btn btn-danger"
              >
                Delete item
              </button>
            </td>
          </tr>
        );
      });
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = item => {
    this.toggle();
    if (item.id) {
      axios
        .put(`http://localhost:8000/api/todolists/${item.id}/`, item)
        .then(res => this.refreshList());
      return;
    }
    axios
      .post("http://localhost:8000/api/todolists/", item)
      .then(res => this.refreshList());
  };
  handleDelete = item => {
    axios
      .delete(`http://localhost:8000/api/todolists/${item.id}`)
      .then(res => this.refreshList());
  };

  createItem = () => {
    const item = {
      title: "",
      description: "",
      date_due: "",
      completed: false
    };
    this.setState({ currentItem: item, modal: !this.state.modal });
  };

  renderTableHeader() {
    const headers = ["id", "title", "description", "date_due", "completed", ""];
    return headers.map(header => {
      return <th key={header}>{header.toUpperCase()}</th>;
    });
  }

  render() {
    return (
      <main className="content">
        <div>
          <h1 id="title">ToDo List </h1>
          <Search onChange={this.searchByString} />
          <div style={{ display: "flex" }}>
            <button
              onClick={this.createItem}
              style={{ marginLeft: "88%" }}
              className="btn-primary"
            >
              Add
            </button>
          </div>
          <table id="todoList">
            <thead>
              <tr>{this.renderTableHeader()}</tr>
            </thead>
            <tbody>{this.renderTableData()}</tbody>
          </table>
        </div>
        {this.state.modal ? (
          <Modal
            currentItem={this.state.currentItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}

export default App;
