import React, { useEffect, useCallback } from "react";
import QueryString from "qs";
import axios from "axios";

const LoginRedirect = () => {
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
      console.log("리스폰스를 주세요!!", res);
    } catch (err) {
      console.log(err);
    }
  }, [queryData.code]);

  useEffect(() => {
    axiosLoad();
  }, [queryData, axiosLoad]);

  return <div></div>;
};

export default LoginRedirect;
