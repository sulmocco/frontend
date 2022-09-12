import React, { useEffect, useState } from "react"
import { AlcoholLevel, ButtonWrapper, FriendAddButton, FriendCancelButton, ModalContainer, ModalWrapper, ProfileCircle } from "./styles"
import { getLevel } from "../../shared/modules"
import sulmoggoApi from "../../shared/apis"

const AddFriendModal = ({username, onClose}) => {
    const [userdata, setUserdata] = useState({
        username,
        profile: "",
        level: 0,
        isfriend: false   
    })
    const addFriend = async() => {
        await sulmoggoApi.addFriend(username).then(() => {
            alert(username+"님을 친구로 추가했습니다!")
        }).catch((e) => {
            alert("문제가 발생했습니다.")
        })
        onClose()
    }
    useEffect(() => {
        const foo = async () => {
            await sulmoggoApi.getSelectedUser(username).then(res => {
                setUserdata(res.data)
            })
        }
        foo()
    }, [username])
    
    return (
        <ModalWrapper onClick={e =>{
            if(e.target === e.currentTarget){
                e.stopPropagation()
            }else{
                onClose()
            }
        }}>
            <ModalContainer>
                {userdata.isfriend ? <h1>{username}님과 친구입니다!</h1> : <h1>{username}님을 친구추가 하시겠습니까?</h1>}
                <div className="friendProfileWrapper">
                    <ProfileCircle src={userdata.profile}/>
                    <AlcoholLevel>{getLevel(userdata.level)}</AlcoholLevel>
                    <p className="friendUsername">{username}</p>
                </div>
                {userdata.isfriend ? 
                <ButtonWrapper>
                    <FriendCancelButton onClick={onClose}>닫기</FriendCancelButton>
                </ButtonWrapper>
                : 
                <ButtonWrapper>
                    <FriendCancelButton onClick={onClose}>취소하기</FriendCancelButton>
                    <FriendAddButton onClick={addFriend}>추가하기</FriendAddButton>
                </ButtonWrapper>}
            </ModalContainer>
        </ModalWrapper>
    )
}

export default AddFriendModal