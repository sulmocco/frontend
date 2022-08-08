import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import InputWrapper from "../../components/InputWrapper";
import { SignUpButton } from "./styles";

const SignUp = (props) => {
    const password = useRef({});
    const levelText = useRef({})
    const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/
    const emailRegEx = /\S+@\S+\.\S+/
    const nicknameRegEx = /^[A-Za-z\d_]{1,}$/
    const [openDropdown, setOpenDropdown] = useState(false)
    // const [optionSelected, setOptionSelected] = useState(undefined)
    // const [optionSelectedText, setOptionSelectedText] = useState(undefined)

  const onSubmit = async (data) => {
    console.log(JSON.stringify(data));
  };
  const onDropdownChange = (e) => {
    setValue("level", e.target.id)
    setValue("level_text", e.target.innerText)
    console.log(e.target.id, e.target.innerText);
    toggleDropdown()
  }

  const options = [
    {value: 0, text: "알쓰"},
    {value: 1, text: "초보"},
    {value: 2, text: "중수"},
    {value: 3, text: "고수"},
    {value: 4, text: "술고래"}
  ]

  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown)
  }

  const {
    register, watch,
    handleSubmit, setValue,
    formState: { isSubmitting, isDirty, errors },
  } = useForm({ mode: "onChange" });
  password.current = watch("password", "");
  levelText.current = watch("level_text", "")

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{width: "400px", maxWidth: "100%" }}>
      <InputWrapper
        error={errors.username?.message}
        title="닉네임"
        guide={`닉네임은 친구찾기, 친구추가, 프로필 등에 사용됩니다
                영문, 숫자, 언더바만 사용 가능합니다.`}
      >
        <input
          id="username"
          type="text"
          placeholder="sulmocco_friend"
          aria-invalid={!isDirty ? undefined : errors.username ? "true" : "false"}
          {...register("username", {
            required: "닉네임은 필수 입력입니다.",
            pattern: {
              value: nicknameRegEx,
              message: "닉네임 형식에 맞지 않습니다.",
            },
          })}
        />
      </InputWrapper>
      <InputWrapper error={errors.id?.message} title="아이디">
        <input
          id="id"
          type="text"
          value="010-2074-9827"
          {...register("id", {
            required: "아이디는 필수 입력입니다.",
          })}
          readOnly
        />
      </InputWrapper>
      <InputWrapper
        error={errors.password?.message}
        title="비밀번호"
        guide={`비밀번호는 영문자,숫자,특수문자(!@#$%^&*)를 1개 이상 조합하여
        8~16자로 입력부탁`}
      >
        <input
          id="password"
          type="password"
          aria-invalid={!isDirty ? undefined : errors.password ? "true" : "false"}
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
          aria-invalid={!isDirty ? undefined : errors.password_check ? "true" : "false"}
          {...register("password_check", {
            required: "비밀번호 확인은 필수 입력입니다.",
            pattern: {
              value: passwordRegEx,
              message: "비밀번호 형식에 맞지 않습니다.",
            },
            validate: value => value === password.current || "비밀번호가 동일하지 않습니다."
          })}
        />
      </InputWrapper>
      <InputWrapper 
      error={errors.level_text?.message} 
      title="나의 술 레벨" 
      dropdown 
      open={openDropdown} 
      onOptionChange={onDropdownChange}
      options={options}>
        <input type="hidden" id="level"/>
        <input
          id="level_text"
          type="text"
          ref={levelText}
          placeholder="-- 레벨을 선택하세요 --"
          {...register("level_text", {
            required: "왜 안되는겅미",
            validate: v => v !== ""
          })}
          disabled
        />
        <div className="dropdownArrow" onClick={toggleDropdown}>
            <img src="/images/icon_dropdown.svg" />
        </div>
      </InputWrapper>
      <SignUpButton type="submit">회원가입</SignUpButton>
    </form>
  );
};

export default SignUp;
