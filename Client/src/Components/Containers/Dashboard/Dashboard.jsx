import React, {Component} from 'react';
import {render} from 'react-dom';
import {Redirect, Link, withRouter} from 'react-router-dom';


class Dashboard extends Component{

  render() {
    return(
      <div>
        <h1>Task Monkey Dashboard</h1>
        <Link to="/tasksList"><button>Tasks List</button></Link>
      </div>
    )
  }
}

export default withRouter(Dashboard);