import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cast } from "../Models/cast";
import { normalize, schema } from "normalizr";

type State = {
  casts: { [id: number]: Cast };
};

const initialState: State = {
  casts: {},
};


const castSlice = createSlice({
  name: "casts",
  initialState,
  reducers: {
    castLoadAction,
    castDetailLoadedAction,
    castDetailLoadAction: (state: State, action: PayloadAction<number>) => {
     console.log( state , action)
    },
  },
});

function castLoadAction(state: State, action: PayloadAction<Cast[]>) {
  const casts = action.payload as Cast[];

  const castSchema = new schema.Entity("casts");

  const normalizeCast = normalize(casts, [castSchema]);

  state.casts = { ...normalizeCast.entities.casts! };
}

function castDetailLoadedAction(state: State, action: PayloadAction<Cast>) {
  const cast = action.payload as Cast;

  state.casts[cast.id] = cast;
}

const { actions, reducer: CastReducer } = castSlice;

export const {
  castLoadAction: castSliceLoadAction,
  castDetailLoadAction: castSliceDetailLoadAction,
  castDetailLoadedAction: castSliceDetailLoadedAction,
} = actions;

export default CastReducer;
