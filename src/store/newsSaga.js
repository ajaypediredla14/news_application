import { call, put, takeEvery } from "redux-saga/effects";
import { getNewsSources, getSingleSource } from "../services/news.service";
import {
  setSourceFailure,
  setSourcesFailure,
  setSourcesSuccess,
  setSourceSuccess,
} from "./NewsActions";
import { SET_SOURCES_REQUESTED, SET_SOURCE_REQUESTED } from "./newsActiontypes";

//Saga middleware generator function to call the all sources api and set it to redux store
function* setSourcesSaga() {
  try {
    const res = yield call(getNewsSources);
    yield put(setSourcesSuccess(res.sources));
  } catch (e) {
    yield put(setSourcesFailure());
  }
}

//Saga middleware generator function to call the all headlines from single api and set it to redux store
function* setSourceSaga(action) {
  try {
    const res = yield call(getSingleSource, action.payload.id);
    yield put(
      setSourceSuccess({ articles: res.articles, id: action.payload.index })
    );
  } catch (e) {
    yield put(setSourceFailure());
  }
}

// generator middleware function to watch the actiontypes to trigger and takeEvery action dispatched for following types
function* newsSaga() {
  yield takeEvery(SET_SOURCES_REQUESTED, setSourcesSaga);
  yield takeEvery(SET_SOURCE_REQUESTED, setSourceSaga);
}

export default newsSaga;
