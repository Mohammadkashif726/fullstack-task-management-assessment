import { useNavigate } from 'react-router-dom';
import useClients from '../hooks/useClients';

export default function ClientsPage() {
    const { clients, loading, error } = useClients();
    const navigate = useNavigate();

    if (loading) return <div className="text-center mt-5"><div className="spinner-border"></div> Loading...</div>;
    if (error) return <div className="alert alert-danger text-center">Error: {error}</div>;

    return (
        <div>
            <h2 className="mb-4">Clients</h2>

            <table className="table table-bordered table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>Client</th>
                        <th>Projects</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client => (
                        <tr key={client.id}>
                            <td>{client.full_label || client.name}</td>
                            <td>{client.projects?.length || 0}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-primary"
                                    onClick={() => navigate(`/clients/${client.id}`)}
                                >
                                    View Projects
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {clients.length === 0 && (
                <div className="alert alert-info mt-4 text-center">No clients found</div>
            )}
        </div>
    );
}