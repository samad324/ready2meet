const saveUser = (userToken, userData) => {
    return {
        type: "SAVE_USER",
        userToken,
        userData
    }
}
const savePersonalInfo= (userPersonalData) => {
    return {
        type: "SAVE_PERSONAL_INFO",
        userPersonalData
    }
}

export { saveUser, savePersonalInfo }