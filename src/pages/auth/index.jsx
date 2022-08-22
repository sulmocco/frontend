import React from "react";
import { SignUpButton } from '../signup/styles';
import { AuthSection, AuthWrap } from './styles';

const Auth = () => {
  const AuthBbaton = () => {
    window.location.href = process.env.REACT_APP_AUTH;
  };

  return (
    <AuthWrap>
      <AuthSection>
        <h3>본인 인증 하기</h3>
        <p>서비스 이용을 위해 비바톤 가입이 필요합니다.</p>
        <SignUpButton onClick={AuthBbaton}>다음</SignUpButton>
      </AuthSection>
    </AuthWrap>
  );
};

export default Auth;
