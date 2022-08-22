import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LoginSection, LoginWrap } from './styles';
import { BigButton } from '../../styles/CommonStyles';
import { useState } from 'react';
import { useEffect } from 'react';

const PasswordRending = () => {
    const navigate = useNavigate();
    const { params } = useParams();
    const [signup, setSignup] = useState();

    console.log(params);

    useEffect(() => {
        if (params == 'signup') {
            setSignup(true)
        }
        if (params == 'password') {
            setSignup(false)
        }
    }, []);
    return (
        <LoginWrap>
            <LoginSection>
                {signup ? <h1>회원가입 완료</h1> : <h1>비밀번호 변경 완료</h1>}
                {true && <>
                    <img src="/images/password_change.png" alt="자물쇠" />
                </>}
                <BigButton onClick={() => navigate("/login")} mt={"4.8rem"}>로그인</BigButton>
            </LoginSection>
        </LoginWrap>
    );
};

export default PasswordRending;