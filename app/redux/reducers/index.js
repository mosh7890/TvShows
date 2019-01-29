import {TOGGLE_ACTIVITY, TOGGLE_SEARCH, ADD_SHOW, SET_CURRENT_SHOW} from "../actions/action-types";

const initialState = {
    shows: [],
    waitingForResults: false,
    searchModalIsOpen: false,
    currentShow: {},
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_SHOW:
            return {...state, shows: action.payload};
        case TOGGLE_ACTIVITY:
            return {...state, waitingForResults: action.payload};
        case TOGGLE_SEARCH:
            return {...state, searchModalIsOpen: action.payload};
        case SET_CURRENT_SHOW:
            return {...state, currentShow: action.payload};
        default:
            return state;
    }
};

export default rootReducer;