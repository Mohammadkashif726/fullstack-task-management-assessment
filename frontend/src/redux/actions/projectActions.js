import api from "../../api/axios";
import { FETCH_PROJECTS_SUCCESS } from "../actionTypes/projectTypes";

export const fetchProjectsByClient = (clientId) => async (dispatch) => {
    const response = await api.get(`/clients/${clientId}`);
    dispatch({
        type: FETCH_PROJECTS_SUCCESS,
        payload: response.data.projects,
    });
};
