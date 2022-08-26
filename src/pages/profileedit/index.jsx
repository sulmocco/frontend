import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import InputWrapper from '../../components/inputwrapper';
import Spinner from '../../components/spinner';
import sulmoggoApi from '../../shared/apis';
import { AlcoholLevel } from '../../shared/options';
import { Button, MyImgSection, MyInfoSection, ProfileEditCont, ProfileEditSection, ProfileEditWrap } from './style';
import { getLevel } from '../../shared/modules';

const ProfileEdit = () => {
    const navigate = useNavigate();
    const username = useRef();
    const levelText = useRef();
    const queryClient = useQueryClient();

    // 폼관리
    const { register, watch, handleSubmit, setValue, setError, clearErrors, formState: { isDirty, errors } } = useForm({ mode: "onChange" });
    username.current = watch("username", "");

    // 드롭다운 열리면 true 닫히면 false
    const [openDropdown, setOpenDropdown] = useState(false);

    // 사용자 닉네임 중복체크 여부. true이면 중복 없음(사용 가능)
    const [usernameOK, setUsernameOK] = useState(false);

    // 데이터 받아오기
    const { data, status } = useQuery(['user'], () => sulmoggoApi.getUser().then(res => res.data), {
        cacheTime: 0,
    });
    console.log(data);

    // 프로필 이미지
    const [profileImg, setProfileImg] = useState(data?.profileUrl);
    // 술레벨
    const [alcoholLevel, setAlcoholLevel] = useState(getLevel(data?.level));
    const [alcoholLevelNum, setAlcoholLevelNum] = useState(data?.level);

    useEffect(() => {
        setValue("level", alcoholLevelNum);
        setValue("level_text", alcoholLevel);
        // eslint-disable-next-line
    }, []);

    // 데이터 수정하기
    const mutation = useMutation((data) => sulmoggoApi.putUser(data), {
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries(['user']);
            localStorage.removeItem('username')
            localStorage.setItem('username', username.current)
        },
        onError: (error) => {
            alert('실패', error.message)
        }
    });

    // 술 레벨 종류
    const options = [...AlcoholLevel];

    // 드롭다운 토글
    const toggleDropdown = () => {
        setOpenDropdown(!openDropdown);
    };

    //나의 술 레벨 컨트롤
    const onDropdownChange = (e) => {
        setAlcoholLevelNum(e.target.id);
        setAlcoholLevel(e.target.innerText);
        console.log(alcoholLevel, alcoholLevelNum);
        setValue("level", alcoholLevelNum);
        setValue("level_text", alcoholLevel);
        toggleDropdown(); // 선택시 드롭다운 닫힘
    };

    // 이미지 업로드 관리
    const imgUpload = async (e) => {
        try {
            const formData = new FormData();
            formData.append('file', e.target.files[0]);
            for (const keyValue of formData) console.log(keyValue);
            const response = await sulmoggoApi.img(formData);
            setProfileImg(response.data[0].url);
        }
        catch (error) {
            console.log(error)
        }
    }

    // submit 이벤트
    const onSubmit = () => {
        const newData = {
            username: username.current,
            level: alcoholLevelNum,
            profileUrl: profileImg,
        }
        mutation.mutate(newData);
        alert('수정이 완료되었습니다')
        navigate('/mypage/bookmark');
    }

    // 닉네임 중복체크
    const checkUsername = () => {
        sulmoggoApi
            .usernameCheck(username.current)
            .then((res) => {
                console.log(res.data)
                alert("사용 가능한 닉네임입니다.");
                setUsernameOK(true);
                clearErrors("username");
            })
            .catch((e) => {
                alert("사용할 수 없는 닉네임입니다.");
                setError("username", {
                    type: "custom",
                    message: "사용할 수 없는 닉네임입니다.",
                });
            });
    };

    // 닉네임 변경시(onChange 핸들러)
    const onUserNameChange = () => {
        setUsernameOK(false);
        return false;
    };

    // 로딩스피너 적용
    if (status === 'loading') {
        return (<Spinner />)
    }

    return (
        <ProfileEditWrap>
            <ProfileEditSection>
                <h1>수정페이지</h1>
                <ProfileEditCont>
                    <MyImgSection>
                        <form className='section'>
                            <span className='img'>
                                {data?.profileUrl == null && profileImg == null ? (
                                    <img src='/images/profile_default.svg' alt='기본이미지' />
                                ) : (
                                    <img src={profileImg || data?.profileUrl} alt='프로필 이미지' />
                                )}
                            </span>
                            <label className='button' htmlFor='image'>
                                <i><img src='/images/icon_camera.svg' alt='카메라' /></i>
                                <p>수정하기</p>
                            </label>
                            <input {...register('image')} type="file" id='image' name='image' accept='image/*' onChange={imgUpload} />
                        </form>
                    </MyImgSection>
                    <MyInfoSection
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <InputWrapper
                            title='닉네임'
                            error={errors.username?.message}
                            needCheck
                            onCheck={checkUsername}
                            success={usernameOK}
                        >
                            <input
                                id="username"
                                type="text"
                                placeholder='닉네임을 입력해주세요'
                                defaultValue={data?.username}
                                aria-invalid={
                                    !isDirty ? undefined : errors.username ? "true" : "false"
                                }
                                {...register("username", {
                                    required: "닉네임은 필수 입력입니다.",
                                    onChange: onUserNameChange,
                                    validate: () => usernameOK || "중복확인이 필요합니다.",
                                })}
                            />
                        </InputWrapper>
                        <InputWrapper
                            error={errors.level_text?.message}
                            title="나의 술 레벨"
                            dropdown
                            open={openDropdown}
                            onOptionChange={onDropdownChange}
                            options={options}
                        >
                            <input type="hidden" id="level" />
                            <input
                                id="level_text"
                                type="text"
                                ref={levelText}
                                defaultValue={getLevel(data?.level)}
                                placeholder="-- 레벨을 선택하세요 --"
                                {...register("level_text", {
                                    required: "나의 술 레벨을 선택해주세요.",
                                    validate: (v) => v !== "" || "나의 술 레벨을 선택해주세요.",
                                })}
                                disabled
                            />
                            <div className="dropdownArrow" onClick={toggleDropdown}>
                                <img src="/images/icon_dropdown.svg" alt="down_arrow" />
                            </div>
                        </InputWrapper>
                    </MyInfoSection>
                </ProfileEditCont>
                <div className='buttons'>
                    <Button
                        onClick={() => navigate('/mypage')}
                        width='36.8rem' background='#fff' color='#7A7A80' style={{ border: '1px solid #B8BBC0' }}
                    >취소하기</Button>
                    <Button width='36.8rem' type='submit' onClick={handleSubmit(onSubmit)}>수정완료</Button>
                </div>
            </ProfileEditSection>
        </ProfileEditWrap>
    );
};

export default ProfileEdit;