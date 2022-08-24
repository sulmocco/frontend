import React from "react"
import { useNavigate } from "react-router-dom"
import { BigButton } from "../../styles/CommonStyles"
import { LoginSection, LoginWrap } from "./styles"

const ResetPassword = ({ isAuth }) => {
    const AuthBbaton = () => window.location.href = process.env.REACT_APP_AUTH_PW;
    return (
        <LoginWrap>
            <LoginSection>
                <h1>본인 인증 하기</h1>
                <p>비바톤 본인인증 후 비밀번호 변경이 가능합니다.</p>
                {true && <>
                    <BigButton onClick={AuthBbaton} mt={"6.4rem"}>비바톤 인증</BigButton>
                </>}
            </LoginSection>
        </LoginWrap>
    )
}

export default ResetPassword