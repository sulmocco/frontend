import React from "react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { Alcohol } from "../../shared/options";
import { BlueButton } from "../../styles/CommonStyles";
import { PageTitle } from "../tables/styles";
import {
  AlcoholButton,
  AlcoholWrapper,
  NewLiveContainer,
  StyledInput,
  SubmitWrapper,
  SubTitle,
  VideoWrapper,
} from "./styles";

const NewLive = (props) => {
  const alcohol = useRef({});
  const {
    register,
    watch,
    handleSubmit,
  } = useForm();
  alcohol.current = watch("alcohol", "맥주");

  return (
    <>
      <NewLiveContainer>
        <PageTitle>라이브 하기</PageTitle>
        <form onSubmit={handleSubmit}>
          {/* TODO: 옆에 버전 선택 드롭다운 있어야 함 */}
          <SubTitle mt={"2.7rem"}>제목</SubTitle>
          <StyledInput type="text" placeholder="제목을 입력해 주세요." />
          {/* TODO: 열심히 만들고 보니 여기 텍스트로 직접 입력하기로 했었다 */}
          <SubTitle mt={"5.6rem"}>추천술 선택</SubTitle>
          <AlcoholWrapper>
            {Alcohol.map((x, i) => {
              if (i !== 0)
                return (
                  <AlcoholButton checked={alcohol.current === x}>
                    {x}
                    <input
                      type="radio"
                      name="alcohol"
                      value={x}
                      defaultChecked={alcohol.current === x}
                      {...register("alcohol")}
                    />
                  </AlcoholButton>
                );
                return null
            })}
          </AlcoholWrapper>
          <VideoWrapper>
            <div className="video"></div>
            <div>
              {/* TODO: 비디오 오디오 선택 드롭다운이 될 예정 */}
              <div className="whatisthis" />
              <SubTitle mt={"2.9rem"}>비디오</SubTitle>
              <StyledInput type="text" placeholder="없음" />
              <SubTitle mt={"3.9rem"}>오디오</SubTitle>
              <StyledInput type="text" placeholder="없음" />
            </div>
          </VideoWrapper>
          <SubTitle mt={"7rem"}>안주</SubTitle>
          <StyledInput type="text" placeholder="안주를 입력해 주세요." />
          <SubTitle mt={"4.4rem"}>테마</SubTitle>
          <StyledInput type="text" placeholder="테마를 입력해 주세요." />

          <SubmitWrapper>
            <BlueButton>시작하기</BlueButton>
          </SubmitWrapper>
        </form>
      </NewLiveContainer>
    </>
  );
};

export default NewLive;