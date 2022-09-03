import { atom, DefaultValue, selector } from "recoil";

const userdataState = atom({
    key: 'userdata',
    default: {
        username: 'anonymous',
        id: null,
        accessToken: null,
        refreshToken: null,
        isLogin: false
    }
})

export const userLogin = selector({
    key: 'userLogin',
    get: ({get}) => {
        const username = get(userdataState)
        return "signed in as" + username
    },
    set: ({set}, newValue) => {
        localStorage.setItem('username', newValue.username)
        localStorage.setItem('id', newValue.id)
        localStorage.setItem('accessToken', newValue.accessToken)
        localStorage.setItem('refreshToken', newValue.refreshToken)
        localStorage('token', newValue.accessToken)
        set(userdataState, {...newValue, isLogin: true})
    }
})

export const userLogout = selector({
    key: 'userLogout',
    get: ({get}) => {
        return "signed out"
    },
    set: ({set}, newValue) => {
        localStorage.removeItem('username')
        localStorage.removeItem('id')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('token')
        set(userdataState, DefaultValue)
    }
})

export default userdataState