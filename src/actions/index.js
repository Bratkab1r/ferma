export const setAuth = (bool) => {
    return {
        type: 'SET_AUTH',
        payload: bool
    }
}

export const loginUser = (user) => {
    return {
        type: 'USER_FETCHED',
        payload: user
    }
}

export const checkAuth = async () => {
    try {
        const response = await fetch("http://localhost:3001/refresh", {credentials: "include"})
        const json = await response.json()
        localStorage.setItem('token', json.accessToken)
        return json
    } catch (e) {
        console.log(e.response?.data?.message)
    }
}