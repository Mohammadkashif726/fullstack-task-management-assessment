import { useDispatch, useSelector } from "react-redux";
import { fetchProjectsByClient } from "../redux/actions/projectActions";

export default function useProjects(clientId) {
    const dispatch = useDispatch();
    const projects = useSelector((state) => state.projects);

    const loadProjects = () => {
        dispatch(fetchProjectsByClient(clientId));
    };

    return { projects, loadProjects };
}
