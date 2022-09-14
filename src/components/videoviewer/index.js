import axios from "axios";
import { OpenVidu } from "openvidu-browser";
import React, { useEffect, useRef, useState, memo } from "react";
import { useRecoilValue } from "recoil";
import { audioinputState, playaudioState, playvideoState, videoinputState } from "../../recoil/mediaDevices";
import UserVideoComponent from "./UserVideoComponent";

const OPENVIDU_SERVER_URL = process.env.REACT_APP_OPENVIDU_SERVER_URL;
const OPENVIDU_SERVER_SECRET = process.env.REACT_APP_OPENVIDU_SERVER_SECRET;

const VideoViewer = (props) => {
  const [mySessionId, setMySessionId] = useState(props.chatRoomId)
  const [myUserName, setMyUserName] = useState(props.username)
  const [session, setSession] = useState(undefined)
  const [mainStreamManager, setMainStreamManager] = useState(undefined)
  const [publisher, setPublisher] = useState(undefined)
  const [subscribers, setSubscribers] = useState([])
  const OVRef = useRef(null)
  const sessionRef = useRef(null)

  const videoinput = useRecoilValue(videoinputState)
  const audioinput = useRecoilValue(audioinputState)
  const playvideo = useRecoilValue(playvideoState)
  const playaudio = useRecoilValue(playaudioState)

  /**
   * --------------------------
   * SERVER-SIDE RESPONSIBILITY
   * --------------------------
   * These methods retrieve the mandatory user token from OpenVidu Server.
   * This behavior MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
   * the API REST, openvidu-java-client or openvidu-node-client):
   *   1) Initialize a Session in OpenVidu Server	(POST /openvidu/api/sessions)
   *   2) Create a Connection in OpenVidu Server (POST /openvidu/api/sessions/<SESSION_ID>/connection)
   *   3) The Connection.token must be consumed in Session.connect() method
   */

   const getToken = async () => {
    return await createSession(mySessionId).then((sessionId) =>
      createToken(sessionId)
    );
  }

  const createSession = (sessionId) => {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions", data, {
          headers: {
            Authorization:
              "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          // console.log("CREATE SESION", response);
          resolve(response.data.id);
        })
        .catch((response) => {
          var error = Object.assign({}, response);
          if (error?.response?.status === 409) {
            resolve(sessionId);
          } else {
            // console.log(error);
            console.warn(
              "No connection to OpenVidu Server. This may be a certificate error at " +
                OPENVIDU_SERVER_URL
            );
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  OPENVIDU_SERVER_URL +
                  '"\n\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  OPENVIDU_SERVER_URL +
                  '"'
              )
            ) {
              window.location.assign(
                OPENVIDU_SERVER_URL + "/accept-certificate"
              );
            }
          }
        });
    });
  }

  const createToken = (sessionId) => {
    return new Promise((resolve, reject) => {
      var data = {};
      axios
        .post(
          OPENVIDU_SERVER_URL +
            "/openvidu/api/sessions/" +
            sessionId +
            "/connection",
          data,
          {
            headers: {
              Authorization:
                "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          // console.log("TOKEN", response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  }

  const leaveSession = () => {
    sessionRef.current.disconnect()
    // Empty all properties...
    OVRef.current = null;
    setSession(undefined)
    sessionRef.current = null
    setSubscribers([])
    setMySessionId(props.chatRoomId)
    setMyUserName(props.username)
    setMainStreamManager(undefined)
    setPublisher(undefined)
  }

  useEffect(() => {
    window.addEventListener("beforeunload", leaveSession);
    window.addEventListener("unload", leaveSession);
    if (session === undefined) {
      joinSession();
    }
    return () => {
      window.removeEventListener("beforeunload", leaveSession);
      window.removeEventListener("unload", leaveSession);
      sessionRef.current.disconnect()
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    updatePublishState()
    // eslint-disable-next-line
  }, [playaudio, playvideo, videoinput, audioinput])

  const handleMainVideoStream = (stream) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream)
    }
  }

  const deleteSubscriber = (streamManager) => {
    let newSubscribers = subscribers;
    let index = newSubscribers.indexOf(streamManager, 0);
    if (index > -1) {
      newSubscribers.splice(index, 1);
      setSubscribers(newSubscribers)
    }
  }

  const joinSession = () => {
    // --- 1) Get an OpenVidu object ---

    OVRef.current = new OpenVidu();
    OVRef.current.enableProdMode()

    // --- 2) Init a session ---

    const newSession = OVRef.current.initSession()
    setSession(
      newSession
    );
    sessionRef.current = newSession
  }

  useEffect(() => {
    if(sessionRef.current){
    var mySession = sessionRef.current;
    // --- 3) Specify the actions when events take place in the session ---

        // On every new Stream received...
        mySession.on("streamCreated", (event) => {
          // Subscribe to the Stream to receive it. Second parameter is undefined
          // so OpenVidu doesn't create an HTML video by its own
          var subscriber = mySession.subscribe(event.stream, undefined);
          if(!(getNicknameTag(subscriber) in subscribers.map(x => getNicknameTag(x)))){
          var newSubscribers = subscribers;
          newSubscribers.push(subscriber);

          // Update the state with the new subscribers
          setSubscribers(newSubscribers)}
        });

        // On every Stream destroyed...
        mySession.on("streamDestroyed", (event) => {
          // Remove the stream from 'subscribers' array
          deleteSubscriber(event.stream.streamManager);
        });

        // On every asynchronous exception...
        mySession.on("exception", (exception) => {
          console.warn(exception);
        });

        // --- 4) Connect to the session with a valid user token ---

        // 'getToken' method is simulating what your server-side should do.
        // 'token' parameter should be retrieved and returned by your own backend
        getToken().then((token) => {
          // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
          // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
          mySession
            .connect(token, { clientData: myUserName })
            .then(async () => {
              if(!mainStreamManager){
              var devices = await OVRef.current.getDevices();
              var videoDevices = devices.filter(
                (device) => device.kind === "videoinput"
              );
              var audioDevices = devices.filter(
                (device) => device.kind === "audioinput"
              );
              // console.log(videoDevices);

              // --- 5) Get your own camera stream ---
              // console.log(props.selectedDevices);
              let camera =
                videoinput.deviceId ||
                videoDevices[0].deviceId;
              let microphone =
                audioinput.deviceId ||
                audioDevices[0].deviceId;
              // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
              // element: we will manage it on our own) and with the desired properties
              let newPublisher = OVRef.current.initPublisher(undefined, {
                audioSource: microphone, // The source of audio. If undefined default microphone
                videoSource: camera, // The source of video. If undefined default webcam
                publishAudio: playaudio || true, // Whether you want to start publishing with your audio unmuted or not
                publishVideo: playvideo || true, // Whether you want to start publishing with your video enabled or not
                resolution: "400x272", // The resolution of your video
                frameRate: 30, // The frame rate of your video
                insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
                mirror: false, // Whether to mirror your local video or not
              });
              // console.log("🛑------newPublisher!!!------🛑");
              // console.log(newPublisher);
              // --- 6) Publish your stream ---
              const version = props.version;
              if (
                String(version).startsWith("friend") ||
                (String(version).startsWith("host") &&
                  props.username === props.host)
              ) {
                mySession.publish(newPublisher);
              }
              // Set the main video in the page to display our webcam and store our Publisher
              setMainStreamManager(newPublisher)
              setPublisher(newPublisher)}
            })
            .catch((error) => {
              // console.log(
              //   "There was an error connecting to the session:",
              //   error.code,
              //   error.message
              // );
            });
        }
        );}
        // eslint-disable-next-line
  }, [])



  const updatePublishState = async() => {
    try {
      if (publisher) {
        var properties = {
          ...publisher.properties,
          publishAudio: playaudio,
          publishVideo: playvideo,
          videoSource: videoinput.deviceId,
          audioSource: audioinput.deviceId
        };
        // console.log(properties);
        var newPublisher = OVRef.current.initPublisher(undefined, properties);
        await sessionRef.current.unpublish(mainStreamManager);
        await sessionRef.current.publish(newPublisher).then((res) => {
          // console.log(res);
        });

        setMainStreamManager(newPublisher)
        setPublisher(newPublisher)
      }
    } catch (e) {
      console.error(e);
    }
  }

  const getNicknameTag = (sub) => {
    // Gets the nickName of the user
    console.log("✅-----GETNICKNAMETAG-----✅", sub.stream);
    // console.log(sub);
    return JSON.parse(sub.stream.connection.data || "").clientData;
  }

    return (
      <div className="container">
        {session !== undefined ? (
          <div id="session">
            <div id="video-container">
              {/* 친구 모드이거나 호스트 모드이고, 자신이 호스트일 때 자신의 화면을 스트리밍 */}
              {publisher !== undefined &&
              (String(props.version).startsWith("friend") ||
                (String(props.version).startsWith("host") &&
                  props.username === props.host)) ? (
                <div
                  className="stream-container"
                  onClick={() =>
                    handleMainVideoStream(publisher)
                  }
                >
                  <UserVideoComponent streamManager={publisher} hostname={props.host}/>
                </div>
              ) : null}
              {/* 호스트 모드이고, 자신이 호스트가 아닐 때 호스트의 화면 스트리밍 */}
              {String(props.version).startsWith("host") &&
              props.username !== props.host ? (
                <div
                  className="stream-container"
                  onClick={() =>
                    handleMainVideoStream(
                      subscribers.filter(
                        (x) =>
                          JSON.parse(x.streamManager?.stream?.connection?.data)
                            ?.clientData === props.host
                      )
                    )
                  }
                >
                  <UserVideoComponent
                    streamManager={
                      subscribers.filter((x) => {
                        // console.log(getNicknameTag(x));
                        return true;
                      })[0]
                    }
                  />
                </div>
              ) : null}
              {/* 친구 모드일 때 자신 이외의 화면 */}
              {String(props.version).startsWith("friend") &&
                subscribers.map((sub, i) => {
                  if(getNicknameTag(sub) !== props.username){
                    return(
                  <div
                    key={i}
                    className="stream-container"
                    onClick={() => handleMainVideoStream(sub)}
                  >
                    <UserVideoComponent
                      streamManager={sub}
                      openModal={props.openModal}
                      hostname={props.host}
                    />
                  </div>)
                }
                else return null
              })}
            </div>
          </div>
        ) : null}
      </div>
    );

  
}

export default memo(VideoViewer);
