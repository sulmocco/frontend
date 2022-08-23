import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { ChatWrap } from './styles';

const Chat = () => {
    const [message, setMessage] = useState('');
    const [content, setContent] = useState('');
    const chat_ref = useRef();
    const { roomId } = useParams();
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    // const sock = new SockJS(`${process.env.REACT_APP_API_SERVER}/chat`); // 서버주소 수정하기
    const sock = new SockJS('http://13.209.8.162/ws-stomp'); // 서버주소 수정하기
    const client = Stomp.over(sock);

    const headers = { Authorization: token };

    // 웹소켓 연결시 stomp에서 자동으로 connect이 되었다는것을 console에 보여주는데 그것을 감추기 위한 debug
    client.debug = null;

    // 소켓연결
    const socketConnect = () => {
        try {
            client.connect(headers, () => {
                client.subscribe(`/sub/chat/room/${roomId}`, (data) => {
                    const newMessage = JSON.parse(data.body);
                    setContent(newMessage);
                });
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
    const sendMessage = () => {
        try {
            client.send(`/pub/chat`, JSON.stringify({
                type: 'TALK',
                // roomId: roomId,
                sender: username,
                message: chat_ref.current.value
            }));
            // if (chat_ref === '') {
            //     return
            // }
        }
        catch (error) {
            console.log('메세지 보내기 실패', error)
        }
        setMessage('');
    }

    // 메세지 받기

    //roomId가 바뀔때마다 다시 연결
    useEffect(() => {
        socketConnect();
    }, [roomId])
    return (
        <ChatWrap>
            <div className="message-wrap">
                <span>{content}</span>
            </div>
            <form action="">
                <input type="text" placeholder='채팅치시오' ref={chat_ref} />
                <button onClick={(e) => {
                    e.preventDefault();
                    console.log(chat_ref.current.value);
                    sendMessage(chat_ref.current.value);
                }}>보내기</button>
            </form>
        </ChatWrap>
    );
};

export default Chat;