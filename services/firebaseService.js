// firebaseSetup.js
const {initializeApp} = require("firebase/app");
const { getFirestore,doc,setDoc } =require('firebase/firestore');
const {getAuth} = require("firebase/auth");
const firebaseConfig = require("../config/firebaseConfig");

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

module.exports.auth = getAuth();
module.exports = firestore;
