import React from "react";
import { AlchholTag, Separator, SnackTag, ThemeTag } from "../../styles/CommonStyles";
import { CardThumbnail, CardWrapper, ProfileCircle } from "./styles";
import { Link } from "react-router-dom";

const RoomCard = (props) => {
    const {chatRoomId, thumbnail, title, username, time, members, alcoholtag, theme, food, profileimgurl} = props
    // console.log(props);
  return (
    <Link to={`/chat/${chatRoomId}`}>
    <CardWrapper>
      <CardThumbnail src={thumbnail}/>
      <div className="cardUpperWrap">
        <ProfileCircle src={profileimgurl}/>
        <div className="cardTitleWrap">
          <div className="roomTitle">{title}</div>
          <div className="roomUser">{username}</div>
        </div>
      </div>
      <div className="counterWrap">
        <img src="/images/icon_clock_black.svg" alt="clock" />
        {new Date(time).toLocaleTimeString() || 0}
        <Separator />
        <img src="/images/icon_people_black.svg" alt="people" />
        {members || 0}
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
