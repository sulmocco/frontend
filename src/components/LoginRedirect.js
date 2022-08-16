import React, { useCallback, useEffect } from "react";
import QueryString from "qs";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginRedirect = () => {
  const navigate = useNavigate();
  // qs로 주소창의 쿼리스트링 값 가져오기
  const queryData = QueryString.parse(window.location.search, {
    ignoreQueryPrefix: true,
  });
  console.log("인증코드 :", queryData.code);

  const axiosLoad = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://13.209.8.162/oauth2/redirect?code=${queryData.code}`
      );
      console.log("데이터확인~", res.data);
      navigate(`/signup?userId=${res.data.userId}`);
    } catch (err) {
      alert("성인이 아닙니다!");
      navigate("/loginrending");
    }
  }, [navigate, queryData.code]);

  useEffect(() => {
    axiosLoad();
  }, [axiosLoad]);

  return (
    <div>
      <h1>아 너무 잘됨~~~~</h1>
    </div>
  );
};

export default LoginRedirect;
