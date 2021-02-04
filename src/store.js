import { createStore, compose, applyMiddleware } from "redux";
import { fromJS } from "immutable";

import createSagaMiddleware from "redux-saga";

import rootSaga from "./saga";
import reducer from "./reducer";

const middleWare = [];

let sagaMiddleware = null;
// eslint-disable-next-line import/no-mutable-exports
let store = null;

sagaMiddleware = createSagaMiddleware();
middleWare.push(sagaMiddleware);
store = createStore(
  reducer,
  fromJS({}),
  compose(applyMiddleware(...middleWare))
);

rootSaga.map(sagaMiddleware.run);

export default store;
