import React from "react";
import ProgressBar from '../../components/progressbar';
import { SignUpButton } from '../signup/styles';
import { AuthSection, AuthWrap } from './styles';

const Auth = () => {
  const AuthBbaton = () => {
    window.location.href = process.env.REACT_APP_AUTH;
  };

  return (
    <AuthWrap>
      <ProgressBar />
      <AuthSection>
        <h3>본인 인증 하기</h3>
        <span>
          <p>서비스 이용을 위해 비바톤 가입이 필요합니다.</p>
          <br />
          <br />
          <p>비바톤은 익명 성인 인증 시스템으로</p>
          <p>비바톤 앱을 따로 설치하지 않고 <i>"비밀번호 로그인"</i> 을 통하여 사용이 가능합니다.</p>
        </span>
        <SignUpButton onClick={AuthBbaton}>다음</SignUpButton>
      </AuthSection>
    </AuthWrap>
  );
};

export default Auth;
