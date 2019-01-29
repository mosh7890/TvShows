import {TOGGLE_ACTIVITY, TOGGLE_SEARCH, ADD_SHOW, SET_CURRENT_SHOW} from "../actions/action-types";

export const toggleActivity = trueOrFalse => ({type: TOGGLE_ACTIVITY, payload: trueOrFalse});
export const toggleSearch = trueOrFalse => ({type: TOGGLE_SEARCH, payload: trueOrFalse});
export const addShow = show => ({type: ADD_SHOW, payload: show});
export const setCurrentShow = show => ({type: SET_CURRENT_SHOW, payload: show});