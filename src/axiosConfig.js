import axios from "axios";

const instance = axios.create({
  baseURL: "https://test-system-3dgw.onrender.com/api/v1",
  // baseURL: "http://localhost:4000/api/v1",
  timeout: 30000,
  params: {
    lang: "en",
  },
  withCredentials: true,
});
export default instance;
