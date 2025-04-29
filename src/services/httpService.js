import axios from "axios";

// axios.defaults.baseURL = 'https://swb-backend.onrender.com';

axios.defaults.baseURL = 'http://localhost:3001';
export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
}