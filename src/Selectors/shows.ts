import { createSelector } from "reselect";
import { State } from "../store";

export function showsStateSelector(state: State) {
  return state.shows;
}

export const showsQuerySelector = createSelector(
  showsStateSelector,
  function (showState) {
    return showState.query;
  }
);

export const showsMapSelector = createSelector(
  showsStateSelector,
  function (showState) {
    return showState.entities;
  }
);

export const showsQyeryMapSelector = createSelector(
  showsStateSelector,
  function (showsState) {
    return showsState.queryShows;
  }
);

export const showsSelector = createSelector(
  showsMapSelector,
  showsQuerySelector,
  showsQyeryMapSelector,
  function (showsMap , query , querymap) {
    return querymap[query]?.map((showId) => {
      return showsMap[showId]
    })
  }
);

export const showsLoadingSelector = createSelector(
  showsStateSelector , function (showsState) {
    return showsState.loading
  }
)