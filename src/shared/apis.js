import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_SERVER}/api`,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});

api.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("token"); // localStorage에 TOKEN 저장
    const refreshToken = localStorage.getItem("refreshToken");
    // console.log(accessToken);
    console.log(refreshToken);
    if (config.headers) {
      config.headers.common.authorization = accessToken;
      config.headers.common.RefreshToken = refreshToken;
    } // Header에 토큰을 넣어서 보내준다.
    return config;
  },
  (error) => {
    alert("요청중에 뭔가 잘못됨!!" + error.response.status);
  }
);

api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    //response 에서 error 가 발생했을 경우 catch로 넘어가기 전에 처리
    try {
      const errorStatus = error.response.status;
      const errorData = error.response.data;
      const prevRequst = error.config;
      // 토큰이 만료되어 발생하는 에러인 경우
      if (errorStatus === 401 || errorData === "만료된 토큰입니다.") {
        // 새로운 토큰 발행 요청
        const result = await axios.put(
          `${process.env.REACT_APP_API_SERVER}/api/refreshToken`,
          {},
          {
            headers: {
              authorization: localStorage.getItem("token"),
              RefreshToken: localStorage.getItem("refreshToken"),
            },
          }
        );
        // 새로받은 토큰 저장
        localStorage.setItem("token", result.data.accessToken);
        localStorage.setItem("refreshToken", result.data.refreshToken);
        // 헤더에 새로운 token으로 설정
        prevRequst.headers.authorization = localStorage.getItem("token");
        prevRequst.headers.RefreshToken = localStorage.getItem("refreshToken");
        // 실패했던 기존 request 재시도
        return await axios(prevRequst);
      }
    } catch (e) {
      //오류내용 출력 후 요청 거절
      return Promise.reject(e);
    }
  }
);

const sulmoggoApi = {
  getUser: () => api.get("/getUser"),
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
  searchTables: (params) => api.get("/tables/search", { params }),
  tables: (newData) => api.post("/tables", newData),
  getRooms: (params) => api.get("/room", { params }),
  searchRooms: (params) => api.get("/room/search", { params }),
  deletePost: (tableId) => api.delete(`tables/${tableId}`),
  postLike: (tableId) => api.post(`tables/${tableId}/like`),
  deleteLike: (tableId) => api.delete(`tables/${tableId}/like`),
  postBookmark: (tableId) => api.post(`tables/${tableId}/bookmark`),
  deleteBookmark: (tableId) => api.delete(`tables/${tableId}/bookmark`),
  getUserDetail: () => api.get("/mypage"),
  getMyPost: (pageParam) =>
    api.get(`/mypage/tables?page=${pageParam}&size=${9}`),
  getMybookmark: (pageParam) =>
    api.get(`/mypage/bookmark?page=${pageParam}&size=${9}`),
  putUser: (data) => api.put(encodeURI("/mypage"), data),
  getDetail: (tableId) => api.get(`/tables/${tableId}`),
  updateDetail: (tableId, data) => api.put(`/tables/${tableId}`, data),
  resetPassword: (user) => api.put("/resetPw", user),
  postReply: (postId, content) => api.post(`/replies/${postId}`, content),
  getReplies: (postId) => api.get(`/replies/${postId}`),
  deleteReply: (replyId) => api.delete(`/replies/${replyId}`),
  updateReply: (replyId, content) => api.put(`/replies/${replyId}`, content),
  postChatRoom: (data) => api.post(`/chat/room`, data),
  enterChatRoom: (chatRoomId) => api.post(`/chat/room/enter/${chatRoomId}`),
  getRoomData: (chatRoomId) => api.get(`/chat/room/${chatRoomId}`),
  removeChatRoom: (chatRoomId) => api.delete(`/room/delete/${chatRoomId}`),
  leaveChatRoom: (chatRoomId) => api.delete(`/chat/room/quit/${chatRoomId}`),
  getSelectedUser: (username) => api.get(encodeURI(`/friends/${username}`)),
  addFriend: (username) => api.post(encodeURI(`/friends/${username}`)),
  getFriends: () => api.get("/friends/"),
  deleteFriends: (username) => api.delete(`encodeURI(/friends/${username})`),
};

export default sulmoggoApi;
