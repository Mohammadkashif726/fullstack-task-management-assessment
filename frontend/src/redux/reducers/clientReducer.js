import {
    FETCH_CLIENTS_REQUEST,
    FETCH_CLIENTS_SUCCESS,
    FETCH_CLIENTS_FAILURE,
    FETCH_CLIENT_DETAIL_REQUEST,
    FETCH_CLIENT_DETAIL_SUCCESS,
    FETCH_CLIENT_DETAIL_FAILURE
} from "../actionTypes/clientTypes";

const initialState = {
    list: [],
    currentClient: null,
    loading: false,
    error: null,
};

export default function clientReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_CLIENTS_REQUEST:
            return { ...state, loading: true, error: null };

        case FETCH_CLIENTS_SUCCESS:
            return {
                ...state,
                list: action.payload,
                loading: false,
                error: null
            };

        case FETCH_CLIENTS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case FETCH_CLIENT_DETAIL_REQUEST:
            return { ...state, loading: true, error: null };

        case FETCH_CLIENT_DETAIL_SUCCESS:
            return {
                ...state,
                currentClient: action.payload,
                loading: false,
                error: null
            };

        case FETCH_CLIENT_DETAIL_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
}