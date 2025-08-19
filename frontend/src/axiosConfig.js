import axios from 'axios';

const instance = axios.create({
baseURL:`https://todoapp-production-4378.up.railway.app/api`,
});

export default instance;
