import { AnyAction } from "redux";
import { produce } from "immer";
import { Show } from "../Models/show";
import {
  SHOW_DETAIL_LOADED,
  SHOW_LOADED,
  SHOWS_QUERY_CHANGE,
} from "../Actions/Shows";
import { normalize, schema } from "normalizr";

export type State = {
  query: string;
  shows: { [showId: number]: Show };
  queryShows: { [query: string]: number[] };
  loading : boolean
};

export const initialState: State = {
  shows: {},
  query: "",
  queryShows: {},
  loading : true
};

function showReducer(State = initialState, action: AnyAction) {
  switch (action.type) {
    case SHOW_LOADED:
      return produce(State, (draft) => {
        const shows = action.payload as Show[];

        const showsSchema = new schema.Entity("shows");

        const normalizedShows = normalize(shows, [showsSchema]);

        draft.loading = false

        draft.queryShows[draft.query] = normalizedShows.result;

        draft.shows = { ...draft.shows, ...normalizedShows.entities.shows };
      });
    case SHOWS_QUERY_CHANGE:
      return produce(State, (draft) => {
        draft.loading = true
        draft.query = action.payload as string;
      });
    case SHOW_DETAIL_LOADED:
      return produce(State, (draft) => {
        const show = action.payload as Show;
        draft.shows[show.id] = show;
      });
  }

  return State;
}

export default showReducer;
