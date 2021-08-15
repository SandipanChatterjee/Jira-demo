import axios from "axios";
const baseURL = process.env.REACT_APP_API_URL;
console.log("baseUrl###", baseURL);
const instance = axios.create({
  baseURL: baseURL,
});

instance.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (config) => {
    console.log("responseConfig#", config);
    return config.data;
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  }
);

export default instance;
