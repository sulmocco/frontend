import React, { useRef } from 'react';
import { useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import Auth from '../Auth';
import { ChatWrap } from './styles';

const Chat = () => {
    const sock = new SockJS('http://localhost:8080/chat'); // 서버주소 수정하기
    const client = Stomp.over(sock);
    const chat_ref = useRef();
    // const socketConnect = () => {
    //     try {
    //         client.debug = null;
    //         //웹소켓 연결시 stomp에서 자동으로 connect이 되었다는것을 
    //         //console에 보여주는데 그것을 감추기 위한 debug

    //         client.connect(token, () => {
    //             client.subscribe(`서버주소`, (data) => {
    //                 const newMessage = Json.parse(data.body);
    //                 // 데이터 파싱
    //             }, token);
    //         });
    //     }
    //     catch (error) {
    //         console.log(error)
    //     }
    // }

    // const socketDisConnect = () => {
    //     try {
    //         client.debug = null;
    //         client.disconnect(() => {
    //             client.unsubscribe('sub-0');
    //         }, token);
    //     }
    //     catch (error) {
    //         console.log(error);
    //     }
    // }

    // const SendMessage = () => {
    //     client.debug = null;
    //     const data = {
    //         // 데이터 부분 수정하ㄱㅣ
    //         type: 'TALK',
    //         roomId: roomId,
    //         sender: sender,
    //         message: message
    //     }
    //     // 메세지 보내기
    //     client.send(`/pub/chat/${(메세지받을대상)}`, token, JSON.stringify(msg));
    // }

    // useEffect(() => {
    //     client.connect({}, () => {
    //         접속한 유저 정보 받기
    //         console.log('연결 : ' + Auth.user.id); 
    //         client.send("/app/join", {}, JSON.stringify(auth.user.id))
    //     })
    // }, [])

    return (
        <ChatWrap>
            <div className="message-wrap">
                <span>메세지 내용</span>
            </div>
            <form action="">
                <input type="text" placeholder='채팅치시오' ref={chat_ref} />
                <button onClick={(e) => {
                    e.preventDefault();
                    console.log(chat_ref.current.value);
                }}>보내기</button>
            </form>
        </ChatWrap>
    );
};

export default Chat;