import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {

  apiKey: "AIzaSyAdBrJnpZ_kixNaZeotxRIjLKTTfAM31m0",

  authDomain: "tarefas-e9e7a.firebaseapp.com",

  projectId: "tarefas-e9e7a",

  storageBucket: "tarefas-e9e7a.appspot.com",

  messagingSenderId: "793737362194",

  appId: "1:793737362194:web:8d2d95ad17983ba99891cb"

};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
