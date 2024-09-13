import { Show } from "../Models/show";
import { ActionCreator } from "./ActionCreator";

export const SHOW_LOADED = "SHOW_LOADED";

export const showLoadedAction: ActionCreator<Show[]> = (shows: Show[]) => ({
  type: SHOW_LOADED,
  payload: shows,
});

export const SHOWS_QUERY_CHANGE = "SHOWS_QUERY_CHANGE";

export const showsQueryAction: ActionCreator<string> = (query: string) => ({
  type: SHOWS_QUERY_CHANGE,
  payload: query,
});

export const SHOW_DETAIL_LOADED = "SHOW_DETAIL_LOADED";

export const showDetailLoadedAction: ActionCreator<Show> = (show: Show) => ({
  type: SHOW_DETAIL_LOADED,
  payload: show,
});

export const LOAD_SHOW_ACTION = "LOAD_SHOW_ACTION";

export const loadShowAction: ActionCreator<number> = (showId: number) => ({
  type: LOAD_SHOW_ACTION,
  payload: showId,
});
