import { combineReducers } from "redux";
import clientReducer from "./clientReducer";
import projectReducer from "./projectReducer";
import taskReducer from "./taskReducer";

export default combineReducers({
    clients: clientReducer,
    projects: projectReducer,
    tasks: taskReducer,
});
