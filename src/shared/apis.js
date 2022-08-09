import axios from "axios";

const api = axios.create({
    baseURL: `${process.env.REACT_APP_API_SERVER}/api`,
  });

  api.interceptors.request.use(function (config) {
    const accessToken = localStorage.getItem('token'); // localStorage에 TOKEN 저장
    if(accessToken)
    {config.headers.common['Authorization'] = `${accessToken}`; }// Header에 토큰을 넣어서 보내준다.
    return config;
  });

  const sulmoggoApi = {
        signUp: (user) => api.post('/signup', user),
        usernameCheck: (username) => api.get(`/checkUser/${username}`),
        login: (user) => api.post('/user/login', user)
  }

  export default sulmoggoApi