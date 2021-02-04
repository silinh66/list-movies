import { createSelector } from "reselect";

const getMoviesState = () => (state) => state.get("root");

const getListMoviesSelector = () =>
  createSelector(getMoviesState(), (listMoviesState) =>
    listMoviesState.get("listMovies")
  );

export { getListMoviesSelector };
