import React from "react";

const Auth = () => {
  const AuthBbaton = () => {
    window.location.href = process.env.REACT_APP_AUTH;
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
