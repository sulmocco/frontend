import React, { useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { SignUpButton } from '../../pages/signup/styles';
import sulmoggoApi from '../../shared/apis';
import { PasswordSection, PasswordWrap } from './styles';
import InputWrapper from '../inputwrapper';

const PassWordInput = () => {
    const navigate = useNavigate();
    const mutation = useMutation((data) => sulmoggoApi.resetPassword(data), {
        onSuccess: (data) => {
            alert("비밀번호가 변경되었습니다.");
        },
        onError: (error) => {
            alert(error)
        }
    });
    // const params = new URLSearchParams();
    // const userParam = params.get('userId');
    // console.log(userParam)

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const userId = params.get('userId');

    const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
    const password = useRef();
    const {
        register,
        watch,
        handleSubmit,
        formState: { isDirty, errors },
    } = useForm({ mode: "onChange" });

    password.current = watch('password', '')

    const handlePassword = () => {
        const newData = {
            id: userId,
            password: watch('password'),
            password2: watch('password_check')
        }
        mutation.mutate(newData);
        navigate(`/login`)
    }
    return (
        <PasswordWrap>
            <PasswordSection>
                <h1>비밀번호 변경</h1>
                <form action=""
                    onSubmit={handleSubmit(handlePassword)}>
                    <InputWrapper
                        styles={{ marginBottom: '-4rem' }}
                        error={errors.password?.message}
                        title="비밀번호"
                        guide={`비밀번호는 영문자,숫자,특수문자(!@#$%^&*)를 1개 이상 조합하여 8~16자로 입력해주세요.`}
                    >
                        <input
                            id="password"
                            type="password"
                            autoComplete="off"
                            placeholder='비밀번호를 입력해 주세요'
                            aria-invalid={
                                !isDirty ? undefined : errors.password ? "true" : "false"
                            }
                            {...register("password", {
                                required: "비밀번호 필수 입력입니다.",
                                pattern: {
                                    value: passwordRegEx,
                                    message: "비밀번호 형식에 맞지 않습니다.",
                                },
                            })}
                        />
                    </InputWrapper>
                    <InputWrapper
                        error={errors.password_check?.message}
                        title="비밀번호 확인"
                    >
                        <input
                            id="password_check"
                            type="password"
                            placeholder='비밀번호를 입력해 주세요'
                            autoComplete="off"
                            aria-invalid={
                                !isDirty ? undefined : errors.password_check ? "true" : "false"
                            }
                            {...register("password_check", {
                                required: "비밀번호 확인은 필수 입력입니다.",
                                pattern: {
                                    value: passwordRegEx,
                                    message: "비밀번호 형식에 맞지 않습니다.",
                                },
                                validate: (value) =>
                                    value === password.current || "비밀번호가 동일하지 않습니다.",
                            })}
                        />
                    </InputWrapper>
                    <SignUpButton >변경하기</SignUpButton>
                </form>
            </PasswordSection>
        </PasswordWrap >
    );
};

export default PassWordInput;