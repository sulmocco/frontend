import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginSection, LoginWrap } from './styles';
import { BigButton } from '../../styles/CommonStyles';

const PasswordRending = () => {
    const navigate = useNavigate();
    return (
        <LoginWrap>
            <LoginSection>
                <h1>비밀번호 변경 완료</h1>
                {true && <>
                    <img src="/images/password_change.png" alt="자물쇠" />
                </>}
                <BigButton onClick={() => navigate("/login")} mt={"4.8rem"}>로그인</BigButton>
            </LoginSection>
        </LoginWrap>
    );
};

export default PasswordRending;