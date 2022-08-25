import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SignUpButton } from '../signup/styles';
import { Login } from './styles';

const LoginRending = () => {
    const navigate = useNavigate();
    return (
        <Login>
            <SignUpButton mt='71.9rem' onClick={() => navigate(`/login`)}>로그인</SignUpButton>
            <p onClick={() => navigate(`/terms`)}>회원가입</p>
        </Login>
    );
};

export default LoginRending;