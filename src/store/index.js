import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import NewsReducer from "./newsReducer";
import newsSaga from "./newsSaga";

const sagaMiddleware = createSagaMiddleware();
const store = compose(applyMiddleware(sagaMiddleware))(createStore)(
  NewsReducer
);

sagaMiddleware.run(newsSaga);
export default store;
