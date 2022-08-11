import React from "react";
import {
  GuideText,
  UpperWrapper,
  Wrapper,
  CenterWrapper,
  OptionsWrapper,
} from "./styles";

const InputWrapper = (props) => {
  // error      true이면 에러(빨간색)
  // success       true이면 성공(파란색)
  // title      input 위 제목 label에 들어갈 텍스트 string
  // dropdown   드롭다운 사용 여부(true면 사용)
  // options    드롭다운에 들어가는 옵션([{value,option}] 리스트)
  // open       드롭다운 열림상태 여부(true면 열림)
  // guide      아래에 들어가는 회색 가이드텍스트 string
  // needCheck  중복체크 필요 여부(있으면 버튼 출력)
  // onCheck    중복체크 버튼 클릭시 실행될 함수


    const {error, title, dropdown, options, guide, open, needCheck, onCheck, success} = props;
  return (
    <>
      <Wrapper>
        <UpperWrapper>
          <label className="title">
            {title}
          </label>
          {error && <div className="error">
            {error && <img src="/images/icon_information.svg" alt="i"/>}
            {error}
          </div>}
          {success && <div className="success">
            {success && <img src="/images/icon_information_blue.svg" alt="i"/>}
            {"사용 가능한 닉네임입니다."}
          </div>}
        </UpperWrapper>
        <CenterWrapper error={error} dropdown={dropdown} success={success}>
          {props.children}
        </CenterWrapper>
        {dropdown && (
          <OptionsWrapper open={open}>
            {options?.map((x, i) => {
              return (
                <div key={i} id={x.value} name={x.text} onClick={props.onOptionChange}>
                  <p>{x.text}</p>
                </div>
              );
            })}
          </OptionsWrapper>
        )}
        <GuideText>{guide}</GuideText>
        {needCheck && <button type="button" onClick={onCheck} disabled={success}>중복확인</button>}
      </Wrapper>
    </>
  );
};

export default InputWrapper;
