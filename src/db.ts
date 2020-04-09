import * as firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyADvZ02VyPmbfjzgScLW8S5OmAP42cWRrc",
  authDomain: "jochat-3027d.firebaseapp.com",
  databaseURL: "https://jochat-3027d.firebaseio.com",
  projectId: "jochat-3027d",
  storageBucket: "jochat-3027d.appspot.com",
  messagingSenderId: "184606661685",
  appId: "1:184606661685:web:84ea541a1ed2ca23"
});

export const db = firebaseApp.firestore();
