import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createTask, fetchTasks} from '../../../Actions/index.js';
import MyModal from '../ProjectsList/TaskModal.jsx';

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    //function binding
    this.handleChange = this.handleChange.bind(this);
    this.handleTaskForm = this.handleTaskForm.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }
  toggleModal(){
    this.setState({
        showModal: !this.state.showModal
    });
  }

  handleChange(e) {
    e.preventDefault();
    console.log(e.target.name, nameForm.value);
  }

  handleTaskForm(nameVal, categoryVal, contentVal) {
    // // e.preventDefault();
    // axios.post('http://reduxblog.herokuapp.com/api/posts?key=taskmon', {name: nameVal, categories: categoryVal, content: contentVal})
    //   .then(res => {
    //     console.log('here is the post res', res);
    //     this.props.createTask(res);
    //   })
    //   .catch(err => {
    //     console.log('error in the post', err);
    //   });
  }

  render() {
    return (
      <div>
        <Button bsStyle="success" onClick={this.toggleModal}>Add Task</Button>
        <MyModal
          toggleModal={this.toggleModal}
          showModal={this.state.showModal}
          handleChange = {this.handleChange}
          handleTaskForm = {this.handleTaskForm}
        />
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({createTask, fetchTasks}, dispatch);
}

function mapStateToProps(state) {
  return { tasks: state.tasks.allTasks }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
