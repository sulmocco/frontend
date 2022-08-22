import React, { useRef } from 'react';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { SignUpButton } from '../../pages/signup/styles';
import sulmoggoApi from '../../shared/apis';
import { PasswordSection, PasswordWrap } from './styles';
import InputWrapper from '../inputwrapper';

const PassWordInput = () => {
    const navigate = useNavigate();
    // const mutation = useMutation((data) => sulmoggoApi.resetPassword(user, data), {
    //     onSuccess: (data) => {
    //         alert(data);
    //     },
    //     onError: (error) => {
    //         alert(error)
    //     }
    // });
    const passwordRegEx =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
    const password = useRef({})
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isDirty, isSubmitting },
    } = useForm();
    password.current = watch('password', '');
    console.log(watch('password'))
    return (
        <PasswordWrap>
            <PasswordSection>
                <h1>비밀번호 변경</h1>
                {true && <>
                    <form action="" onSubmit={handleSubmit((data) => console.log(data.password))}>
                        <InputWrapper
                            error={errors.password?.message}
                            title='비밀번호'
                        >
                            <input
                                id='password'
                                type='password'
                                placeholder='비밀번호'
                                {...register('password', {
                                    required: '비밀번호는 필수 입력입니다.',
                                    pattern: {
                                        value: passwordRegEx,
                                        message: "비밀번호 형식에 맞지 않습니다.",
                                    },
                                })}
                            />
                        </InputWrapper>
                        <InputWrapper
                            error={errors.password_check?.message}
                            title='비밀번호 확인'
                        >
                            <input
                                id='password_check'
                                type='password'
                                placeholder='비밀번호 확인'
                                aria-invalid={
                                    !isDirty ? undefined : errors.password_check ? "true" : "false"
                                }
                                {...register('password_check', {
                                    required: '비밀번호 확인은 필수 입력입니다',
                                    pattern: {
                                        value: passwordRegEx,
                                        message: "비밀번호 형식에 맞지 않습니다.",
                                    },
                                    validate: (value) => value == password.current || '비밀번호가 동일하지 않습니다'
                                },
                                )}
                            />
                        </InputWrapper>
                        <SignUpButton disabled={isSubmitting} mt={"6.4rem"}>변경하기</SignUpButton>
                    </form>
                </>}
            </PasswordSection>
        </PasswordWrap>
    );
};

export default PassWordInput;