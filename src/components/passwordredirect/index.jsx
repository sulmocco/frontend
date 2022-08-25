import React, { useCallback, useEffect } from "react";
import QueryString from "qs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from '../spinner';

const PasswordRedirect = () => {
    const navigate = useNavigate();
    // qs로 주소창의 쿼리스트링 값 가져오기
    const queryData = QueryString.parse(window.location.search, {
        ignoreQueryPrefix: true,
    });
    console.log("인증코드 :", queryData.code);

    const axiosLoad = useCallback(async () => {
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_API_SERVER}/oauth2/redirect_pw?code=${queryData.code}`
            );
            console.log("데이터확인", res.data);
            navigate(`/password?userId=${res.data.userId}`);
        } catch (err) {
            alert('여기에러', err);
            navigate("/loginrending");
        }
    }, [navigate, queryData.code]);

    useEffect(() => {
        axiosLoad();
    }, [axiosLoad]);

    return <Spinner />;
};

export default PasswordRedirect;
