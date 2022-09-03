import { atom, selector } from "recoil";

export const videoinputState = atom({
    key: 'videoinput',
    default: {label: "없음", deviceId: null}
})
export const audioinputState = atom({
    key: 'audioinput',
    default: {label: "없음", deviceId: null}
})
export const audiooutputState = atom({
    key: 'audiooutput',
    default: {label: "없음", deviceId: null}
})
export const playvideoState = atom({
    key: 'playvideo',
    default: true
})
export const playaudioState = atom({
    key: 'playaudio',
    default: true
})

export const mediaDevices = selector({
    key: 'mediaDevices',
    get: ({get}) => {
        const videoinput = get(videoinputState)
        const audioinput = get(audioinputState)
        const audiooutput = get(audiooutputState)
        const playvideo = get(playvideoState)
        const playaudio = get(playaudioState)
        return {videoinput, audioinput, audiooutput, playaudio, playvideo}
    }
})