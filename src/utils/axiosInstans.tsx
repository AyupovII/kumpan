import axios from 'axios';
import { CONSTANTS } from '../constants';
 
const axiosInstance = axios.create({ 
	baseURL: CONSTANTS.BASE_URL_API,
	headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json, multipart/form-data'
	},
});

export default axiosInstance;
