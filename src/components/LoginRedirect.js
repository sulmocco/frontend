import React, { useEffect } from "react";
import QueryString, { qs } from "qs";
import axios from "axios";

const LoginRedirect = () => {
  // qs로 주소창의 쿼리스트링 값 가져오기
  const queryData = QueryString.parse(window.location.search, {
    ignoreQueryPrefix: true,
  });
  console.log("인증코드 :", queryData.code);

  //API신청시의 Redirect uri : http://{REDIRECT_URI}?code={CODE}
  const url = "https://bauth.bbaton.com/oauth/token";
  const client_id =
    "JDJhJDA0JDMwN05RYjlwMG54UjJFOGZ2Z2JtQmVNRGJPcDFEWHY0UndMUGpu";
  const secret_key = "Rlo3ckdVWEVWY0ZTdXhp";
  const redirect_uri = "http://localhost:3000/oauth2/redirect";
  const code = queryData.code;
  const auth =
    // "Basic " + new Buffer.from(client_id + ":" + secret_key).toString("base64");
    "Basic " + btoa(client_id + ":" + secret_key);
  const data = {
    grant_type: "authorization_code",
    redirect_uri: redirect_uri,
    code: code,
  };
  const options = {
    url: url,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: auth,
    },
    // data: qs.stringify(data),
    data,
  };
  axios(options)
    .then(function (response) {
      if (response.status == "200") {
        console.log(response.data.token_type);
        console.log(response.data.access_token);
      } else {
        //토큰 호출 실패 처리
        console.log("토큰 호출 실패");
      }
    })
    .catch(function (err) {
      //호출 실패 예외처리
      console.log(err);
    });

  return <div>아아</div>;
};

export default LoginRedirect;
