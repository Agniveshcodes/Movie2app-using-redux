import { AnyAction } from "redux";
import { produce } from "immer";
import { Cast } from "../Models/cast";
import { CAST_DETAIL_LOADED, CAST_LOADED_ACTION } from "../Actions/Cast";
import { normalize, schema } from "normalizr";

export type State = {
  casts: { [id: number]: Cast };
};

export const initialState: State = {
  casts: {},
};

function castReducer(State = initialState, action: AnyAction) {
  switch (action.type) {
    case CAST_LOADED_ACTION:
      return produce(State, (draft) => {
        const casts = action.payload as Cast[];

        const castSchema = new schema.Entity("casts");

        const normalizeCast = normalize(casts, [castSchema]);

        draft.casts = {...normalizeCast.entities.casts!};
      });
      case CAST_DETAIL_LOADED:
        return produce(State , (draft) => {
          const cast = action.payload as Cast

          draft.casts[cast.id] = cast 
        })
  }

  return State;
}

export default castReducer;
