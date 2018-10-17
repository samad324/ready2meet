const mainReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SAVE_USER':
            return {
                ...state,
                userToken: action.userToken,
                userData: action.userData
            };
        case 'SAVE_PERSONAL_INFO':
            return {
                ...state,
                userPersonalData: action.userPersonalData,
            };
        default:
            return state
    }

}

export default mainReducer;