import firebase from 'firebase';


var config = {
    apiKey: "AIzaSyAcIDzoLBQNg5wwYePNQAyeF0bh_D3wi5E",
    authDomain: "whatsappchatpage.firebaseapp.com",
    databaseURL: "https://whatsappchatpage.firebaseio.com",
    projectId: "whatsappchatpage",
    storageBucket: "whatsappchatpage.appspot.com",
    messagingSenderId: "988742634052"
  };
  firebase.initializeApp(config);


  export default firebase;