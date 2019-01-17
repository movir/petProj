import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyCKqAm7WhWWu1USjX2i7cr24jj2Hc6FOns",
    authDomain: "gusto-66144.firebaseapp.com",
    databaseURL: "https://gusto-66144.firebaseio.com",
    projectId: "gusto-66144",
    storageBucket: "gusto-66144.appspot.com",
    messagingSenderId: "600533582589"
};
firebase.initializeApp(config);
window.firebase = firebase; //IgrEd
const db = firebase.firestore();
db.settings({
    timestampsInSnapshots: true,
});

export {db};
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
