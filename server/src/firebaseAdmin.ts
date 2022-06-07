import admin from "firebase-admin";
const serviceAccount = require("./serviceAccount.json");

export const BUCKET_URL = "foogle-store.appspot.com";

const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET_URL,
});

export const bucket = admin.storage().bucket();

export default firebaseAdmin;
