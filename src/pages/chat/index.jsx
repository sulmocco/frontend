import React, { useRef, useState, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import sulmoggoApi from '../../shared/apis';
import { ChatWrap } from './styles';
import { AlchholTag, Separator, SnackTag, ThemeTag } from "../../styles/CommonStyles";
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

const Chat = () => {
    const [message, setMessage] = useState('');
    const [content, setContent] = useState([]);
    const chat_ref = useRef();
    const { chatRoomId } = useParams();
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const naviagte = useNavigate()

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
                const res = client.subscribe(`/sub/chat/room/${chatRoomId}`, (data) => {
                    // console.log("데이터라도 보여줘: ", data);
                    const newMessage = JSON.parse(data.body);
                    // console.log("--- 메시지 내용 ---");
                    // console.log(data.body);
                    // if(content.length>0){
                    // console.log("콘텐트 길이가 0보다 큼 ");
                    // const newContent = [...content]
                    // newContent.push(newMessage.message)
                    // console.log(newContent);
                    // setContent(newContent);
                    // }else{
                    //     setContent([newMessage.message])
                    //     console.log("콘텐트 길이가 0보다 안큼");
                    //     console.log([newMessage.message]);
                    // }
                    console.log("여기!!!!!!!!!!")
                    setContent((prevContent) => [...prevContent, newMessage])
                }, headers);
                // console.log(res);
            });
        }
        catch (error) {
            console.log('연결실패', error)
        }
    }
    // 소켓연결 해제
    const socketDisConnect = () => {
        try {
            client.disconnect(() => {
                client.unsubscribe('sub-0');
            });
        }
        catch (error) {
            console.log('연결해제 실패', error);
        }
    }

    const quitChatroom = async () => {
        const res = await client.send(`pub/chat/message`, headers, JSON.stringify({
            type: 'QUIT',
            chatRoomId: chatRoomId,
            sender: username,
            message: chat_ref.current.value
        }))
    }

    const enterChatroom = async () => {
        const res = await client.send(`pub/chat/message`, headers, JSON.stringify({
            type: 'ENTER',
            chatRoomId: chatRoomId,
            sender: username,
            message: chat_ref.current.value
        }))
    }

    // 메세지 보내기
    const sendMessage = async () => {
        // try {
        console.log({
            type: 'TALK',
            chatRoomId: chatRoomId,
            sender: username,
            message: chat_ref.current.value
        });
        const res = await client.send(`/pub/chat/message`, headers, JSON.stringify({
            type: 'TALK',
            chatRoomId: chatRoomId,
            sender: username,
            message: chat_ref.current.value
        }))
        // console.log("SEND가 끝남. res : "+ res);
        // if (chat_ref === '') {
        //     return
        // }
        // }
        // catch (error) {
        //     console.log('메세지 보내기 실패', error)
        // }
        // setMessage('');
    }

    // 메세지 받기

    //roomId가 바뀔때마다 다시 연결
    useEffect(() => {
        socketConnect();
        try {
            sulmoggoApi.enterChatRoom(chatRoomId)
            sulmoggoApi.getRoomData(chatRoomId)
        }
        catch {
            console.log("뭔가 잘못됨");
        }
        return (() => {
            quitChatroom()
        })
    }, [])
    return (
        <LiveWrapper>
            <div className="live_left_box">
                <div className="upper">
                    <ProfileWrap>
                        <ProfileCircle />
                        <div>
                            <h1>방제목목목방제목목목방제목목목</h1>
                            <div className="userWrap">
                                <div className="username">dnflxlaghkxlsld_99</div>
                                <AddHostFriendButton>
                                    <img src="/images/icon_addfriend.svg" />
                                    <span>친구추가</span>
                                </AddHostFriendButton>
                            </div>
                        </div>
                    </ProfileWrap>
                    <div className="infoWrap">
                        <div className="tagWrap">
                            <AlchholTag>주종</AlchholTag>
                            <SnackTag>안주</SnackTag>
                            <ThemeTag>테마</ThemeTag>
                        </div>
                        <div className="statWrap">
                            <img src="/images/icon_clock_grey_02.svg" />
                            <span>24h 00:00</span>
                            <Separator />
                            <img src="/images/icon_people_grey_02.svg" />
                            <span>100,000</span>
                        </div>
                    </div>
                </div>
                <VideoContainer>
                    <div className="videoWrap">
                    </div>
                    <div className="videoButtonWrap">
                        <VideoButton>
                            <img src="/images/icon_video_available.svg" />
                        </VideoButton>
                        <VideoButton>
                            <img src="/images/icon_audio_available.svg" />
                        </VideoButton>
                    </div>
                </VideoContainer>
            </div>
            <div className="live_right_box">
                <ChatHeader>
                    <div>
                        <img src="/images/icon_chat.svg" />
                        <span>채팅</span>
                    </div>
                    <button onClick={async (e) => {
                        e.preventDefault();
                        if (window.confirm("채팅방을 나가시겠습니까?")) {
                            await quitChatroom();
                            // console.log("나가기버튼. 내용 : ", chat_ref.current.value);
                            naviagte("/rooms")
                        }
                    }}>
                        <img src="/images/icon_out.svg" />
                    </button>
                </ChatHeader>
                <ChatWrapper>
                    {content.map(data => {
                        return <ChatContent>
                            <span className="chatuser">{data.sender}</span>
                            <span className="chattext">: {data.message}</span>
                        </ChatContent>
                    })}

                </ChatWrapper>
                <ChatInputWrapper>
                    <form action="">
                        <div>
                            <input type="text" placeholder="채팅을 입력해 주세요" ref={chat_ref} />
                            <button onClick={(e) => {
                                e.preventDefault();
                                sendMessage(chat_ref.current.value);
                                // console.log("보내기버튼. 내용 : ", chat_ref.current.value);
                            }}>
                                <img src="/images/icon_send.svg" />
                            </button>
                        </div>
                    </form>
                </ChatInputWrapper>
            </div>
        </LiveWrapper>
    );
};

export default Chat;