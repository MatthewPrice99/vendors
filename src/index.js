import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';





  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCpillGGroQtZGHND6_dRM8LJXM0Jbwu1c",
    authDomain: "nitebite-v3.firebaseapp.com",
    databaseURL: "https://nitebite-v3.firebaseio.com",
    projectId: "nitebite-v3",
    storageBucket: "nitebite-v3.appspot.com",
    messagingSenderId: "227115364257"
  };
  firebase.initializeApp(config);


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
