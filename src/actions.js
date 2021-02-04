export const GET_LIST_MOVIES = "GET_LIST_MOVIES";
export const GET_LIST_MOVIES_DONE = "GET_LIST_MOVIES_DONE";
export const DELETE_MOVIE = "DELETE_MOVIE";
export const ADD_MOVIE = "ADD_MOVIE";

export function getListMovies() {
    return {
        type: GET_LIST_MOVIES,
        payload: {},
    }
}

export function getListMoviesDone(listMovies) {
    // console.log('listMovies222222222', listMovies);
    return {
        type: GET_LIST_MOVIES_DONE,
        payload: {
            listMovies
        },
    };
}

export function deleteMovie(id) {
    return {
        type: DELETE_MOVIE,
        payload: {
            id,
        }
    }
}

export function addMovie(id, movieName, releaseYear) {
    return {
        type: ADD_MOVIE,
        payload: {
            id,
            movieName,
            releaseYear,
        }      
    }
}

