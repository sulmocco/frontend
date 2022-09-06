import React from 'react';
import { useRef } from 'react';
import { LoginSection, LoginWrap } from './styles';
import { SignUpButton } from '../signup/styles';
import sulmoggoApi from '../../shared/apis';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../../shared/modules';

const Login = () => {
    const id_ref = useRef();
    const pw_ref = useRef();
    const navigate = useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(id_ref.current.value, pw_ref.current.value);
        await sulmoggoApi.login({ id: id_ref.current.value, password: pw_ref.current.value })
            .then(res => {
                userLogin({ username: res.data.username, token: res.headers.authorization, id: res?.data?.id, refreshToken: res.data.refreshToken })
                navigate("/")
            }).catch(err => {
                alert("로그인에 실패했습니다. 아이디 및 비밀번호를 확인해주세요.")
            })
    }
    return (
        <LoginWrap>
            <LoginSection>
                <img src='/images/icon_login_logo.svg' alt='로고' />
                <form action="">
                    <input type='text' placeholder='아이디' ref={id_ref} />
                    <input type='password' placeholder='비밀번호' ref={pw_ref} />
                    <p onClick={() => navigate("/resetPassword")}>비밀번호 찾기</p>
                    <SignUpButton style={{ marginTop: "6.4rem" }} onClick={handleLogin} onKeyPress={(e) => e.key === 'Enter' && handleLogin()}>로그인</SignUpButton>
                </form>
            </LoginSection>
        </LoginWrap>
    );
};

export default Login;