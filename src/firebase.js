import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAVbv0zp2J1swbu-qmtt81pMVYYlTwQX8U",
    authDomain: "react-ts-firebase-blog-app.firebaseapp.com",
    databaseURL: "https://react-ts-firebase-blog-app.firebaseio.com",
    projectId: "react-ts-firebase-blog-app",
    storageBucket: "react-ts-firebase-blog-app.appspot.com",
    messagingSenderId: "199751343263",
    appId: "1:199751343263:web:db7a3468f7c90a54dc96aa"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export default firebase;
