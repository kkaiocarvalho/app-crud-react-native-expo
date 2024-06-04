import axios from "axios";

const api = axios.create({
    baseURL: 'https://api-node-prisma-docker.onrender.com',
})

export default api;