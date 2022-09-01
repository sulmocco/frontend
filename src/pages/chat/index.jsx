import React, { useRef, useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { Stomp, Client, Message } from "@stomp/stompjs";
import sulmoggoApi from "../../shared/apis";
import {
  AlchholTag,
  Separator,
  SnackTag,
  ThemeTag,
} from "../../styles/CommonStyles";
import {
  AddHostFriendButton,
  ChatContent,
  ChatHeader,
  ChatInputWrapper,
  ChatWrapper,
  LiveWrapper,
  ProfileCircle,
  ProfileWrap,
  VideoButton,
  VideoContainer,
} from "./styles";
import moment from "moment";
import VideoViewer from "../../components/videoviewer";
import AddFriendModal from "../../components/addfriendmodal";

const Chat = (props) => {
  const [content, setContent] = useState([]);
  const [roomData, setRoomData] = useState(null);
  const [usercount, setUserCount] = useState(0);

  const [selectedFriend, setSelectedFriend] = useState("");
  const [openFriendModal, setOpenFriendModal] = useState(false);

  const [time, setTime] = useState(0);

  const chatRef = useRef();
  const lastOne = useRef();
  const [createdAt, setCreatedAt] = useState(0);
  const { chatRoomId } = useParams();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const naviagte = useNavigate();

  const { state } = useLocation();
  const [selectedDevices, setSelectedDevices] = useState(state?.selectedDevices)
  const [playvideo, setPlayvideo] = useState(Boolean(state?.playvideo));
  const [playaudio, setPlayaudio] = useState(Boolean(state?.playaudio));
  const [camerasOpen, setCamerasOpen] = useState(false);
  const [audiosOpen, setAudiosOpen] = useState(false);
  const [cameraDevices, setCameraDevices] = useState([]);
  const [audioDevices, setAudioDevices] = useState([]);
  const [speakerDevices, setSpeakerDevices] = useState([])
  const speakerRef = useRef()

  let isHost = username === roomData?.username;
  const timer = useRef(null);
  const clientRef = useRef(null);
  const headers = { Authorization: token };

  const connect = () => {
    clientRef.current = new Client({
      brokerURL: `wss://api.sulmoggo.live/ws-stomp`,
      connectHeaders: headers,
      webSocketFactory: () =>
        new SockJS(`${process.env.REACT_APP_API_SERVER}/ws-stomp`),
      debug: (str) => {
        console.log(str);
      },
      onConnect: (frame) => {
        socketSubscribe();
      },
      onStompError: (frame) => {
        console.log(frame);
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
          console.log(JSON.parse(data.body));
          console.log("여기!!!!!!!!!!");
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
    console.log({
      type: "TALK",
      chatRoomId: chatRoomId,
      sender: username,
      message: chatRef.current.value,
    });
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
    let devices = []
    const cameraPermission = await navigator.permissions.query({
      name: "camera",
    });
    const micPermission = await navigator.permissions.query({
      name: "microphone",
    });
    if (
      cameraPermission.state === "granted" ||
      micPermission.state === "granted"
    ) {
      devices = await navigator.mediaDevices.enumerateDevices();
      setCameraDevices(devices.filter((x) => x.kind === "videoinput"));
      setAudioDevices(devices.filter((x) => x.kind === "audioinput"));
      setSpeakerDevices(devices.filter((x) => x.kind === "audiooutput"));
    }
  }


  const handleCameraDeviceChange = (device) => {
    setSelectedDevices({
      ...selectedDevices,
      video: device
        ? { ...selectedDevices.video, deviceId: device.deviceId }
        : false,
    });
    setCamerasOpen(false)
  };
  const handleAudioDeviceChange = (device) => {
    setSelectedDevices({
      ...selectedDevices,
      audio: device
        ? { ...selectedDevices.audio, deviceId: device.deviceId }
        : false,
    });
    setAudiosOpen(false)
  };
  const handleSpeakerDeviceChange = (device) => {
    speakerRef.current.setSinkId(device.deviceId)
    setAudiosOpen(false)
  }

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
  }, [])

  // 소켓 연결 및 방 데이터 로드
  // roomId가 바뀔때마다 다시 연결.
  useEffect(() => {
    connect();
    console.log(clientRef.current.connected);
    const foo = async () => {
      try {
        const data = await sulmoggoApi.getRoomData(chatRoomId);
        console.log(data.data.body);
        setRoomData(data.data.body);
        setUserCount(data.data.body?.userCount + 1);
        setCreatedAt(data.data.body.createdAt);
        setTimeout(() => {}, 1000);
      } catch {
        console.log("뭔가 잘못됨");
      }
    };
    foo();

    return () => {
      clientRef.current.deactivate();
    };
    // eslint-disable-next-line
  }, [chatRoomId]);

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

  // 방장이 방을 떠날 경우 방 삭제
  useEffect(() => {
    const leaveRoom = () => {
      quitChatroom(isHost);
    };
    window.addEventListener("beforeunload", leaveRoom);
    window.addEventListener("unload", leaveRoom);
    return () => {
      window.removeEventListener("beforeunload", leaveRoom);
      window.removeEventListener("unload", leaveRoom);
    };
    // eslint-disable-next-line
  }, [username, roomData?.username]);
  return (
    <LiveWrapper>
      <div className="live_left_box">
        <div className="upper">
          <ProfileWrap>
            <ProfileCircle />
            <div>
              <h1>{roomData?.title || "방제목이 없습니다."}</h1>
              <div className="userWrap">
                <div className="username">
                  {roomData?.username || "사용자가 없습니다."}
                </div>
                {!isHost && (
                  <AddHostFriendButton onClick={() => onClickModalOpen(roomData?.username)}>
                    <img src="/images/icon_addfriend.svg" alt="add friend" />
                    <span>친구추가</span>
                  </AddHostFriendButton>
                )}
              </div>
            </div>
          </ProfileWrap>
          <div className="infoWrap">
            <div className="tagWrap">
              <AlchholTag>{roomData?.alcoholtag || "주종"}</AlchholTag>
              <SnackTag>{roomData?.food || "안주"}</SnackTag>
              <ThemeTag>{roomData?.theme || "테마"}</ThemeTag>
            </div>
            <div className="statWrap">
              <img src="/images/icon_clock_grey_02.svg" alt="clock" />
              <span>{time || "00:00:00"}</span>
              <Separator />
              <img src="/images/icon_people_grey_02.svg" alt="people" />
              <span>{usercount || 0}</span>
            </div>
          </div>
        </div>
        <VideoContainer host={roomData?.version?.startsWith("host")}>
          <audio ref={speakerRef} hidden />
          <div className="videoWrap">
            {roomData && (
              <VideoViewer
                host={roomData.username}
                username={username ? username : "anonymous"}
                chatRoomId={chatRoomId}
                version={roomData.version}
                selectedDevices={
                  selectedDevices
                }
                playvideo={playvideo}
                playaudio={playaudio}
                openModal={onClickModalOpen}
              />
            )}
          </div>
          {((roomData?.version.startsWith("host") &&
            username === roomData?.username) ||
            roomData?.version.startsWith("friend")) && (
            <div className="videoButtonWrap">
              <VideoButton
                play={playvideo}
                open={camerasOpen}
                count={cameraDevices.length + 1}
                onBlur={() => setCamerasOpen(false)}
              >
                <div className="devicesWrap">
                  <div className="deviceKind">
                    비디오 설정
                  </div>
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
                </div>
                <img
                  src={`/images/icon_video_${
                    playvideo ? "available" : "disabled"
                  }.svg`}
                  alt="video"
                  onClick={() => setPlayvideo(!playvideo)}
                />
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => setCamerasOpen(!camerasOpen)}>
                <rect width="32" height="32" rx="10" fill="#F2F3F3"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.29289 12.207C8.68342 11.8164 9.31658 11.8164 9.70711 12.207L15.2929 17.7927C15.6834 18.1833 16.3166 18.1833 16.7071 17.7927L22.2929 12.207C22.6834 11.8164 23.3166 11.8164 23.7071 12.207C24.0976 12.5975 24.0976 13.2306 23.7071 13.6212L18.1213 19.207C16.9497 20.3785 15.0503 20.3785 13.8787 19.207L8.29289 13.6212C7.90237 13.2306 7.90237 12.5975 8.29289 12.207Z" fill="#7A7A80"/>
                </svg>
              </VideoButton>
              <VideoButton
                play={playaudio}
                open={audiosOpen}
                count={audioDevices.length + speakerDevices.length + 2}
                onBlur={() => setAudiosOpen(false)}
              >
                <div className="devicesWrap">
                  <div className="deviceKind">
                    마이크 설정
                  </div>
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
                    <div className="deviceKind">
                    스피커 설정
                  </div>
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
                </div>
                <img
                  src={`/images/icon_audio_${
                    playaudio ? "available" : "disabled"
                  }.svg`}
                  alt="audio"
                  onClick={() => setPlayaudio(!playaudio)}
                />
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => setAudiosOpen(!audiosOpen)}>
                <rect width="32" height="32" rx="10" fill="#F2F3F3"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.29289 12.207C8.68342 11.8164 9.31658 11.8164 9.70711 12.207L15.2929 17.7927C15.6834 18.1833 16.3166 18.1833 16.7071 17.7927L22.2929 12.207C22.6834 11.8164 23.3166 11.8164 23.7071 12.207C24.0976 12.5975 24.0976 13.2306 23.7071 13.6212L18.1213 19.207C16.9497 20.3785 15.0503 20.3785 13.8787 19.207L8.29289 13.6212C7.90237 13.2306 7.90237 12.5975 8.29289 12.207Z" fill="#7A7A80"/>
                </svg>
              </VideoButton>
            </div>
          )}
        </VideoContainer>
      </div>
      <div className="live_right_box">
        <ChatHeader>
          <div>
            <img src="/images/icon_chat.svg" alt="chat" />
            <span>채팅</span>
          </div>
          <button
            onClick={async (e) => {
              e.preventDefault();
              if (window.confirm("채팅방을 나가시겠습니까?")) {
                await quitChatroom(isHost);
                // console.log("나가기버튼. 내용 : ", chatRef.current.value);
                naviagte("/rooms");
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
      </div>
      {openFriendModal && (
        <AddFriendModal username={selectedFriend} onClose={onClickModalClose} />
      )}
    </LiveWrapper>
  );
};

export default Chat;
