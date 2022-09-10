import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import sulmoggoApi from "../../shared/apis";
import { Alcohol, LiveVersion } from "../../shared/options";
import { useDropzone } from "react-dropzone";
import { PageTitle } from "../../pages/tables/styles";
import {
  NewLiveContainer,
  StartLiveButton,
  SubmitWrapper,
  SubTitle,
  SubtitleWrapper,
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
  videoinputState,
} from "../../recoil/mediaDevices";
import Footer from "../common/Footer";
import Header from "../common/Header";

const DeviceSetup = (props) => {
  const { chatRoomId } = useParams();
  const alcohol = useRef({});
  const videoPreview = useRef();
  const speakerRef = useRef();
  const { deviceFor, setDeviceFor } = props;
  const [videoinput, setVideoinput] = useRecoilState(videoinputState);
  const [audioinput, setAudioinput] = useRecoilState(audioinputState);
  const [audiooutput, setAudiooutput] = useRecoilState(audiooutputState);

  const [camerasOpen, setCamerasOpen] = useState(false);
  const [audiosOpen, setAudiosOpen] = useState(false);
  const [speakersOpen, setSpeakersOpen] = useState(false);

  const [cameraDevices, setCameraDevices] = useState([]);
  const [audioDevices, setAudioDevices] = useState([]);
  const [speakerDevices, setSpeakerDevices] = useState([]);
  const [, setPlayaudio] = useRecoilState(playaudioState);
  const [playvideo, setPlayvideo] = useRecoilState(playvideoState);

  const [speakerAvailable, setSpeakerAvailable] = useState(false);
  const track = videoPreview.current?.srcObject?.getVideoTracks()[0];

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      version: LiveVersion[0].value,
      version_text: LiveVersion[0].text,
      show: "공개",
    },
  });

  const onSubmit = (data) => {
    setDeviceFor(chatRoomId);
  };

  const initMedia = async () => {
    await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    await navigator.mediaDevices.enumerateDevices().then((devices) => {
      setCameraDevices(devices.filter((x) => x.kind === "videoinput"));
      setAudioDevices(devices.filter((x) => x.kind === "audioinput"));
      setSpeakerDevices(devices.filter((x) => x.kind === "audiooutput"));
    });
    setSpeakerAvailable(speakerRef.current?.setSinkId !== undefined);
  };

  const getUserMedia = async (constraints) => {
    if (cameraDevices.length > 0 && audioDevices.length > 0) {
      await navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        if ("srcObject" in videoPreview.current) {
          videoPreview.current.srcObject = stream;
          console.log("🍇current is changing...");
          // videoPreview.current.muted = true
        } else {
          videoPreview.current.src = window.URL.createObjectURL(stream);
        }
      });
    }
  };

  useEffect(() => {
    console.log("initializing media devices...");
    initMedia();
  }, []);

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
    speakerRef.current.setSinkId(device.deviceId);
  };

  useEffect(() => {
    if (videoinput.deviceId !== null) {
      const foo = async () => {
        if (playvideo) {
          await getUserMedia({
            video: { deviceId: videoinput.deviceId },
            audio: true,
          });
          console.log("🍎getusermedia");
        }
        // console.log(videoinput, audioinput, audiooutput);
        // console.log("this..");
      };
      foo();
    }
    const stopStream = () => {
      track.stop();
    };
    window.addEventListener("beforeunload", stopStream);
    return () => {
      window.removeEventListener("beforeunload", stopStream);
    };
    // eslint-disable-next-line
  }, [videoinput]);

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
  }, [cameraDevices, audioDevices, speakerDevices]);

  return (
    <>
      <Header />
      <NewLiveContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <PageTitle>술약속 참여</PageTitle>
          <VideoWrapper isInput={playvideo}>
            <div>
              <div className="video">
                {!playvideo && (
                  <img src="/images/icon_video_disabled.svg" alt="video off" />
                )}
                <video
                  autoPlay
                  ref={videoPreview}
                  hidden={!playvideo}
                  poster={process.env.PUBLIC_URL + "images/placeholder.png"}
                  muted={true}
                />
              </div>
              <audio ref={speakerRef} hidden />
            </div>
            <div>
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
              <StartLiveButton type="submit">시작하기</StartLiveButton>
            </div>
          </VideoWrapper>
        </form>
      </NewLiveContainer>
      <Footer />
    </>
  );
};

export default DeviceSetup;
