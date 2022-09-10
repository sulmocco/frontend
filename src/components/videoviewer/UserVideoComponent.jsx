import React, { Component } from 'react';
import OpenViduVideoComponent from './OvVideo';
// import './UserVideo.css';

export default class UserVideoComponent extends Component {

    getNicknameTag() {
        // Gets the nickName of the user
        return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
    }
    isHost() {
        return this.getNicknameTag() === localStorage.getItem("username")
    }
    componentDidMount(){
        // console.log(this.props.openModal);
    }
    render() {
        return (
            <div style={{width: "100%", height: "100%"}}>
                {this.props.streamManager !== undefined ? (
                    <div className="streamcomponent">
                        <OpenViduVideoComponent streamManager={this.props.streamManager} />
                        <div className='videousername' onClick={() => this.props.openModal(this.getNicknameTag())}>
                            <p>{this.getNicknameTag()}</p>
                            {!this.isHost() && <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.33333 4.5C6.11942 4.5 5.16667 5.44439 5.16667 6.57143C5.16667 7.69846 6.11942 8.64286 7.33333 8.64286C8.54725 8.64286 9.5 7.69846 9.5 6.57143C9.5 5.44439 8.54725 4.5 7.33333 4.5ZM4.16667 6.57143C4.16667 4.85814 5.60173 3.5 7.33333 3.5C9.06494 3.5 10.5 4.85814 10.5 6.57143C10.5 8.28472 9.06494 9.64286 7.33333 9.64286C5.60173 9.64286 4.16667 8.28472 4.16667 6.57143ZM15.3333 6.07143C15.6095 6.07143 15.8333 6.29529 15.8333 6.57143V8.64286H18C18.2761 8.64286 18.5 8.86671 18.5 9.14286C18.5 9.419 18.2761 9.64286 18 9.64286H15.8333V11.7143C15.8333 11.9904 15.6095 12.2143 15.3333 12.2143C15.0572 12.2143 14.8333 11.9904 14.8333 11.7143V9.64286H12.6667C12.3905 9.64286 12.1667 9.419 12.1667 9.14286C12.1667 8.86671 12.3905 8.64286 12.6667 8.64286H14.8333V6.57143C14.8333 6.29529 15.0572 6.07143 15.3333 6.07143ZM1.5 14.9286C1.5 12.801 3.51242 11.2143 5.80952 11.2143H8.85714C11.1542 11.2143 13.1667 12.801 13.1667 14.9286V16C13.1667 16.2761 12.9428 16.5 12.6667 16.5C12.3905 16.5 12.1667 16.2761 12.1667 16V14.9286C12.1667 13.5058 10.7679 12.2143 8.85714 12.2143H5.80952C3.89874 12.2143 2.5 13.5058 2.5 14.9286V16C2.5 16.2761 2.27614 16.5 2 16.5C1.72386 16.5 1.5 16.2761 1.5 16V14.9286Z" fill="white"/>
                            </svg>}
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }
}
