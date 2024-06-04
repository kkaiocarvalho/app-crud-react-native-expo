import api from "../../../services/api";

export const getUser = async (setData, setLoading, setError) => {
    setLoading(true);
    try {
        const response = await api.get("/user");
        setData(response?.data);
        setLoading(false);
    } catch (error) {
        console.error("Erro na chamada à API:", error);
        setError(true);
        setLoading(false);
    }
};
