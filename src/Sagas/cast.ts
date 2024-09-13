import { AnyAction } from "redux-saga";
import { call, put } from "redux-saga/effects";
import { fetchCast } from "../Apis/api";
import { castDetailLoadAction, castLoadAction } from "../Actions/Cast";

export function* fetchCasts(action: AnyAction): Generator<any, any, any> {
   const casts = yield call(fetchCast , action.payload)
   console.log("casts in sagas" , casts)
    yield put(castLoadAction(casts))
  }