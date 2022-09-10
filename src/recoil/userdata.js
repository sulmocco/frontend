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

export const SignInSelector = selector({
    key: 'signin',
    get: ({get}) => {
        const username = get(userdataState).username
        return "signed in as" + username
    },
    set: ({set}, newValue) => {
        localStorage.setItem('username', newValue.username)
        localStorage.setItem('id', newValue.id)
        localStorage.setItem('accessToken', newValue.accessToken)
        localStorage.setItem('refreshToken', newValue.refreshToken)
        localStorage.setItem('token', newValue.accessToken)
        set(userdataState, {...newValue, isLogin: true})
    }
})

export const MaintainUser = selector({
    key: 'maintainuser',
    get: ({get}) => "updated userdata",
    set: ({set}, newValue) => {
        localStorage.setItem('id', newValue.id)
        set(userdataState, {...userdataState, ...newValue, isLogin: true})
    }
})

export const SignOutSelector = selector({
    key: 'signout',
    get: ({get}) => {
        return "signed out"
    },
    set: ({set}, newValue) => {
        localStorage.removeItem('username')
        localStorage.removeItem('id')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('token')
        set(userdataState, new DefaultValue)
    }
})

export default userdataState