import * as firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyCVJALwSbl8NqqyVvbgqBOTnRjmbC53VOY",
    authDomain: "bondo-59973.firebaseapp.com",
    databaseURL: "https://bondo-59973.firebaseio.com",
    projectId: "bondo-59973",
    storageBucket: "bondo-59973.appspot.com",
    messagingSenderId: "752133627909",
    appId: "1:752133627909:web:83793f42540d961654bc6c",
    measurementId: "G-TVSLMVLHLV"
};

// Initialize Firebase
var fir = firebase.initializeApp(firebaseConfig);

export default fir.firestore();