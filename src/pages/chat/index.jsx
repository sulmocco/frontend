import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import sulmoggoApi from '../../shared/apis';
import { ChatWrap } from './styles';

const Chat = () => {
    const [message, setMessage] = useState('');
    const [content, setContent] = useState('');
    const chat_ref = useRef();
    const { roomId } = useParams();
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

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
                const res = client.subscribe(`/sub/chat/room/${roomId}`,headers, (data) => {
                    const newMessage = JSON.parse(data.body);
                    console.log(data.body);
                    setContent(newMessage);
                });
                console.log(res);
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

    // 메세지 보내기
    const sendMessage = async () => {
        // try {
            const res = await client.send(`/pub/chat/message`, JSON.stringify({
                type: 'TALK',
                chatRoomId: roomId,
                sender: username,
                message: chat_ref.current.value
            }))
            console.log("과연"+ res);
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
        sulmoggoApi.enterChatRoom(roomId)
        sulmoggoApi.getRoomData(roomId)
    }, [])
    return (
        <ChatWrap>
            <div className="message-wrap">
                <span>{content}</span>
            </div>
            <form action="">
                <input type="text" placeholder='채팅치시오' ref={chat_ref} />
                <button onClick={(e) => {
                    e.preventDefault();
                    sendMessage(chat_ref.current.value);
                }}>보내기</button>
            </form>
        </ChatWrap>
    );
};

export default Chat;