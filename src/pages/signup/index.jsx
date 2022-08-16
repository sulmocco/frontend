import { useCallback } from "react";
import { useEffect } from "react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from 'react-router-dom';
import InputWrapper from "../../components/inputwrapper";
import sulmoggoApi from "../../shared/apis";
import { AlcoholLevel } from "../../shared/options";
import { SignUpButton, Container } from "./styles";

const SignUp = (props) => {
  const navigate = useNavigate();
  // const [optionSelected, setOptionSelected] = useState(undefined)
  // const [optionSelectedText, setOptionSelectedText] = useState(undefined)
  // const emailRegEx = /\S+@\S+\.\S+/
  // const usernameRegEx = /^[A-Za-z\d_]{1,}$/
  const userIdParam = useSearchParams()[0];
  const password = useRef({});
  const levelText = useRef({});
  const username = useRef({});
  const id = useRef({})

  // 정규식
  const passwordRegEx =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
  // const phoneRegEx = /^[0-9]*$/;

  // 드롭다운 열리면 true 닫히면 false
  const [openDropdown, setOpenDropdown] = useState(false);
  // 사용자 닉네임 중복체크 여부. true이면 중복 없음(사용 가능)
  const [usernameOK, setUsernameOK] = useState(false);

  // 회원가입
  const onSubmit = async (data) => {
    console.log(JSON.stringify(data));
    await sulmoggoApi.signUp(data).then((res) => {
      alert(res.data);
    });
    navigate('/login');
  };

  // 나의 술 레벨 컨트롤
  const onDropdownChange = (e) => {
    setValue("level", e.target.id);
    setValue("level_text", e.target.innerText);
    console.log(e.target.id, e.target.innerText);
    toggleDropdown(); // 선택시 드롭다운 닫힘
  };

  // 술 레벨 종류
  const options = [...AlcoholLevel];

  // 드롭다운 토글
  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  // 폼 초기화, watch가 필요한 변수들 설정
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { isDirty, errors },
  } = useForm({ mode: "onChange" });
  password.current = watch("password", "");
  levelText.current = watch("level_text", "");
  username.current = watch("username", "");
  id.current = watch("id", "");
  const setId = useCallback(() => setValue("id", userIdParam.get("userId")), [userIdParam])
  

  // 닉네임 중복체크
  const checkUsername = () => {
    sulmoggoApi
      .usernameCheck(username.current)
      .then((res) => {
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

  useEffect(() => {
    setId()
  }, [setId])

  return (
    <Container>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "400px", maxWidth: "100%" }}
      >
        {/* -------------------------------닉네임------------------------------- */}
        <InputWrapper
          error={errors.username?.message}
          title="닉네임"
          guide={`닉네임은 친구찾기, 친구추가, 프로필 등에 사용됩니다`}
          needCheck
          onCheck={checkUsername}
          success={usernameOK}
        >
          <input
            id="username"
            type="text"
            placeholder="sulmocco_friend"
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
        {/* -------------------------------아이디------------------------------- */}
        <InputWrapper error={errors.id?.message} title="아이디">
          <input
            id="id"
            type="text"
            {...register("id", {
              required: "아이디는 필수 입력입니다.",
            })}
            disabled
          />
        </InputWrapper>
        {/* -------------------------------비밀번호------------------------------- */}
        <InputWrapper
          error={errors.password?.message}
          title="비밀번호"
          guide={`비밀번호는 영문자,숫자,특수문자(!@#$%^&*)를 1개 이상 조합하여
        8~16자로 입력부탁`}
        >
          <input
            id="password"
            type="password"
            autoComplete="off"
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
        {/* -------------------------------비밀번호확인------------------------------- */}
        <InputWrapper
          error={errors.password_check?.message}
          title="비밀번호 확인"
        >
          <input
            id="password_check"
            type="password"
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
        {/* -------------------------------나의술레벨------------------------------- */}
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
        {/* -------------------------------가입버튼------------------------------- */}
        <SignUpButton type="submit" style={{ marginBottom: "13.6rem" }}>
          회원가입
        </SignUpButton>
      </form>
    </Container>
  );
};

export default SignUp;
