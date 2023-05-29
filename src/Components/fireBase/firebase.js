import firebase from 'firebase/compat/app' ;
import 'firebase/compat/auth' ;
import 'firebase/compat/storage' ;
import 'firebase/compat/firestore' ;

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API ,
    authDomain: "reels-7303d.firebaseapp.com",
    projectId: "reels-7303d",
    storageBucket: "reels-7303d.appspot.com",
    messagingSenderId: "820028106339",
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};
  

firebase.initializeApp(firebaseConfig) ;
export const auth = firebase.auth();

const firestore = firebase.firestore() ;
export const database = {
    users:firestore.collection('users'),
    posts:firestore.collection('posts'),
    comments:firestore.collection('comments'),
    getTimeStamp:firebase.firestore.FieldValue.serverTimestamp(),
}
export const storage = firebase.storage() ;
