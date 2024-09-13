import createSagaMiddleware from "redux-saga";
import { debounce, takeEvery } from "redux-saga/effects";
import { fetchShows, fetchShowsDetail } from "./Sagas/shows";
import { fetchCasts } from "./Sagas/cast";
import { configureStore } from "@reduxjs/toolkit";
import showReducer, { loadSliceShowAction, showSliceQueryAction } from "./Slice/Show";
import CastReducer, { castSliceDetailLoadAction } from "./Slice/Cast";

function* rootSaga() {
  yield debounce(100, showSliceQueryAction, fetchShows);
  yield takeEvery(loadSliceShowAction, fetchShowsDetail);
  yield takeEvery(castSliceDetailLoadAction, fetchCasts);
}

const sagaMiddleWare = createSagaMiddleware();

const store = configureStore({
  reducer: { shows: showReducer, casts: CastReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleWare),
});

sagaMiddleWare.run(rootSaga);

export type State = ReturnType<typeof store.getState>;

export default store;
