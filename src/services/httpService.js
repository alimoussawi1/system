import axios from "axios";

axios.defaults.baseURL = 'https://swb-backend.onrender.com';

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
}