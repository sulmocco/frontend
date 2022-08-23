import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import sulmoggoApi from "../../shared/apis";
import { Alcohol, LiveVersion } from "../../shared/options";

import { BlueButton } from "../../styles/CommonStyles";
import { PageTitle } from "../tables/styles";
import { OpenVidu } from "openvidu-browser";
import {
  AlcoholButton,
  AlcoholWrapper,
  NewLiveContainer,
  StyledInput,
  SubmitWrapper,
  SubTitle,
  VersionInputWrap,
  VideoDevicesDropdownWrapper,
  VideoWrapper,
} from "./styles";
import { useEffect } from "react";
import { useState } from "react";

const data = {
  version: "라이브 종류",
  thumbnail: "/images/img.png",
  alcoholtag: "주종",
  food: "안주",
  theme: "테마",
};

const NewLive = (props) => {
  const alcohol = useRef({});
  const videoPreview = useRef();

  const [versionOpen, setVersionOpen] = useState(false);
  const [camerasOpen, setCamerasOpen] = useState(false);
  const [audiosOpen, setAudiosOpen] = useState(false);

  const [cameraDevices, setCameraDevices] = useState([]);
  const [audioDevices, setAudioDevices] = useState([]);

  const [camera, setCamera] = useState(null);
  const [audio, setAudio] = useState(null);
  const [constraints, setConstraints] = useState({});
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  alcohol.current = watch("alcohol", "맥주");

  const navigate = useNavigate();
  const mutation = useMutation((data) => sulmoggoApi.postChatRoom(data), {
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const getUserMedia = async (constraints) => {
    let devices = [];
    const cameraPermission = await navigator.permissions.query({
      name: "camera",
    });
    const micPermission = await navigator.permissions.query({
      name: "microphone",
    });
    if (cameraPermission !== "denied" && micPermission !== "denied") {
      devices = await navigator.mediaDevices.enumerateDevices();
      setCameraDevices(devices.filter((x) => x.kind === "videoinput"));
      setAudioDevices(devices.filter((x) => x.kind === "audioinput"));
      if (!constraints.video && !constraints.audio) {
        videoPreview.current.srcObject = null;
      } else {
        await navigator.mediaDevices
          .getUserMedia(constraints)
          .then((stream) => {
            videoPreview.current.srcObject = stream;
          });
      }
    }
  };

  const handleCameraDeviceChange = (device) => {
    setValue("video", device ? device.label : "없음");
    setConstraints({
      ...constraints,
      video: device
        ? { ...constraints.video, deviceId: device.deviceId }
        : false,
    });
    // setCamera(device);
  };
  const handleAudioDeviceChange = (device) => {
    setValue("audio", device ? device.label : "없음");
    setConstraints({
      ...constraints,
      audio: device
        ? { ...constraints.audio, deviceId: device.deviceId }
        : false,
    });
    // setAudio(device);
  };

  useEffect(() => {
    getUserMedia(constraints);
    console.log(cameraDevices, audioDevices);
    console.log("this..");
  }, [constraints]);

  useEffect(() => {
    // handleCameraDeviceChange(c)
    console.log("how..");
  }, []);
  return (
    <>
      <NewLiveContainer onClick={() => {
        camerasOpen(false)
        audiosOpen(false)
        versionOpen(false)
      }}>
        <form onSubmit={handleSubmit}>
          <div className="titleWrap">
            <PageTitle>술약속 잡기</PageTitle>
            <VersionInputWrap
              open={versionOpen}
              count={LiveVersion.length}
              onClick={() => {
                setVersionOpen(!versionOpen);
                console.log(versionOpen);
              }}
            >
              <input
                type="text"
                placeholder="버전 선택"
                disabled
                {...register("version_text")}
                defaultValue={LiveVersion[0].text}
              />
              <input
                type="text"
                disabled
                hidden
                {...register("version")}
                defaultValue={LiveVersion[0].value}
              />
              <img src="/images/icon_dropdown_blue.svg" alt="arrow" />
              <div className="versionsWrap">
                {LiveVersion.map((version) => {
                  return (
                    <div
                      className="version"
                      onClick={() => {
                        setValue("version_text", version.text);
                        setValue("version", version.value);
                      }}
                    >
                      {version.text}
                    </div>
                  );
                })}
              </div>
            </VersionInputWrap>
          </div>

          {/* TODO: 옆에 버전 선택 드롭다운 있어야 함 */}
          <SubTitle mt={"2.7rem"}>제목</SubTitle>
          <StyledInput
            type="text"
            placeholder="제목을 입력해 주세요."
            error={errors.title}
            {...register("title", { required: "제목을 입력해달라" })}
          />
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
              return null;
            })}
          </AlcoholWrapper>
          <VideoWrapper isInput={videoPreview.current.srcObject}>
            <div>
              <SubTitle>방송화면</SubTitle>
              <div className="video">
                {!videoPreview.current.srcObject && <h1>영상이 없습니다!</h1>}
                <video autoPlay ref={videoPreview} />
              </div>
            </div>
            <div>
              {/* TODO: 비디오 오디오 선택 드롭다운이 될 예정 */}
              <SubTitle>썸네일 이미지</SubTitle>
              <div className="thumbnail" />
              <SubTitle mt={"4rem"}>비디오</SubTitle>
              <VideoDevicesDropdownWrapper
                open={camerasOpen}
                count={cameraDevices.length + 1}
                onClick={() => setCamerasOpen(!camerasOpen)}
              >
                <div className="inputWrap">
                  <input
                    type="text"
                    placeholder="-- 비디오 선택 --"
                    small
                    disabled
                    {...register("video")}
                    defaultValue={cameraDevices[0]?.label}
                  />
                  <img src="/images/icon_dropdown_grey_02.svg" />
                </div>
                <div className="devicesWrap">
                  {cameraDevices &&
                    cameraDevices.map((x) => {
                      return (
                        <div
                          className="device"
                          onClick={() => handleCameraDeviceChange(x)}
                        >
                          {x.label}
                        </div>
                      );
                    })}
                  <div
                    className="device"
                    onClick={() => handleCameraDeviceChange(null)}
                  >
                    없음
                  </div>
                </div>
              </VideoDevicesDropdownWrapper>
              <SubTitle mt={"4rem"}>오디오</SubTitle>
              <VideoDevicesDropdownWrapper
                open={audiosOpen}
                count={audioDevices.length + 1}
                onClick={() => setAudiosOpen(!audiosOpen)}
              >
                <div className="inputWrap">
                  <input
                    type="text"
                    placeholder="-- 오디오 선택 --"
                    small
                    disabled
                    {...register("audio")}
                    defaultValue={audioDevices[0]?.label}
                  />
                  <img src="/images/icon_dropdown_grey_02.svg" />
                </div>
                <div className="devicesWrap">
                  {audioDevices &&
                    audioDevices.map((x) => {
                      return (
                        <div
                          className="device"
                          onClick={() => handleAudioDeviceChange(x)}
                        >
                          {x.label}
                        </div>
                      );
                    })}
                  <div
                    className="device"
                    onClick={() => {
                      setValue("audio", "없음");
                      setAudio(null);
                    }}
                  >
                    없음
                  </div>
                </div>
              </VideoDevicesDropdownWrapper>
            </div>
          </VideoWrapper>
          <SubTitle mt={"7rem"}>안주</SubTitle>
          <StyledInput type="text" placeholder="안주를 입력해 주세요." />
          <SubTitle mt={"4.4rem"}>테마</SubTitle>
          <StyledInput type="text" placeholder="테마를 입력해 주세요." />

          <SubmitWrapper>
            <BlueButton
              onClick={() => {
                mutation.mutate(data);
                navigate(`/chat/01`);
              }}
            >
              시작하기
            </BlueButton>
          </SubmitWrapper>
        </form>
      </NewLiveContainer>
    </>
  );
};

export default NewLive;
