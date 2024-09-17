import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Show } from "../Models/show";

const showsAdapter = createEntityAdapter<Show>();

const initialState = showsAdapter.getInitialState({
  query: "",
  queryShows: {} as { [query: string]: number[] },
  loading: true,
});

export type State = typeof initialState;

const showSlice = createSlice({
  name: "shows",
  initialState,
  reducers: {
    showLoadedAction,
    showsQueryAction,
    showDetailLoadedAction: showsAdapter.addOne,
    loadShowAction: (state: State, action: PayloadAction<number>) => {
      console.log(state , action)
    },
  },
});

function showLoadedAction(state: State, action: PayloadAction<Show[]>) {
  const shows = action.payload as Show[];
  state.loading = false;
  state.queryShows[state.query] = shows.map((s) => s.id);
  showsAdapter.addMany(state, action);
}

function showsQueryAction(state: State, action: PayloadAction<string>) {
  state.loading = true;
  state.query = action.payload;
}

const { actions, reducer: showReducer } = showSlice;

export const {
  showLoadedAction: showSLiceLoadedAction,
  showsQueryAction: showSliceQueryAction,
  showDetailLoadedAction: showSliceDetailLoadedAction,
  loadShowAction: loadSliceShowAction,
} = actions;

export default showReducer;
