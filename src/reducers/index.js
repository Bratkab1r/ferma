const initialState = {
    curUser: {},
    isAuth: false
}

const MainReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_FETCHED':
            return {
                ...state,
                loadingStatus: 'idle',
                curUser: action.payload
            }

        case 'SET_AUTH':
            return {
                ...state,
                loadingStatus: 'idle',
                isAuth: action.payload
            }
        default: return state
    }
}

export default MainReducer;