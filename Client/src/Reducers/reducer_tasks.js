import { FETCH_TASKS, CREATE_TASK, GET_USERS_TASKS, GET_ALL_TASKS, FIND_ALL_TASKS_OF_USERS, GET_ALL_USERS } from '../Actions/index';

const INITIAL_STATE = { projectsByUser: [], allTasks: [], usersTasks: [], allTasksByUsers: [], allUsers: [], task: null };

export default function(state = INITIAL_STATE, action) {
  //console.log('this is the reducer', action)
  switch (action.type) {
  case FETCH_TASKS:
    //return state.allTasks.concat([action.payload.data]);
    // return {...state, allTasks: action.payload.data};
    return Object.assign({}, state, {projectsByUser: action.payload.data});
  case CREATE_TASK:
    return Object.assign({}, state, {allTasks: [...state.allTasks, action.payload]});

    //return Object.assign({}, state, {allTasks: action.payload.data});
  case GET_USERS_TASKS:
    return Object.assign({},state, {usersTasks: action.payload});
  case GET_ALL_TASKS:
    return Object.assign({}, state, {allTasks: action.payload})
  case FIND_ALL_TASKS_OF_USERS: 
    return Object.assign({}, state, {allTasksByUsers: action.payload})
  case GET_ALL_USERS: 
    return Object.assign({}, state, {allUsers: action.payload})
  default:
    return state;
  }
}
