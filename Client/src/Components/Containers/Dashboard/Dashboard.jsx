import React, {Component} from 'react';
import {render} from 'react-dom';
import {Redirect, Link, withRouter} from 'react-router-dom';
import PieGraph from './PieChart.jsx'
import BarGraph from './BarChart.jsx'
import NavTask from './NavTask.jsx'
import Auth from '../../../Auth/Auth.js'
import {connect} from 'react-redux'
import {getUsersTasks, getAllTasks, findAllTasksOfUser, getAllUsers} from '../../../Actions/index.js'
import {bindActionCreators} from 'redux'

const mapUserstoAllTasks = (allTasks, allUsers) =>{
  let nameObjects = {}
  let userObjects = []
  let users = []
  for (let i = 0; i < allUsers.length; i++){
    nameObjects[allUsers[i].id] = allUsers[i].username
    if (!users.includes(allUsers[i].username)){
      users.push(allUsers[i].username)
    }
  } 
  for (let i = 0; i < allTasks.length; i++){
    allTasks[i].owner = nameObjects[allTasks[i].owner]
  }
  for (let i = 0; i < users.length; i++){
    users[i] = getIncompleteVsComplete(users[i], allTasks)
  }
  return users
}

const getIncompleteVsComplete= (owner, tasksArray) => {
  let userObject = {name : owner, completed: 0, incomplete: 0}
  for (let i = 0; i < tasksArray.length; i++){
    if (tasksArray[i].owner === owner && tasksArray[i].status===-1){
      userObject.incomplete++
    }
    if (tasksArray[i].owner === owner && tasksArray[i].status===1){
      userObject.completed++
    }
  }
  console.log(userObject)
  return userObject
}

const mapStateToProps = (state) =>{
  //console.log('this is the state in main DASHBOARD', state)
  return {
    allTasks: state.tasks.allTasks,
    allUsers: state.tasks.allUsers,
    allTasksUsers: state.tasks.usersTasks,
    mappedUsersAndTasks : mapUserstoAllTasks(state.tasks.allTasks, state.tasks.allUsers)
  }
}
const mapDispathToProps = (dispatch) => {
  return bindActionCreators({getUsersTasks, getAllTasks, findAllTasksOfUser, getAllUsers}, dispatch)
}




class Dashboard extends Component{
  constructor(props) {
    super(props)
    this.state = {
      auth: new Auth()
      // barchart: []
    }
  }
  
  render() {
    console.log(this.state)
    return(
      <div className="dashboard-container">
        <div className="left-col">
					<div className="app-title">
						<h1>Task Mon</h1>
					</div>
          <NavTask />
        </div>
        {/* <div className ="col-sm-">

        </div> */}
        <div className="right-col">
					<div className="dashboard-title">
						<h1 className="pull-left">Dashboard</h1>
            <Link to="/login"><button className="logoutButton" onClick={this.state.auth.logout}>Logout</button></Link>
					</div>
					<div className="graph-container">
						<h3>HRLA16</h3>
            <hr></hr>
            <BarGraph allTasksAndUsers={this.props.mappedUsersAndTasks} allTasksUsers={this.props.allTasksUsers} allUsers={this.props.allUsers}/>
          	  
						<h3>Sprints</h3>
            <hr></hr>
						<div className="row">
              <PieGraph />
							{/* <div className="col-sm-4"><PieGraph /></div>
							<div className="col-sm-4"><PieGraph /></div>
							<div className="col-sm-4"><PieGraph /></div> */}
						</div>
					</div>
        </div>
      </div>
    )
  }
}

//export default connect(mapStateToProps, mapDispathToProps)(Dashboard)
export default connect(mapStateToProps, mapDispathToProps)(Dashboard)
