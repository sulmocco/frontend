import { useMutation } from '@tanstack/react-query';
import React from "react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import sulmoggoApi from '../../shared/apis';
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

const data = {
  'version': '라이브 종류',
  "thumbnail": '/images/img.png',
  "alcoholtag": "맥주",
  "food": '치킨',
  'theme': '스몰토크',
  "title": '치맥합시다!!'
}

const NewLive = (props) => {
  const alcohol = useRef({});
  const {
    register,
    watch,
    handleSubmit,
  } = useForm();
  alcohol.current = watch("alcohol", "맥주");

  const navigate = useNavigate();
  const mutation = useMutation((data) => sulmoggoApi.postChatRoom(data), {
    onSuccess: (res) => {
      alert(res, "요기");
      console.log(res);
      navigate(`/chat/`+res.data, {replace: true, state:{data: res.data}})
    },
    onError: (error)=>{
      alert(error);
    }
  });

  return (
    <>
      <NewLiveContainer>
        <PageTitle>라이브 하기</PageTitle>
        <form onSubmit={handleSubmit}>
          <SubTitle mt={"2.7rem"}>제목</SubTitle>
          <StyledInput type="text" placeholder="제목을 입력해 주세요." />
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
            <BlueButton onClick={(e) => {
              e.preventDefault();
              mutation.mutate(data);
            }}>시작하기</BlueButton>
          </SubmitWrapper>
        </form>
      </NewLiveContainer>
    </>
  );
};

export default NewLive;
