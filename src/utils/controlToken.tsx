import { store } from "../store/store";
import axiosInstans from "./axiosInstans";

export const saveToken = (token: string) => {
    axiosInstans.interceptors.request.use((config) => {
        config.headers["Authorization"] = `Bearer ${token}`;
        return config;
    })
    store.user.token = token;
    
    localStorage.setItem('token', token)
}

export const removeToken = () => {
    axiosInstans.interceptors.request.use((config) => {
      delete config.headers['Authorization'];
      return config;
    })
    store.user.token = "";
    localStorage.removeItem('token');
  }