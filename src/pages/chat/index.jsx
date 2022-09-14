import React, { useRef, useState, useEffect, memo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import sulmoggoApi from "../../shared/apis";
import {
  AlchholTag,
  Separator,
  SnackTag,
  ThemeTag,
  UserLevel,
} from "../../styles/CommonStyles";
import {
  AddHostFriendButton,
  ChatButton,
  ChatContent,
  ChatHeader,
  ChatInputWrapper,
  ChatWrapper,
  LiveWrapper,
  ProfileCircle,
  ProfileWrap,
  RoomDataWrap,
  VideoButton,
  VideoContainer,
} from "./styles";
import moment from "moment";
import VideoViewer from "../../components/videoviewer";
import AddFriendModal from "../../components/addfriendmodal";
import ShareModal from "../../components/sharemodal";
import { useRecoilState } from "recoil";
import {
  playvideoState,
  playaudioState,
  videoinputState,
  audioinputState,
  audiooutputState,
  setDeviceForState,
} from "../../recoil/mediaDevices";
import DeviceSetup from "../../components/devicesetup";
import { getLevel } from "../../shared/modules";

const TimeLabel = ({createdAt}) => {
  const [time, setTime] = useState(0);
  const timer = useRef(null);
  // 방 생성 이후 시간 계산(1초마다)
    useEffect(() => {
      const updateTime = () => {
        if (createdAt) {
          var date1 = moment(createdAt);
          var date2 = moment();
          var diff = date2.diff(date1, "seconds");
          setTime(moment.utc(diff * 1000).format("HH:mm:ss"));
        }
      };
      timer.current = setInterval(() => updateTime(), 1000);
      return () => {
        if (timer.current !== null) clearInterval(timer.current);
      };
    }, [createdAt]);
  return (<span>{time || "00:00:00"}</span>)
}

const Chat = (props) => {
  const [content, setContent] = useState([]);
  const [roomData, setRoomData] = useState(null);
  const [usercount, setUserCount] = useState(0);
  const [deviceFor, setDeviceFor] = useRecoilState(setDeviceForState);

  const [selectedFriend, setSelectedFriend] = useState("");
  const [openFriendModal, setOpenFriendModal] = useState(false);



  const chatRef = useRef();
  const lastOne = useRef();
  const [createdAt, setCreatedAt] = useState(0);
  const { chatRoomId } = useParams();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const naviagte = useNavigate();

  const [, setVideoinput] = useRecoilState(videoinputState);
  const [, setAudioinput] = useRecoilState(audioinputState);
  const [, setAudiooutput] = useRecoilState(audiooutputState);
  const [playvideo, setPlayvideo] = useRecoilState(playvideoState);
  const [playaudio, setPlayaudio] = useRecoilState(playaudioState);

  const [camerasOpen, setCamerasOpen] = useState(false);
  const [audiosOpen, setAudiosOpen] = useState(false);
  const [cameraDevices, setCameraDevices] = useState([]);
  const [audioDevices, setAudioDevices] = useState([]);
  const [speakerDevices, setSpeakerDevices] = useState([]);
  const speakerRef = useRef();

  const [speakerAvailable, setSpeakerAvailable] = useState(false);
  let isHost = username === roomData?.username;
  const clientRef = useRef(null);
  const headers = { Authorization: token };
  let isMobile = window.innerWidth < 1024;
  const [mobileChatOpen, setMobileChatOpen] = useState(false)

  // 공유모달 관련
  const [isOpen, setOpen] = useState();
  const onClose = () => {
    setOpen(false);
  };
  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("링크가 복사되었습니다");
    } catch (error) {
      alert(error, "복사실패");
    }
  };

  const connect = () => {
    clientRef.current = new Client({
      brokerURL: `wss://api.sulmoggo.live/ws-stomp`,
      connectHeaders: headers,
      webSocketFactory: () =>
        new SockJS(`${process.env.REACT_APP_API_SERVER}/ws-stomp`),
      debug: (str) => {
        // console.log(str);
      },
      onConnect: (frame) => {
        socketSubscribe();
      },
      onStompError: (frame) => {
        // console.log(frame);
      },
    });
    clientRef.current.activate();
  };

  // 소켓연결
  const socketSubscribe = () => {
    if (clientRef.current.connected) {
      clientRef.current.subscribe(
        `/sub/chat/room/${chatRoomId}`,
        (data) => {
          const newMessage = JSON.parse(data.body);
          setUserCount(JSON.parse(data.body).userCount);
          // console.log(JSON.parse(data.body));
          // console.log("여기!!!!!!!!!!");
          setContent((prevContent) => [...prevContent, newMessage]);
          lastOne.current?.scrollIntoView();
        },
        headers
      );
    }
  };

  // 방장일 경우 방 삭제 api 호출
  const quitChatroom = async (isHost) => {
    if (isHost) {
      await sulmoggoApi.removeChatRoom(chatRoomId);
    }
  };

  // 메세지 보내기
  const sendMessage = () => {
    // console.log({
    //   type: "TALK",
    //   chatRoomId: chatRoomId,
    //   sender: username,
    //   message: chatRef.current.value,
    // });
    clientRef.current.publish({
      destination: `/pub/chat/message`,
      headers,
      body: JSON.stringify({
        type: "TALK",
        chatRoomId: chatRoomId,
        sender: username,
        message: chatRef.current.value,
      }),
    });

    chatRef.current.value = "";
    if (chatRef === "") {
      return;
    }
  };

  // 카메라, 마이크, 스피커 목록 가져오기
  const getDevices = async () => {
    let devices = [];
    try {
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      devices = await navigator.mediaDevices.enumerateDevices();
      setCameraDevices(devices.filter((x) => x.kind === "videoinput"));
      setAudioDevices(devices.filter((x) => x.kind === "audioinput"));
      setSpeakerDevices(devices.filter((x) => x.kind === "audiooutput"));
      setSpeakerAvailable(speakerRef.current?.setSinkId !== undefined);
    } catch {
      console.log("카메라 혹은 마이크 권한이 없습니다.");
    }
  };

  const handleCameraDeviceChange = (device) => {
    setVideoinput(device);
    setCamerasOpen(false);
  };
  const handleAudioDeviceChange = (device) => {
    setAudioinput(device);
    setAudiosOpen(false);
  };
  const handleSpeakerDeviceChange = (device) => {
    setAudiooutput(device);
    speakerRef.current.setSinkId(device.deviceId);
    setAudiosOpen(false);
  };

  // 친구추가 모달
  const onClickModalOpen = (username) => {
    setSelectedFriend(username);
    setOpenFriendModal(true);
  };
  const onClickModalClose = () => {
    setSelectedFriend("");
    setOpenFriendModal(false);
  };

  // 기기 목록 가져오기
  useEffect(() => {
    getDevices();
  }, []);

  window.addEventListener("load", function () {
    setTimeout(function () {
      // This hides the address bar:
      window.scrollTo(0, 1);
    }, 0);
  });

  // 소켓 연결 및 방 데이터 로드
  // roomId가 바뀔때마다 다시 연결.
  useEffect(() => {
    const foo = async () => {
      await sulmoggoApi
        .getRoomData(chatRoomId)
        .then((res) => {
          if (res) {
            setRoomData(res.data.body);
            setUserCount(res.data.body?.userCount + 1);
            setCreatedAt(res.data.body.createdAt);
            connect();
          }
        })
        .catch((e) => {
          alert(e.response?.data?.message);
          naviagte("/");
        });
    };
    foo();

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
    // eslint-disable-next-line
  }, [chatRoomId]);



  // 방장이 방을 떠날 경우 방 삭제
  useEffect(() => {
    const leaveRoom = () => {
      quitChatroom(isHost);
    };
    window.addEventListener("pagehide", leaveRoom);
    window.addEventListener("beforeunload", leaveRoom);
    window.addEventListener("unload", leaveRoom);
    return () => {
      window.addEventListener("pagehide", leaveRoom);
      window.removeEventListener("beforeunload", leaveRoom);
      window.removeEventListener("unload", leaveRoom);
    };
    // eslint-disable-next-line
  }, [username, roomData?.username]);

  if ((deviceFor || false) === chatRoomId) {
    return (
      <LiveWrapper>
        <div className="live_left_box">
          <div className="upper">
            {isMobile && <ChatHeader>
              <div>
                <span>{roomData?.title || "방제목이 없습니다."}</span>
              </div>
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  if (window.confirm("채팅방을 나가시겠습니까?")) {
                    // console.log("나가기버튼. 내용 : ", chatRef.current.value);
                    window.location.href = "/rooms";
                  }
                }}
              >
                <img src="/images/icon_out_mobile.svg" alt="out" />
              </button>
            </ChatHeader>}
            <RoomDataWrap>
              <span className="shareWrap">
                <h1>{roomData?.title || "방제목이 없습니다."}</h1>
                <button className="share" onClick={() => setOpen(true)}>
                  공유하기
                </button>
                <ShareModal
                  isOpen={isOpen}
                  onClose={onClose}
                  copy={copy}
                  right="0"
                  top="4.8rem"
                  onair
                  chatRoomId={chatRoomId}
                />
              </span>
              {isMobile && <div className="tagWrap">
                <AlchholTag>{roomData?.alcoholtag || "주종"}</AlchholTag>
                <SnackTag>{roomData?.food || "안주"}</SnackTag>
                <ThemeTag>{roomData?.theme || "테마"}</ThemeTag>
              </div>}
            </RoomDataWrap>
            <div className="infoWrap">
              {!isMobile && <div className="tagWrap">
                <AlchholTag>{roomData?.alcoholtag || "주종"}</AlchholTag>
                <SnackTag>{roomData?.food || "안주"}</SnackTag>
                <ThemeTag>{roomData?.theme || "테마"}</ThemeTag>
              </div>}
              <div className="statWrap">
                <img src="/images/icon_clock_grey_02.svg" alt="clock" />
                <TimeLabel createdAt={roomData?.createdAt}/>
                <Separator />
                <img src="/images/icon_people_grey_02.svg" alt="people" />
                <span>{usercount || 0}</span>
              </div>
            </div>
          </div>
          <VideoContainer host={roomData?.version?.startsWith("host")} chatOpen={mobileChatOpen}>
            <audio ref={speakerRef} hidden />
            <div className="videoWrap">
              {roomData && (
                <VideoViewer
                  host={roomData.username}
                  username={username ? username : "anonymous"}
                  chatRoomId={chatRoomId}
                  version={roomData.version}
                  openModal={onClickModalOpen}
                />
              )}
            </div>
            {isMobile && mobileChatOpen && <div className="chatWrap">
              <ChatWrapper>
                {content.map((data, idx) => {
                  return (
                    <ChatContent
                      key={Math.random().toString(36).substr(2, 11)}
                      ref={idx !== content.length - 1 ? null : lastOne}
                    >
                      <span className="chatuser">{data.sender}</span>
                      <span className="chattext">: {data.message}</span>
                    </ChatContent>
                  );
                })}
                <ChatContent />
              </ChatWrapper>
              <ChatInputWrapper>
                <form action="">
                  <div className="sendInputWrapper">
                    <input
                      type="text"
                      placeholder="채팅을 입력해 주세요"
                      ref={chatRef}
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if (chatRef.current.value !== "") {
                          sendMessage();
                        }
                      }}
                    >
                      <img src="/images/icon_send.svg" alt="send airplane" />
                    </button>
                  </div>
                </form>
              </ChatInputWrapper>
            </div>}
            {((roomData?.version.startsWith("host") &&
              username === roomData?.username) ||
              roomData?.version.startsWith("friend")) && (
                <div className="videoButtonWrap">
                  <VideoButton
                    play={playvideo}
                    open={camerasOpen}
                    count={(cameraDevices.length || 1) + 1}
                    onBlur={() => setCamerasOpen(false)}
                  >
                    <div className="devicesWrap">
                      <div className="deviceKind">비디오 설정</div>
                      {cameraDevices.length > 0 ? (
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
                        })
                      ) : (
                        <div className="device">카메라 없음</div>
                      )}
                    </div>
                    <img
                      src={`/images/icon_video_${playvideo ? "available" : "disabled"
                        }.svg`}
                      alt="video"
                      onClick={() => setPlayvideo(!playvideo)}
                    />
                    <div
                      className="videoarrow"
                      onClick={() => setCamerasOpen(!camerasOpen)}
                    >
                      <img
                        src={"/images/icon_dropdown_video.svg"}
                        className="videoarrow"
                        alt="dropdown"
                      />
                    </div>
                  </VideoButton>
                  <VideoButton
                    play={playaudio}
                    open={audiosOpen}
                    count={
                      (audioDevices.length || 1) +
                      (speakerAvailable ? speakerDevices.length || 1 : 0) +
                      (speakerAvailable ? 2 : 1)
                    }
                    onBlur={() => setAudiosOpen(false)}
                  >
                    <div className="devicesWrap">
                      <div className="deviceKind">마이크 설정</div>
                      {audioDevices.length > 0 ? (
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
                        })
                      ) : (
                        <div className="device">마이크 없음</div>
                      )}
                      {speakerAvailable && (
                        <div className="deviceKind">스피커 설정</div>
                      )}
                      {speakerAvailable &&
                        (speakerDevices.length > 0 ? (
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
                          })
                        ) : (
                          <div className="device">스피커 없음</div>
                        ))}
                    </div>
                    <img
                      src={`/images/icon_audio_${playaudio ? "available" : "disabled"
                        }.svg`}
                      alt="audio"
                      onClick={() => setPlayaudio(!playaudio)}
                    />
                    <div
                      className="videoarrow"
                      onClick={() => setAudiosOpen(!audiosOpen)}
                    >
                      <img
                        src={"/images/icon_dropdown_video.svg"}
                        className="videoarrow"
                        alt="dropdown"
                      />
                    </div>
                  </VideoButton>
                </div>
              )}
            {isMobile && <div className="chatButtonWrap">
              <ChatButton
                onClick={() => {
                  setMobileChatOpen(!mobileChatOpen)
                }}
              >
                <img
                  src={`/images/icon_chat_mobile.svg`}
                  alt="chat"
                />
                <p>채팅</p>
              </ChatButton>
            </div>}
          </VideoContainer>
          {roomData?.version?.startsWith("host") && (
            <div className="lower">
              <ProfileWrap>
                <ProfileCircle src={roomData?.profileUrl} />
                <div className="userWrap">
                  <div className="username">
                    {roomData?.username || "사용자가 없습니다."}
                  </div>
                  <UserLevel>{getLevel(roomData?.level || 0)}</UserLevel>
                </div>
              </ProfileWrap>
              {!isHost && (
                <AddHostFriendButton
                  onClick={() => onClickModalOpen(roomData?.username)}
                >
                  <img src="/images/icon_addfriend.svg" alt="add friend" />
                  <span>친구추가</span>
                </AddHostFriendButton>
              )}
            </div>
          )}
        </div>
        {!isMobile && <div className="live_right_box">
          <ChatHeader>
            <div>
              <img src="/images/icon_chat.svg" alt="chat" />
              <span>채팅</span>
            </div>
            <button
              onClick={async (e) => {
                e.preventDefault();
                if (window.confirm("채팅방을 나가시겠습니까?")) {
                  // console.log("나가기버튼. 내용 : ", chatRef.current.value);
                  window.location.href = "/rooms";
                }
              }}
            >
              <img src="/images/icon_out.svg" alt="out" />
            </button>
          </ChatHeader>
          <ChatWrapper>
            {content.map((data, idx) => {
              return (
                <ChatContent
                  key={Math.random().toString(36).substr(2, 11)}
                  ref={idx !== content.length - 1 ? null : lastOne}
                >
                  <span className="chatuser">{data.sender}</span>
                  <span className="chattext">: {data.message}</span>
                </ChatContent>
              );
            })}
            <ChatContent />
          </ChatWrapper>
          <ChatInputWrapper>
            <form action="">
              <div className="sendInputWrapper">
                <input
                  type="text"
                  placeholder="채팅을 입력해 주세요"
                  ref={chatRef}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (chatRef.current.value !== "") {
                      sendMessage();
                    }
                  }}
                >
                  <img src="/images/icon_send.svg" alt="send airplane" />
                </button>
              </div>
            </form>
          </ChatInputWrapper>
        </div>}
        {openFriendModal && (
          <AddFriendModal
            username={selectedFriend}
            onClose={onClickModalClose}
          />
        )}
      </LiveWrapper>
    );
  } else {
    return <DeviceSetup deviceFor={deviceFor} setDeviceFor={setDeviceFor} />;
  }
};

export default memo(Chat);
