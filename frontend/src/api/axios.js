import Axios from "axios";

function authRequestInterceptor(config) {
  const token = JSON.parse(localStorage.getItem("token"));

  config.headers.authorization = "Bearer " + token;
  config.headers.Accept = "application/json";

  return config;
}
/* eslint-enable no-param-reassign */

const axios = Axios.create({
  // baseURL: "http://127.0.0.1:5000/",
  baseURL: "https://ziplink-ctt0.onrender.com",
});

axios.interceptors.request.use(authRequestInterceptor);

export default axios;
