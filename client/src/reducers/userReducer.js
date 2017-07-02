import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.users, action) {
  console.log(action);
  switch (action.type) {
    case types.LOAD_USERS_SUCCESS:
      console.log(action);
      return Object.assign(
        {}, state, { users: action.users.users.rows, metadata: action.users.metadata }
        );
    case types.DELETE_USER_SUCCESS:
      return Object.assign({}, state, { users: [...state.users].filter((user) => {
        if (user.id !== action.id) {
          return user;
        }
      }) });
    default:
      return state;
  }
}
