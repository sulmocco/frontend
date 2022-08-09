import React, { useEffect } from "react";
import QueryString from "qs";
import axios from "axios";

const LoginRedirect = () => {
  // qs로 주소창의 쿼리스트링 값 가져오기
  const queryData = QueryString.parse(window.location.search, {
    ignoreQueryPrefix: true,
  });
  console.log("인증코드 :", queryData.code);

  const axiosLoad = async () => {
    try {
      const res = await axios.get(
        `http://13.209.8.162/oauth2/redirect?code=${queryData.code}`
      );
      console.log("리스폰스를 주세요!!", res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    axiosLoad();
  }, []);

  return (
    <div>
      <div>왜안되는고야아아아아아아아아아아아앙</div>
      <div>왜안되는고야아아아아아아아아아아아앙</div>
      <div>왜안되는고야아아아아아아아아아아아앙</div>
      <div>왜안되는고야아아아아아아아아아아아앙</div>
      <div>왜안되는고야아아아아아아아아아아아앙</div>
      <div>왜안되는고야아아아아아아아아아아아앙</div>
      <div>왜안되는고야아아아아아아아아아아아앙</div>
      <div>왜안되는고야아아아아아아아아아아아앙</div>
      <div>왜안되는고야아아아아아아아아아아아앙</div>
      <div>왜안되는고야아아아아아아아아아아아앙</div>
    </div>
  );
};

export default LoginRedirect;
