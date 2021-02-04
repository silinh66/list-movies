import { combineReducers } from "redux-immutable";
import { GET_LIST_MOVIES_DONE } from "./actions";
import { fromJS } from "immutable";

export const initState = fromJS({
  listMovies: [],
});

export function rootReducer(state = initState, action) {
  // console.log("typeeeeeee", action.type);
  switch (action.type) {
    case GET_LIST_MOVIES_DONE:
      // console.log("listMoviesssssssssssss", action.payload.listMovies);
      return state.set("listMovies", action.payload.listMovies);
    default:
      return state;
  }
}

export default combineReducers({
  root: rootReducer,
});
