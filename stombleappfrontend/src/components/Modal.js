// frontend/src/components/Modal.js

import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItem: this.props.currentItem
    };
  }
  handleChange = e => {
    let { name, value } = e.target;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    const currentItem = { ...this.state.currentItem, [name]: value };
    this.setState({ currentItem });
  };
  render() {
    const { toggle, onSave } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Todo Item </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                value={this.state.currentItem.title}
                onChange={this.handleChange}
                placeholder="Enter Todo Title"
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="text"
                name="description"
                value={this.state.currentItem.description}
                onChange={this.handleChange}
                placeholder="Enter description"
              />
            </FormGroup>
            <FormGroup>
              <Label for="date_due">Date due</Label>
              <Input
                type="date"
                name="date_due"
                value={this.state.currentItem.due_date}
                onChange={this.handleChange}
                placeholder="Enter Due Date"
              />
            </FormGroup>
            <FormGroup check></FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.currentItem)}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
