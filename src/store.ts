import { applyMiddleware, combineReducers, createStore } from "redux";
import showReducer from "./Reducers/showReducer";
import createSagaMiddleware from "redux-saga";
import { debounce, takeEvery } from "redux-saga/effects";
import { LOAD_SHOW_ACTION, SHOWS_QUERY_CHANGE } from "./Actions/Shows";
import { fetchShows, fetchShowsDetail } from "./Sagas/shows";
import { composeWithDevTools } from "@redux-devtools/extension";
import castReducer from "./Reducers/CastReducer";
import { CAST_DETAIL_LOAD } from "./Actions/Cast";
import { fetchCasts } from "./Sagas/cast";

const reducer = combineReducers({
  shows: showReducer,
  casts: castReducer
});

function* rootSaga() {
  yield debounce( 100 ,  SHOWS_QUERY_CHANGE, fetchShows);
  yield takeEvery(LOAD_SHOW_ACTION , fetchShowsDetail)
  yield takeEvery(CAST_DETAIL_LOAD , fetchCasts)
}

const sagaMiddleWare = createSagaMiddleware();

export type State = ReturnType<typeof reducer>;

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleWare))
);

sagaMiddleWare.run(rootSaga);

export default store;
