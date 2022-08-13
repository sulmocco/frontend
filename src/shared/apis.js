import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_SERVER}/api`,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});

api.interceptors.request.use(function (config) {
  const accessToken = localStorage.getItem("token"); // localStorage에 TOKEN 저장
  if (accessToken) {
    config.headers.common["Authorization"] = `${accessToken}`;
  } // Header에 토큰을 넣어서 보내준다.
  return config;
});

const sulmoggoApi = {
  signUp: (user) => api.post("/signup", user),
  usernameCheck: (username) => api.get(`/checkUser/${username}`),
  login: (user) => api.post("/login", user),
  getProducts: () => api.get("/products"),
  live: () => api.get("/room/main"),
  today: () => api.get("/tables/main"),
  getTables: (params) =>
    api.get(
      `/tables?keyword=${params?.keyword}&alcohol=${
        params?.alcohol
      }&sort=${params?.sort}&page=${params?.page}&isAsc=${
        params?.isAsc || true
      }`
    ),
  img: () => api.post("/images"), // 술상 추천 게시글 작성 mock api
};

export default sulmoggoApi;
