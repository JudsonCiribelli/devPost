import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCDVR9sjg252rlESvvKQ2McgfTFn4mOOOk",
  authDomain: "devpost-690b7.firebaseapp.com",
  projectId: "devpost-690b7",
  storageBucket: "devpost-690b7.firebasestorage.app",
  messagingSenderId: "111178068250",
  appId: "1:111178068250:web:b5d7c413cfacc59eb3fca3",
  measurementId: "G-DV2ZQDBF8P",
};

const app = initializeApp(firebaseConfig);
export { app };
