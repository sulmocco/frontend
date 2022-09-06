import React from "react";
import {
  AlchholTag,
  FreeTag,
  Separator,
  UserLevel,
} from "../../styles/CommonStyles";
import { CardThumbnail, CardWrapper, ProfileCircle } from "./styles";
import { Link } from "react-router-dom";
import { getLevel } from "../../shared/modules";

const TableCard = (props) => {
  const {
    tableId,
    thumbnail,
    title,
    username,
    likecount,
    viewcount,
    alcoholtag,
    freetag,
    profileimgurl,
    level,
  } = props;
  // console.log(props);
  return (
    <Link to={`/tables/${tableId}`}>
      <CardWrapper>
        <CardThumbnail src={thumbnail} />
        <div className="cardContent">
          <div className="cardUpperWrap">
          <div className="tableTitle">{title}</div>
          <div className="counterWrap">
            <img src="/images/icon_favorite.svg" alt="heart" />
            {likecount || 0}
            <Separator />
            <img src="/images/icon_eye.svg" alt="eye" />
            {viewcount || 0}
          </div>
          <div className="cardProfileWrap">
            <ProfileCircle src={profileimgurl} />
            <div className="cardTitleWrap">
              <div className="tableUser">{username}</div>
              <UserLevel>{getLevel(level || 0)}</UserLevel>
            </div>
          </div>
          </div>
          <div className="tagWrap">
            {alcoholtag && <AlchholTag>{alcoholtag}</AlchholTag>}
            {freetag && <FreeTag>{freetag}</FreeTag>}
          </div>
        </div>
      </CardWrapper>
    </Link>
  );
};

export default TableCard;
