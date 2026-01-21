import {
    FETCH_TASKS_SUCCESS,
    UPDATE_TASK_STATUS_SUCCESS
} from "../actionTypes/taskTypes";

const initialState = [];

export default function taskReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_TASKS_SUCCESS:
            return action.payload;

        case UPDATE_TASK_STATUS_SUCCESS:
            return state.map((task) =>
                task.id === action.payload.taskId
                    ? { ...task, status: action.payload.status }
                    : task
            );

        default:
            return state;
    }
}
