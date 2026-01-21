import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClients } from '../redux/actions/clientActions';

export default function useClients() {
    const dispatch = useDispatch();

    const { list, loading, error } = useSelector(
        state => state.clients
    );

    useEffect(() => {
        dispatch(fetchClients());
    }, [dispatch]);

    return {
        clients: list || [],
        loading,
        error
    };
}
