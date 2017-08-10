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



const mapStateToProps = (state) =>{
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
    users[i] = {name: users[i], completed: 0, incomplete: 0}
    for (let j = 0; j < allTasks.length; j++){
      console.log(allTasks[j].owner, users[i].name)
      if (allTasks[j].owner === users[i].name && allTasks[j].status === -1){
        users[i].incomplete++
      } else {
        users[i].completed++
      }
    }
  }
  




  console.log(users)

  console.log(nameObjects)
  console.log(allTasks)
}


class Dashboard extends Component{
  constructor(props) {
    super(props)
    this.state = {
      auth: new Auth()
    }
  }
  
  render() {
    
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
          	  <BarGraph allTasks={this.props.allTasks} allTasksUsers={this.props.allTasksUsers} allUsers={this.props.allUsers}/>
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
