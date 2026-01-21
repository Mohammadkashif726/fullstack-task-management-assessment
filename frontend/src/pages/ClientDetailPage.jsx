import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientDetail } from '../redux/actions/clientActions';
import { updateTaskStatus } from '../redux/actions/taskActions';

export default function ClientDetailPage() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { currentClient, loading, error } = useSelector((state) => state.clients);

    useEffect(() => {
        dispatch(fetchClientDetail(id));
    }, [dispatch, id]);

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="alert alert-danger text-center mt-5">Error: {error}</div>;
    }

    if (!currentClient) {
        return <div className="alert alert-warning text-center mt-5">Client not found</div>;
    }

    // Helper to group tasks by status
    const groupTasks = (tasks = []) => {
        const groups = { todo: [], doing: [], done: [] };
        tasks.forEach((task) => {
            const status = task.status?.toLowerCase();
            if (groups[status]) {
                groups[status].push(task);
            }
        });
        return groups;
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">{currentClient.full_label || currentClient.name}</h2>

            <h4 className="mb-4">Projects</h4>

            {currentClient.projects?.length === 0 ? (
                <p className="text-muted text-center">No projects found for this client.</p>
            ) : (
                currentClient.projects.map((project) => {
                    const grouped = groupTasks(project.tasks);

                    return (
                        <div key={project.id} className="card mb-5 shadow">
                            <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">{project.name}</h5>
                                {project.progress_percentage !== undefined && (
                                    <span className="badge bg-light text-dark">
                                        {project.progress_percentage}% Complete
                                    </span>
                                )}
                            </div>

                            <div className="card-body">
                                <div className="row g-4">
                                    {/* To Do Column */}
                                    <div className="col-md-4">
                                        <div className="p-3 bg-light border rounded h-100">
                                            <h5 className="text-danger mb-3">To Do</h5>
                                            {grouped.todo.length === 0 ? (
                                                <p className="text-muted small">No tasks</p>
                                            ) : (
                                                grouped.todo.map((task) => (
                                                    <TaskCard key={task.id} task={task} projectId={project.id} />
                                                ))
                                            )}
                                        </div>
                                    </div>

                                    {/* Doing Column */}
                                    <div className="col-md-4">
                                        <div className="p-3 bg-light border rounded h-100">
                                            <h5 className="text-warning mb-3">Doing</h5>
                                            {grouped.doing.length === 0 ? (
                                                <p className="text-muted small">No tasks</p>
                                            ) : (
                                                grouped.doing.map((task) => (
                                                    <TaskCard key={task.id} task={task} projectId={project.id} />
                                                ))
                                            )}
                                        </div>
                                    </div>

                                    {/* Done Column */}
                                    <div className="col-md-4">
                                        <div className="p-3 bg-light border rounded h-100">
                                            <h5 className="text-success mb-3">Done</h5>
                                            {grouped.done.length === 0 ? (
                                                <p className="text-muted small">No tasks</p>
                                            ) : (
                                                grouped.done.map((task) => (
                                                    <TaskCard key={task.id} task={task} projectId={project.id} />
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}

// Reusable Task Card with real status update
function TaskCard({ task, projectId }) {
    const dispatch = useDispatch();

    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        dispatch(updateTaskStatus(task.id, newStatus, projectId));
    };

    return (
        <div className="card mb-3 p-3 bg-white border">
            <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                <div className="flex-grow-1">
                    <strong className="d-block">{task.title}</strong>
                    <div className="small text-muted mt-1">
                        Assigned to: {task.user?.name || 'Unassigned'}
                    </div>
                    {task.is_overdue && (
                        <span className="badge bg-danger mt-1">Overdue</span>
                    )}
                </div>

                <select
                    className="form-select form-select-sm w-auto"
                    value={task.status}
                    onChange={handleStatusChange}
                >
                    <option value="todo">To Do</option>
                    <option value="doing">Doing</option>
                    <option value="done">Done</option>
                </select>
            </div>
        </div>
    );
}