import React from "react";
import { AlchholTag, FreeTag, Separator } from "../../styles/CommonStyles";
import { CardThumbnail, CardWrapper, ProfileCircle } from "./styles";
import { Link } from "react-router-dom";

const TableCard = (props) => {
    const {tableId, thumbnail, title, username, likecount, viewcount, alcoholtag, freetag, profileimgurl} = props
    console.log(props);
  return (
    <Link to={`/tables/${tableId}`}>
    <CardWrapper>
      <CardThumbnail src={thumbnail}/>
      <div className="cardUpperWrap">
        <ProfileCircle src={profileimgurl}/>
        <div className="cardTitleWrap">
          <div className="tableTitle">{title}</div>
          <div className="tableUser">{username}</div>
        </div>
      </div>
      <div className="counterWrap">
        <img src="/images/icon_favorite.svg" alt="heart" />
        {likecount || 0}
        <Separator />
        <img src="/images/icon_eye.svg" alt="eye" />
        {viewcount || 0}
      </div>
      <div className="tagWrap">
        {alcoholtag && <AlchholTag>{alcoholtag}</AlchholTag>}
        {freetag && <FreeTag>{freetag}</FreeTag>}
      </div>
    </CardWrapper>
    </Link>
  );
};

export default TableCard;
