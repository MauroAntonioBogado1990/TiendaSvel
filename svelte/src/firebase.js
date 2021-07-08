import firebase from 'firebase/app'
import 'firebase/firestore'
var firebaseConfig = {
    apiKey: "AIzaSyCPDl_Fn4sjafD054IfoVVtn9XxR_1OuKo",
    authDomain: "svelte-tienda.firebaseapp.com",
    projectId: "svelte-tienda",
    storageBucket: "svelte-tienda.appspot.com",
    messagingSenderId: "46177884474",
    appId: "1:46177884474:web:50570da7351f3cf7ae5803"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export const db = firebase.firestore()