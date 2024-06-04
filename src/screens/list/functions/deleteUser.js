import api from "../../../services/api";

export const removeUser = async (id, setLoading, setError, refresh) => {
    setLoading(true);

    try {
        await api.delete(`/user/${id}`)
        setLoading(false);
        refresh();
    } catch (e) {
        setLoading(false);
        setError(true);
    }
}