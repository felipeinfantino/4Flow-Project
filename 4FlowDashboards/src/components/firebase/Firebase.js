import * as firebaseApp from 'firebase/app';

require('firebase/auth');
require('firebase/database');
require("firebase/firestore");
const firebaseConfig = {
    apiKey: "AIzaSyBcdL_1pVMBFcJgaiiuQCIM8YfjbUADjeg",
    authDomain: "flowdashboard-6c548.firebaseapp.com",
    databaseURL: "https://flowdashboard-6c548.firebaseio.com",
    projectId: "flowdashboard-6c548",
    storageBucket: "flowdashboard-6c548.appspot.com",
    messagingSenderId: "585682988528",
    appId: "1:585682988528:web:3ef7bf657ce42f305ec135",
    measurementId: "G-X4WY4T8R28"
};

const firebase = firebaseApp.initializeApp(firebaseConfig);

export default firebase;