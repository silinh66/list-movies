import {
  ADD_MOVIE,
  DELETE_MOVIE,
  getListMoviesDone,
  GET_LIST_MOVIES,
} from "./actions";
import { takeLatest, put, fork } from "redux-saga/effects";

function* WorkerGetListMovies(action) {
  var response;
  yield fetch("http://localhost:3000/movies")
    // yield fetch("https://5f85567cc29abd0016190651.mockapi.io/api/movies")
    .then((res) => res.json())
    .then((json) => {
      // console.log("result", json);
      response = json;
    });

  yield put(getListMoviesDone(response));
}

export function* watcherGetListMovies() {
  yield takeLatest(GET_LIST_MOVIES, WorkerGetListMovies);
}

function* WorkerDeleteMovie(action) {
  const requestOptions = {
    method: "DELETE",
  };

  yield fetch(
    "http://localhost:3000/movies/" + action.payload.id,
    requestOptions
  )
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log("Delete Success");
    });
}

export function* watcherDeleteMovie() {
  yield takeLatest(DELETE_MOVIE, WorkerDeleteMovie);
}

function* WorkerAddMovie(action) {
  // console.log('actionnnn', action);
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "NORMAL",
      id: action.payload.id,
      name: action.payload.movieName,
      releaseYear: action.payload.releaseYear,
    }),
  };

  yield fetch("http://localhost:3000/movies", requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log("Add Success", result);
    });
}

export function* watcherAddMovie() {
  yield takeLatest(ADD_MOVIE, WorkerAddMovie);
}

export function* homeScreenSaga() {
  yield fork(watcherGetListMovies);
  yield fork(watcherDeleteMovie);
  yield fork(watcherAddMovie);
}

export default [homeScreenSaga];
