import firebase from "firebase"
const firebaseConfig = {
    apiKey: "AIzaSyB8JCQz4BK3FqMb5maaP2FJRMq5_0d96xQ",
    authDomain: "react-jobsearchapp.firebaseapp.com",
    databaseURL: "https://react-jobsearchapp.firebaseio.com",
    projectId: "react-jobsearchapp",
    storageBucket: "react-jobsearchapp.appspot.com",
    messagingSenderId: "854573985215",
    appId: "1:854573985215:web:b2e9daa21aec2f323fc50a",
    measurementId: "G-HS90SSREKB"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebase