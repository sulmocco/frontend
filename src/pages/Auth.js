import React from "react";

const Auth = () => {
  const AuthBbaton = () => {
    window.location.href =
      "https://bauth.bbaton.com/oauth/authorize?client_id=JDJhJDA0JDMwN05RYjlwMG54UjJFOGZ2Z2JtQmVNRGJPcDFEWHY0UndMUGpu&redirect_uri=http://localhost:3000/oauth2/redirect&response_type=code&scope=read_profile";
  };

  return (
    <button
      onClick={() => {
        AuthBbaton();
      }}
    >
      인증해보자이
    </button>
  );
};

export default Auth;
