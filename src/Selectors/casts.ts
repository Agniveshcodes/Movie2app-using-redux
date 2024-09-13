import { createSelector } from "reselect";
import { State } from "../store";

export function castStateSeletor(State: State) {
  return State.casts;
}

export const castMapSelector = createSelector(
  castStateSeletor,
  function (castState) {
    return castState.casts;
  }
);

export const castsNormalisedSelector = createSelector(
  castMapSelector,
  function (castMap) {
    return Object.keys(castMap).map((items) => castMap[+items]);
  }
);
