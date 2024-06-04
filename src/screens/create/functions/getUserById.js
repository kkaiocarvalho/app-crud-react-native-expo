import api from "../../../services/api";

export const getUserById = async (id, setLoading, setError) => {
    setLoading(true);
    try {
        const response = await api.get(`/user/${id}`)
        return response?.data
    } catch (e) {
        setLoading(false);
        setError(true);
    }
}