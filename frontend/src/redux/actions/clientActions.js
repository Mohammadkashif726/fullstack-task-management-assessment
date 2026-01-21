
import api from "../../api/axios";

// ── List of clients ──────────────────────────────────────────────
export const FETCH_CLIENTS_REQUEST = 'FETCH_CLIENTS_REQUEST';
export const FETCH_CLIENTS_SUCCESS = 'FETCH_CLIENTS_SUCCESS';
export const FETCH_CLIENTS_FAILURE = 'FETCH_CLIENTS_FAILURE';

export const fetchClients = () => async (dispatch) => {
    dispatch({ type: FETCH_CLIENTS_REQUEST });

    try {
        const res = await api.get('/clients'); // ✅
        dispatch({
            type: FETCH_CLIENTS_SUCCESS,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: FETCH_CLIENTS_FAILURE,
            payload: error.response?.data?.message || error.message
        });
    }
};

// ── Single client detail ─────────────────────────────────────────
export const FETCH_CLIENT_DETAIL_REQUEST = 'FETCH_CLIENT_DETAIL_REQUEST';
export const FETCH_CLIENT_DETAIL_SUCCESS = 'FETCH_CLIENT_DETAIL_SUCCESS';
export const FETCH_CLIENT_DETAIL_FAILURE = 'FETCH_CLIENT_DETAIL_FAILURE';

export const fetchClientDetail = (id) => async (dispatch) => {
    dispatch({ type: FETCH_CLIENT_DETAIL_REQUEST });

    try {
        const response = await api.get(`/clients/${id}`);
        dispatch({ type: FETCH_CLIENT_DETAIL_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({
            type: FETCH_CLIENT_DETAIL_FAILURE,
            payload: error.response?.data?.message || error.message
        });
    }
};