import * as types from '../actions/actionTypes';
import initialState from './initialState';
/**
 * 
 * 
 * @export
 * @param {any} [state=initialState.search] 
 * @param {any} action 
 * @returns {object} state 
 */
export default function searchReducer(state = initialState.search, action) {
  switch (action.type) {
    case types.SEARCH_SUCCESS:
      return Object.assign(
        {}, state, { search: [...action.search], metadata: [...action.metadata] }
      );
    default:
      return state;
  }
}

