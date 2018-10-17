import firebase from '../config/firebase.js';


const auth = firebase.auth();
const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);

const provider = new firebase.auth.FacebookAuthProvider();

provider.setCustomParameters({
    'display': 'popup'
});


const faceookLogin = () => {
    return new Promise((resolve, reject) => {
        auth.signInWithPopup(provider).then(function (result) {
            var token = result.credential.accessToken;
            var user = result.user;
            resolve({
                token,
                user
            })
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            reject(`${errorCode}!! ${errorMessage}`)
        });
    })
}

const getUserData = (uid) => {
    return new Promise((reject, resolve) => {
        firestore.collection('users').doc(uid)
            .get().then((snapshot) => {
                resolve(snapshot.data())
            }).catch(err => {
                reject(err)
            })
    })
}


export default { faceookLogin, getUserData }