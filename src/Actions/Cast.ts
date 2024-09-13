import { Cast } from "../Models/cast"
import { ActionCreator } from "./ActionCreator"

export const CAST_LOADED_ACTION = "CAST_LOADED_ACTION"

export const castLoadAction : ActionCreator<Cast[]> = (casts : Cast[]) => ({
    type : CAST_LOADED_ACTION ,
    payload : casts
})

export const CAST_DETAIL_LOAD = "CAST_DETAIL_LOAD"

export const castDetailLoadAction : ActionCreator<number> = (castId : number ) => ({
    type : CAST_DETAIL_LOAD ,
    payload : castId
})

export const CAST_DETAIL_LOADED = "CAST_DETAIL_LOADED"

export const castDetailLoadedAction : ActionCreator<Cast> = (cast : Cast) => ({
    type : CAST_DETAIL_LOADED ,
    payload : cast
})