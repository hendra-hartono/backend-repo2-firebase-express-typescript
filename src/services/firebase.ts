const admin = require("firebase-admin");
const firebase = require("firebase/app");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} = require("firebase/auth");
const { serviceAccount, firebaseConfig } = require("../config/firebaseConfig");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
firebase.initializeApp(firebaseConfig);

const db = admin.firestore();
const auth = admin.auth();

module.exports = {
  db,
  auth,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
};
