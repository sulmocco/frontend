import React from 'react';
import { useRef } from 'react';
import { LoginSection, LoginWrap } from './styles';
import { SignUpButton } from '../signup/styles';
import sulmoggoApi from '../../shared/apis';
import { useDispatch } from 'react-redux';
import { userActions } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const id_ref = useRef();
    const pw_ref = useRef();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogin = async () => {
        console.log(id_ref.current.value, pw_ref.current.value);
        await sulmoggoApi.login({ id: id_ref.current.value, password: pw_ref.current.value })
            .then(res => {
                // 로그인 정보 리덕스에 저장 후 메인페이지로 이동
                dispatch(userActions.userLogin(res.data))
                navigate("/")
            }).catch(err => {
                alert(err.data)
            })
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
                <SignUpButton style={{ marginTop: "6.4rem" }} onClick={handleLogin}>로그인</SignUpButton>
            </LoginSection>
        </LoginWrap>
    );
};

export default Login;