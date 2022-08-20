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
  console.log(accessToken);
  if (accessToken) {
    config.headers.common.authorization = accessToken;
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
  getTables: (params) => api.get("/tables", { params }),
  img: (formData) =>
    api.post("/images", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }), // 술상 추천 게시글 작성 이미지 가로채기
  tables: (newData) => api.post("/tables", newData),
  deletePost: (tableId) => api.delete(`tables/${tableId}`),
  postLike: (tableId) => api.post(`tables/${tableId}/like`),
  deleteLike: (tableId) => api.delete(`tables/${tableId}/like`),
  postBookmark: (tableId) => api.post(`tables/${tableId}/bookmark`),
  deleteBookmark: (tableId) => api.delete(`tables/${tableId}/bookmark`),
  getUser: () => api.get("/mypage"),
  getMyPost: (pageParam) =>
    api.get(`/mypage/tables?page=${pageParam}&size=${9}`),
  putUser: (data) => api.put("/mypage", data),
  getDetail: (tableId) => api.get(`/tables/${tableId}`),
  resetPassword: (user) => api.put("/resetPw", user),
  postReply: (postId, content) => api.post(`/replies/${postId}`, content),
  getReplies: (postId) => api.get(`/replies/${postId}`),
  deleteReply: (replyId) => api.delete(`/replies/${replyId}`),
  updateReply: (replyId, content) => api.put(`/replies/${replyId}`, content),
};

export default sulmoggoApi;
