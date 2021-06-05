import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase
  .initializeApp({
    apiKey: "AIzaSyDgyXlmrY01MoKQuGyaTlIIjLzKhhAkgNA",
    authDomain: "unichat-b4252.firebaseapp.com",
    projectId: "unichat-b4252",
    storageBucket: "unichat-b4252.appspot.com",
    messagingSenderId: "373867153817",
    appId: "1:373867153817:web:ace6bb36676c594acb2b08",
  })
  .auth();
