import axios from "axios";
import Cookies from "js-cookie";
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: `${VITE_BACKEND_URL}`,
  withCredentials: true,
});

const refreshAccessToken = async () => {
  try {
    await axiosInstance.post("/api/auth/refresh-token");

    return true;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    Cookies.remove("accessToken");
    window.location.href = "/auth/login";
  }
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();

        if (newAccessToken) {
          axiosInstance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        }

        return Promise.reject(error);
      } catch (refreshError) {
        console.error("Error refreshing access token:", refreshError);
      }
    }

    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
