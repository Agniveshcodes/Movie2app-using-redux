import { call, put } from "redux-saga/effects";
import { fecthShows, fecthShowsDetail } from "../Apis/api";
import { AnyAction } from "redux-saga";
import { showSliceDetailLoadedAction, showSLiceLoadedAction } from "../Slice/Show";

export function* fetchShows(action: AnyAction): Generator<any, any, any> {
  const shows = yield call(fecthShows, action.payload);
  yield put(showSLiceLoadedAction(shows));
}

export function* fetchShowsDetail(action: AnyAction): Generator<any, any, any> {
  const shows = yield call(fecthShowsDetail, action.payload);
  yield put(showSliceDetailLoadedAction(shows));
}
