import React from 'react';
import { useRef } from 'react';
import { LoginSection, LoginWrap } from './styles';
import { SignUpButton } from '../SignUp/styles';

const Login = () => {
    const id_ref = useRef();
    const pw_ref = useRef();
    const handleLogin = () => {
        console.log(id_ref.current.value, pw_ref.current.value);
    }
    return (
        <LoginWrap>
            <LoginSection>
                <h1>술모꼬</h1>
                <form action="">
                    <input type='text' placeholder='핸드폰 번호' ref={id_ref} />
                    <input type='password' placeholder='비밀번호' ref={pw_ref} />
                </form>
                <p>비밀번호 찾기</p>
                <SignUpButton style={{marginTop: "6.4rem"}} onClick={handleLogin}>로그인</SignUpButton>
            </LoginSection>
        </LoginWrap>
    );
};

export default Login;