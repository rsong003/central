import React, {Component} from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';




const data = [
      {name: 'Richard', Finished: 4000, Remaining: 2400},
      {name: 'Auste', Finished: 3000, Remaining: 1398},
      {name: 'Alexander', Finished: 2000, Remaining: 9800},
      {name: 'Daniel', Finished: 2780, Remaining: 3908},
      {name: 'Eddie', Finished: 1890, Remaining: 4800},
      {name: 'Timothy', Finished: 2390, Remaining: 3800},
      {name: 'Michael', Finished: 3490, Remaining: 4300},
];



export default class BarGraph extends Component{
  constructor(props){
    super(props)
    this.getUsers = this.getUsers.bind(this)
  }

  getUsers(){
    console.log(this.props)
  }

  render(){
    console.log('this is the bargraph', this.props.allTasksAndUsers)
    return (
    <BarChart width={600} height={300} data={this.props.allTasksAndUsers}
        margin={{top: 20, right: 30, left: 20, bottom: 5}}>
      <XAxis dataKey="name"/>
      <YAxis dataKey="incomplete"/>
      <CartesianGrid strokeDasharray="3 3"/>
      <Tooltip/>
      <Legend />
      <Bar dataKey="completed" stackId="a" fill="#8884d8" />
      <Bar dataKey="incomplete" stackId="a" fill="#E2624B" />
    </BarChart>
    )
  }
}