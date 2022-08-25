import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
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

const Chat = (props) => {
  const [content, setContent] = useState([]);
  const [roomData, setRoomData] = useState(null);
  const [usercount, setUserCount] = useState(0);
  const [playvideo, setPlayvideo] = useState(true)
  const [playaudio, setPlayaudio] = useState(true)
  const [time, setTime] = useState(0);
  const chatRef = useRef();
  const lastOne = useRef();
  const [createdAt, setCreatedAt] = useState(0);
  const { chatRoomId } = useParams();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const naviagte = useNavigate();
  const {state} = useLocation()

  // const sock = new SockJS(`${process.env.REACT_APP_API_SERVER}/chat`); // 서버주소 수정하기
  const sock = new SockJS(`${process.env.REACT_APP_API_SERVER}/ws-stomp`); // 서버주소 수정하기
  const client = Stomp.over(sock);

  const headers = { Authorization: token };

  // 웹소켓 연결시 stomp에서 자동으로 connect이 되었다는것을 console에 보여주는데 그것을 감추기 위한 debug
  client.debug = null;

  // 소켓연결
  const socketConnect = () => {
    try {
      client.connect(headers, () => {
        // enterChatroom()
        client.subscribe(
          `/sub/chat/room/${chatRoomId}`,
          (data) => {
            const newMessage = JSON.parse(data.body);
            setUserCount(JSON.parse(data.body).userCount);
            console.log(JSON.parse(data.body));
            console.log("여기!!!!!!!!!!");
            setContent((prevContent) => [...prevContent, newMessage]);
            // chatListRef.current.scro
            lastOne.current.scrollIntoView();
          },
          headers
        );
        // console.log(res);
      });
    } catch (error) {
      console.log("연결실패", error);
    }
  };
  // 소켓연결 해제
  const socketDisConnect = () => {
    try {
      client.disconnect(() => {
        client.unsubscribe("sub-0");
      });
    } catch (error) {
      console.log("연결해제 실패", error);
    }
  };

  const quitChatroom = async () => {
    if (roomData?.username === username) {
      await sulmoggoApi.removeChatRoom(chatRoomId);
    } else {
      await client.send(
        `pub/chat/message`,
        headers,
        JSON.stringify({
          type: "QUIT",
          chatRoomId: chatRoomId,
          sender: username,
          message: chatRef.current.value,
        })
      );
    }
    socketDisConnect();
  };

//   const enterChatroom = async () => {
//     const res = await client.send(
//       `pub/chat/message`,
//       headers,
//       JSON.stringify({
//         type: "ENTER",
//         chatRoomId: chatRoomId,
//         sender: username,
//         message: chatRef.current.value,
//       })
//     );
//   };

  // 메세지 보내기
  const sendMessage = async () => {
    try {
      console.log({
        type: "TALK",
        chatRoomId: chatRoomId,
        sender: username,
        message: chatRef.current.value,
      });
      const res = await client.send(
        `/pub/chat/message`,
        headers,
        JSON.stringify({
          type: "TALK",
          chatRoomId: chatRoomId,
          sender: username,
          message: chatRef.current.value,
        })
      );
      console.log("SEND가 끝남. res : " + res);
      chatRef.current.value = ""
      if (chatRef === "") {
        return;
      }
    } catch (error) {
      console.log("메세지 보내기 실패", error);
    }
  };

  // 1초마다 시간 갱신
  (function loop() {
    setTimeout(function () {
      loop();
      if (createdAt) {
        console.log("loop : ", createdAt);
        var date1 = moment(createdAt);
        var date2 = moment();
        var diff = date2.diff(date1, "seconds");
        setTime(moment.utc(diff * 1000).format("HH:mm:ss"));
      }
    }, 1000);
  })();

  // 메세지 받기

  
  //roomId가 바뀔때마다 다시 연결
  useEffect(() => {
    // console.log(props.selectedDevices);
    socketConnect();
    const foo = async () => {
      try {
        sulmoggoApi.enterChatRoom(chatRoomId);
        const data = await sulmoggoApi.getRoomData(chatRoomId);
        console.log(data.data.body);
        setRoomData(data.data.body);
        setUserCount(data.data.body?.userCount + 1);
        setCreatedAt(data.data.body.creadtedAt);
        setTimeout(() => {}, 1000);
      } catch {
        console.log("뭔가 잘못됨");
      }
    };
    foo();
    // eslint-disable-next-line
  }, [chatRoomId]);
  
  useEffect(() => {
    return () => {
        console.log("cleanup");
      //   console.log(username, roomData?.username)
        const bar = async () => {
          await quitChatroom();
        };
        bar();
      };
      // eslint-disable-next-line
  }, [])
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
                <AddHostFriendButton>
                  <img src="/images/icon_addfriend.svg" alt="add friend"/>
                  <span>친구추가</span>
                </AddHostFriendButton>
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
              <img src="/images/icon_clock_grey_02.svg" alt="clock"/>
              <span>{time || "00:00:00"}</span>
              <Separator />
              <img src="/images/icon_people_grey_02.svg" alt="people"/>
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
                selectedDevices={state?.selectedDevices ? state.selectedDevices : null}
                playvideo={playvideo}
                playaudio={playaudio}
              />
            )}
          </div>
          <div className="videoButtonWrap">
            <VideoButton play={playvideo} onClick={() => setPlayvideo(!playvideo)}>
              <img src={`/images/icon_video_${playvideo ? "available" : "disabled"}.svg`} alt="video"/>
            </VideoButton>
            <VideoButton play={playaudio} onClick={() => setPlayaudio(!playaudio)}>
              <img src={`/images/icon_audio_${playaudio ? "available" : "disabled"}.svg`} alt="audio"/>
            </VideoButton>
          </div>
        </VideoContainer>
      </div>
      <div className="live_right_box">
        <ChatHeader>
          <div>
            <img src="/images/icon_chat.svg" alt="chat"/>
            <span>채팅</span>
          </div>
          <button
            onClick={async (e) => {
              e.preventDefault();
              if (window.confirm("채팅방을 나가시겠습니까?")) {
                await quitChatroom();
                // console.log("나가기버튼. 내용 : ", chatRef.current.value);
                naviagte("/rooms");
              }
            }}
          >
            <img src="/images/icon_out.svg" alt="out"/>
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
                  sendMessage(chatRef.current.value);
                  // console.log("보내기버튼. 내용 : ", chatRef.current.value);
                }}
              >
                <img src="/images/icon_send.svg" alt="send airplane"/>
              </button>
            </div>
          </form>
        </ChatInputWrapper>
      </div>
    </LiveWrapper>
  );
};

export default Chat;
