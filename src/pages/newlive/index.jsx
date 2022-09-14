import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, {memo} from "react";
import { useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import sulmoggoApi from "../../shared/apis";
import { Alcohol, LiveVersion } from "../../shared/options";
import { useDropzone } from "react-dropzone";
import { PageTitle } from "../tables/styles";
import {
  AlcoholButton,
  AlcoholWrapper,
  CancelButton,
  NewLiveContainer,
  ShowHideDropdownWrapper,
  StartLiveButton,
  StyledInput,
  SubmitWrapper,
  SubTitle,
  SubtitleWrapper,
  ThumbnailDropzone,
  VersionInputWrap,
  VideoDevicesDropdownWrapper,
  VideoWrapper,
} from "./styles";
import { useEffect } from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import {
  audioinputState,
  audiooutputState,
  playaudioState,
  playvideoState,
  setDeviceForState,
  videoinputState,
} from "../../recoil/mediaDevices";

const NewLive = (props) => {
  const alcohol = useRef({});
  const videoPreview = useRef();
  const speakerRef = useRef();
  const queryClient = useQueryClient();
  const [videoinput, setVideoinput] = useRecoilState(videoinputState);
  const [audioinput, setAudioinput] = useRecoilState(audioinputState);
  const [audiooutput, setAudiooutput] = useRecoilState(audiooutputState);
  const [, setDeviceFor] = useRecoilState(setDeviceForState);

  const [versionOpen, setVersionOpen] = useState(false);
  const [camerasOpen, setCamerasOpen] = useState(false);
  const [audiosOpen, setAudiosOpen] = useState(false);
  const [speakersOpen, setSpeakersOpen] = useState(false);
  const [showOpen, setShowOpen] = useState(false);

  const [cameraDevices, setCameraDevices] = useState([]);
  const [audioDevices, setAudioDevices] = useState([]);
  const [speakerDevices, setSpeakerDevices] = useState([]);
  const [, setPlayaudio] = useRecoilState(playaudioState);
  const [playvideo, setPlayvideo] = useRecoilState(playvideoState);
  const [speakerAvailable, setSpeakerAvailable] = useState(false);

  // const track = videoPreview.current?.srcObject?.getVideoTracks()[0];

  const [thumbnail, setThumbnail] = useState(null);
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      version: LiveVersion[0].value,
      version_text: LiveVersion[0].text,
      show: "공개",
    },
  });
  alcohol.current = watch("alcohol", "");

  const navigate = useNavigate();
  const mutation = useMutation((data) => sulmoggoApi.postChatRoom(data), {
    onSuccess: (res) => {
      alert("술약속을 잡았습니다!");
      // console.log(res);
      queryClient.invalidateQueries("rooms");
      setDeviceFor(res.data);
      navigate(`/render/live/` + res.data, {
        replace: true,
        state: { data: res.data },
      });
    },
    onError: (error) => {
      alert(error);
    },
  });
  const onSubmit = (data) => {
    // console.log(data);
    const request = {
      version: data.version + (data.show === "공개" ? "" : "Private"),
      thumbnail: thumbnail,
      alcoholtag: data.alcohol,
      food: data.food,
      theme: data.theme,
      title: data.title,
    };
    mutation.mutate(request);
  };

  const initMedia = async () => {
    await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    await navigator.mediaDevices.enumerateDevices().then((devices) => {
      setCameraDevices(devices.filter((x) => x.kind === "videoinput"));
      setAudioDevices(devices.filter((x) => x.kind === "audioinput"));
      setSpeakerDevices(devices.filter((x) => x.kind === "audiooutput"));
    });
    setSpeakerAvailable(speakerRef.current.setSinkId !== undefined);
  };

  const getUserMedia = async (constraints) => {
    if (cameraDevices.length > 0 && audioDevices.length > 0) {
      await navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        if ("srcObject" in videoPreview.current) {
          videoPreview.current.srcObject = stream;
          // videoPreview.current.muted = true
        } else {
          videoPreview.current.src = window.URL.createObjectURL(stream);
        }
      });
    }
  };

  const handleCameraDeviceChange = (device) => {
    setValue("video", device ? device.label : "없음");
    setVideoinput(device ? device : cameraDevices[0]);
    device ? setPlayvideo(true) : setPlayvideo(false);
  };
  const handleAudioDeviceChange = (device) => {
    setValue("audio", device ? device.label : "없음");
    setAudioinput(device ? device : audioDevices[0]);
    device ? setPlayaudio(true) : setPlayaudio(false);
    // setAudio(device);
  };
  const handleSpeakerDeviceChange = (device) => {
    setValue("speaker", device ? device.label : "없음");
    setAudiooutput(device ? device : speakerDevices[0]);
    speakerRef.current?.setSinkId(device.deviceId);
  };

  useEffect(() => {
    console.log("initializing media devices...");
    initMedia();
  }, []);

  useEffect(() => {
    trigger();
  }, [trigger]);

  useEffect(() => {
    if (videoinput.deviceId !== null) {
      const foo = async () => {
        if (playvideo) {
          await getUserMedia({
            video: { deviceId: videoinput.deviceId },
            audio: true,
          });
        }
        // console.log(videoinput, audioinput, audiooutput);
        // console.log("this..");
      };
      foo();
    }
    // eslint-disable-next-line
  }, [videoinput]);

  const stopStream = () => {
    if (videoPreview.current) {
      const stream = videoPreview?.current?.srcObject?.getTracks()[0];
      stream.stop();
      videoPreview.current = null;
    }
  };
  useEffect(() => {
    console.log("🥝settingcameralistener");
    window.addEventListener("beforeunload", stopStream);
    window.addEventListener("unload", stopStream);
    return () => {
      window.removeEventListener("beforeunload", stopStream);
      window.removeEventListener("unload", stopStream);
    };
    // eslint-disable-next-line
  }, [videoPreview.current]);

  useEffect(() => {
    if (!videoinput.deviceId && cameraDevices.length > 0) {
      handleCameraDeviceChange(cameraDevices[0]);
    }
    if (!audioinput.deviceId && audioDevices.length > 0) {
      handleAudioDeviceChange(audioDevices[0]);
    }
    if (
      speakerAvailable &&
      !audiooutput.deviceId &&
      speakerDevices.length > 0
    ) {
      handleSpeakerDeviceChange(speakerDevices[0]);
    }
    // eslint-disable-next-line
  }, [cameraDevices, audioDevices, speakerDevices]);

  const onDrop = useCallback(async (file) => {
    const formData = new FormData();
    formData.append("file", file[0]);
    const url = await sulmoggoApi.img(formData);
    // console.log(url.data[0].url);
    setThumbnail(url.data[0].url);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png", ".gif", ".jpg"],
    },
  });
  return (
    <>
      <NewLiveContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="titleWrap">
            <PageTitle>술약속 잡기</PageTitle>
            <VersionInputWrap
              open={versionOpen}
              count={LiveVersion.length}
              onClick={() => {
                setVersionOpen(!versionOpen);
                // console.log(versionOpen);
              }}
            >
              <input
                type="text"
                placeholder="버전 선택"
                disabled
                {...register("version_text")}
                defaultValue={LiveVersion[0].text}
                onBlur={() => setVersionOpen(false)}
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
          <SubtitleWrapper mt={"2.7rem"}>
            <SubTitle mt={0}>제목</SubTitle>
            {errors.title && (
              <div className="error">
                <img src="/images/icon_information.svg" alt="information" />
                <label>{errors.title.message}</label>
              </div>
            )}
          </SubtitleWrapper>
          <StyledInput
            type="text"
            placeholder="제목을 입력해 주세요."
            error={errors.title}
            maxLength={50}
            {...register("title", { required: "제목을 입력해 주세요." })}
          />
          <SubtitleWrapper mt={"5.6rem"}>
            <SubTitle>추천술 선택</SubTitle>
            <div className="guidebubble">술을 선택해 주세요</div>
          </SubtitleWrapper>
          <AlcoholWrapper>
            {Alcohol.map((x, i) => {
              if (i !== 0)
                return (
                  <AlcoholButton checked={alcohol.current === x}>
                    {x}
                    <input
                      key={x.text}
                      type="radio"
                      name="alcohol"
                      value={x}
                      defaultChecked={alcohol.current === x}
                      {...register("alcohol", {
                        required: "추천술을 입력해 주세요.",
                      })}
                    />
                  </AlcoholButton>
                );
              return null;
            })}
          </AlcoholWrapper>
          <VideoWrapper isInput={playvideo}>
            <div>
              <SubTitle>방송화면</SubTitle>
              <div className="video">
                {!playvideo && (
                  <img src="/images/icon_video_disabled.svg" alt="video off" />
                )}
                <video
                  autoPlay
                  ref={videoPreview}
                  hidden={!playvideo}
                  muted={true}
                />
              </div>
              <audio ref={speakerRef} hidden />
            </div>
            <div>
              <SubTitle>썸네일 이미지</SubTitle>
              <ThumbnailDropzone
                src={thumbnail}
                isDrop={isDragActive}
                {...getRootProps()}
              >
                <input {...getInputProps()} accept=".png, .jpg, .jpeg" />
                {!thumbnail && (
                  <>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 17L17.7071 13.7071C17.3166 13.3166 16.6834 13.3166 16.2929 13.7071L15.7071 14.2929C15.3166 14.6834 14.6834 14.6834 14.2929 14.2929L11.4142 11.4142C10.6332 10.6332 9.36684 10.6332 8.58579 11.4142L3 17M21 5V19C21 19.5523 20.5523 20 20 20H4C3.44772 20 3 19.5523 3 19L3 5C3 4.44772 3.44772 4 4 4L20 4C20.5523 4 21 4.44772 21 5ZM16 8C16 8.55229 15.5523 9 15 9C14.4477 9 14 8.55229 14 8C14 7.44772 14.4477 7 15 7C15.5523 7 16 7.44772 16 8Z"
                        stroke="#7A7A80"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p>썸네일 이미지를 업로드하려면</p>
                    <p>드래그하거나 클릭해주세요</p>
                  </>
                )}
              </ThumbnailDropzone>
              <SubtitleWrapper mt={"2.4rem"}>
                <SubTitle>비디오</SubTitle>
              </SubtitleWrapper>
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
                    defaultValue={videoinput.label}
                  />
                  <img src="/images/icon_dropdown_grey_02.svg" alt="dropdown" />
                </div>
                <div className="devicesWrap">
                  {cameraDevices &&
                    cameraDevices.map((x) => {
                      return (
                        <div
                          className="device"
                          onClick={() => handleCameraDeviceChange(x)}
                          title={x.label}
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
              <SubtitleWrapper mt={"2.4rem"}>
                <SubTitle>오디오</SubTitle>
              </SubtitleWrapper>
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
                    defaultValue={audioinput.label}
                  />
                  <img src="/images/icon_dropdown_grey_02.svg" alt="dropdown" />
                </div>
                <div className="devicesWrap">
                  {audioDevices &&
                    audioDevices.map((x) => {
                      return (
                        <div
                          className="device"
                          onClick={() => handleAudioDeviceChange(x)}
                          title={x.label}
                        >
                          {x.label}
                        </div>
                      );
                    })}
                  <div
                    className="device"
                    onClick={() => {
                      handleAudioDeviceChange(null);
                    }}
                  >
                    없음
                  </div>
                </div>
              </VideoDevicesDropdownWrapper>
              <SubtitleWrapper mt={"2.4rem"}>
                <SubTitle>스피커</SubTitle>
              </SubtitleWrapper>
              <VideoDevicesDropdownWrapper
                open={speakersOpen}
                count={speakerDevices.length + 1}
                onClick={() => setSpeakersOpen(!speakersOpen)}
              >
                {!speakerAvailable && (
                  <p className="inputWrap notAvailable">
                    스피커 선택을 지원하지 않는 브라우저입니다.
                  </p>
                )}
                {speakerAvailable && (
                  <>
                    <div className="inputWrap">
                      <input
                        type="text"
                        placeholder="-- 스피커 선택 --"
                        small
                        disabled
                        {...register("speaker")}
                        defaultValue={audiooutput.label}
                      />
                      <img
                        src="/images/icon_dropdown_grey_02.svg"
                        alt="dropdown"
                      />
                    </div>
                    <div className="devicesWrap">
                      {speakerDevices &&
                        speakerDevices.map((x) => {
                          return (
                            <div
                              className="device"
                              onClick={() => handleSpeakerDeviceChange(x)}
                              title={x.label}
                            >
                              {x.label}
                            </div>
                          );
                        })}
                      <div
                        className="device"
                        onClick={() => {
                          handleSpeakerDeviceChange(null);
                        }}
                      >
                        없음
                      </div>
                    </div>
                  </>
                )}
              </VideoDevicesDropdownWrapper>
            </div>
          </VideoWrapper>
          <SubtitleWrapper mt={"7rem"}>
            <SubTitle>안주</SubTitle>
            {errors.food && (
              <div className="error">
                <img src="/images/icon_information.svg" alt="information" />
                <label>{errors.food.message}</label>
              </div>
            )}
          </SubtitleWrapper>
          <StyledInput
            type="text"
            placeholder="안주를 입력해 주세요."
            error={errors.food}
            maxLength={10}
            {...register("food", { required: "안주를 입력해 주세요." })}
          />
          <div className="themeShowWrap">
            <div className="theme">
              <SubtitleWrapper mt={"7rem"}>
                <SubTitle>테마</SubTitle>
                {errors.theme && (
                  <div className="error">
                    <img src="/images/icon_information.svg" alt="information" />
                    <label>{errors.theme.message}</label>
                  </div>
                )}
              </SubtitleWrapper>
              <StyledInput
                type="text"
                placeholder="테마를 입력해 주세요."
                error={errors.theme}
                maxLength={10}
                {...register("theme", { required: "테마를 입력해 주세요." })}
              />
            </div>
            <div className="showOption">
              <SubtitleWrapper mt={"7rem"}>
                <SubTitle>공개 / 비공개 설정</SubTitle>
              </SubtitleWrapper>
              <ShowHideDropdownWrapper
                open={showOpen}
                count={2}
                onClick={() => setShowOpen(!showOpen)}
              >
                <div className="inputWrap">
                  <input
                    type="text"
                    placeholder="-- 선택 --"
                    small
                    disabled
                    {...register("show")}
                    defaultValue={"공개"}
                  />
                  <img src="/images/icon_dropdown_grey_02.svg" alt="dropdown" />
                </div>
                <div className="devicesWrap">
                  {["공개", "비공개"].map((x) => {
                    return (
                      <div
                        className="device"
                        onClick={() => setValue("show", x)}
                      >
                        {x}
                      </div>
                    );
                  })}
                </div>
              </ShowHideDropdownWrapper>
            </div>
          </div>

          <SubmitWrapper>
            <CancelButton
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            >
              취소하기
            </CancelButton>
            <StartLiveButton type="submit" disabled={!isDirty || !isValid}>
              시작하기
            </StartLiveButton>
          </SubmitWrapper>
        </form>
      </NewLiveContainer>
    </>
  );
};

export default memo(NewLive);
