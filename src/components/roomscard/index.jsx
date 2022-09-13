import React from "react";
import { AlchholTag, Separator, SnackTag, ThemeTag, UserLevel } from "../../styles/CommonStyles";
import { CardThumbnail, CardWrapper, DeleteButton, ProfileCircle } from "./styles";
import { Link } from "react-router-dom";
import { getLevel } from "../../shared/modules";
import sulmoggoApi from "../../shared/apis";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * 요구하는 프랍이 많지만 그냥 들어오는 데이터 그대로 넣으면 됩니다.
 * ex) <RoomCard {...data}/>
 * @name 술약속카드
 * @author imhjnoh <imhjnoh@gmail.com>
 * @param {object} props
 * @param {string} props.chatRoomId
 * @param {string} props.thumbnail
 * @param {string} props.title
 * @param {string} props.username
 * @param {string} props.createdAt
 * @param {string} props.userCount
 * @param {string} props.alcoholtag
 * @param {string} props.theme
 * @param {string} props.food
 * @param {string} props.profileimgurl 
 * @returns 술약속 카드 한 개(스타일과 기능 포함)
 */
const RoomCard = (props) => {
    const {chatRoomId, thumbnail, title, username, createdAt, userCount, alcoholtag, theme, food, profileimgurl, level, myUsername} = props
    // console.log(props);
    const queryClient = useQueryClient()
    const mutation = useMutation(() => sulmoggoApi.removeChatRoom(chatRoomId), {
      onSuccess: (res) => {
        alert("술약속이 취소되었습니다.")
        queryClient.invalidateQueries("rooms");
      },
      onError: (error) => {
        alert("문제가 발생했습니다." + error.response);
      },
    });
  return (
    <Link to={`/chat/${chatRoomId}`}>
    <CardWrapper>
      <CardThumbnail src={thumbnail}/>
      <div className="counterWrap">
        <img src="/images/icon_clock_black.svg" alt="clock" />
        {new Date(createdAt).toLocaleString() || 0}
        <Separator />
        <img src="/images/icon_people_black.svg" alt="people" />
        {userCount || 0}
        {(username === myUsername) && <DeleteButton onClick={(e)=> {
          if(window.confirm("정말로 술약속을 취소할까요?")){
            mutation.mutate();
          }
          e.stopPropagation()
        }}>삭제하기</DeleteButton>}
      </div>
      <div className="roomTitle">{title || "방제목이 없습니다."}</div>

      <div className="cardUpperWrap">
        <ProfileCircle src={profileimgurl}/>
        <div className="cardTitleWrap">
          
          <div className="roomUser">{username || "사용자가 없습니다."}</div>
          <UserLevel>{getLevel(level || 0)}</UserLevel>
        </div>
      </div>
      
      <div className="tagWrap">
        {alcoholtag && <AlchholTag>{alcoholtag}</AlchholTag>}
        {food && <SnackTag>{food}</SnackTag>}
        {theme && <ThemeTag>{theme}</ThemeTag>}
      </div>
    </CardWrapper>
    </Link>
  );
};

export default RoomCard;
