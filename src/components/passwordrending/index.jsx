import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LoginSection, LoginWrap } from './styles';
import { BigButton } from '../../styles/CommonStyles';
import { useState } from 'react';
import { useEffect } from 'react';
import ProgressBar from '../progressbar';

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
        <LoginWrap padding='signup'>
            {signup ? <ProgressBar /> : <div style={{ marginTop: '13.6rem' }}></div>}
            <LoginSection style={{ marginBottom: '0' }}>
                {signup ? <h1>회원가입 완료</h1> : <h1>비밀번호 변경 완료</h1>}
                {signup ? (
                    <>
                        <img src="/images/img_signup_rending.png" alt="폭죽" />
                    </>
                ) : (
                    <>
                        <img src="/images/password_change.png" alt="자물쇠" />
                    </>
                )}
                <BigButton onClick={() => navigate("/login")} mt={"4.8rem"}>로그인</BigButton>
            </LoginSection>
        </LoginWrap>
    );
};

export default PasswordRending;