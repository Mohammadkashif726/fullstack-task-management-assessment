import { FETCH_PROJECTS_SUCCESS } from "../actionTypes/projectTypes";

const initialState = [];

export default function projectReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_PROJECTS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
