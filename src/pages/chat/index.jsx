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
  const [playvideo, setPlayvideo] = useState(true);
  const [playaudio, setPlayaudio] = useState(true);
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

  const quitChatroom = async (isHost) => {
    if (isHost) {
      await sulmoggoApi.removeChatRoom(chatRoomId);
    } else {
      await sulmoggoApi.leaveChatRoom(chatRoomId);
    }
    await sulmoggoApi.removeChatRoom(chatRoomId);
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

  const onClickModalOpen = (username) => {
    setSelectedFriend(username);
    setOpenFriendModal(true);
  };
  const onClickModalClose = () => {
    setSelectedFriend("");
    setOpenFriendModal(false);
  };

  //roomId가 바뀔때마다 다시 연결
  useEffect(() => {
    connect();
    console.log(clientRef.current.connected);
    const foo = async () => {
      try {
        sulmoggoApi.enterChatRoom(chatRoomId);
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

  useEffect(() => {
    // 1초마다 시간 갱신
    const updateTime = () => {
      if (createdAt) {
        // console.log("🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐");
        // console.log("loop : ", createdAt);
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

  useEffect(() => {
    const foo = username === roomData?.username;
    const bar = () => {
      quitChatroom(foo);
    };
    window.addEventListener("beforeunload", bar);
    window.addEventListener("unload", bar);
    return () => {
      window.removeEventListener("beforeunload", bar);
      window.removeEventListener("unload", bar);
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
                  <AddHostFriendButton>
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
          <div className="videoWrap">
            {roomData && (
              <VideoViewer
                host={roomData.username}
                username={username ? username : "anonymous"}
                chatRoomId={chatRoomId}
                version={roomData.version}
                selectedDevices={
                  state?.selectedDevices ? state.selectedDevices : null
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
                onClick={() => setPlayvideo(!playvideo)}
              >
                <img
                  src={`/images/icon_video_${
                    playvideo ? "available" : "disabled"
                  }.svg`}
                  alt="video"
                />
              </VideoButton>
              <VideoButton
                play={playaudio}
                onClick={() => setPlayaudio(!playaudio)}
              >
                <img
                  src={`/images/icon_audio_${
                    playaudio ? "available" : "disabled"
                  }.svg`}
                  alt="audio"
                />
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
