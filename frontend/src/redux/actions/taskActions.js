import api from "../../api/axios";
import {
    FETCH_TASKS_SUCCESS,
    UPDATE_TASK_STATUS_SUCCESS
} from "../actionTypes/taskTypes";

export const fetchTasksByProject = (projectId) => async (dispatch) => {
    const response = await api.get(`/projects/${projectId}`);
    dispatch({
        type: FETCH_TASKS_SUCCESS,
        payload: response.data.tasks,
    });
};

export const updateTaskStatus = (taskId, status) => async (dispatch) => {
    await api.patch(`/tasks/${taskId}`, { status });

    dispatch({
        type: UPDATE_TASK_STATUS_SUCCESS,
        payload: { taskId, status },
    });
};
