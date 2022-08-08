import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Login } from './styles';

const LoginRending = () => {
    const navigate = useNavigate();
    return (
        <Login onClick={() => navigate(`/login`)}>
            로그인 렌딩 페이지 버튼 희정님 컴포넌트 떼서 쓸예정
        </Login>
    );
};

export default LoginRending;