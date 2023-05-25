import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  // apiKey: "AIzaSyAnZbbqbdp4PKBzftmnLp_Wrgn_g0n1olY",
  // authDomain: "login-otp-e5763.firebaseapp.com",
  // projectId: "login-otp-e5763",
  // storageBucket: "login-otp-e5763.appspot.com",
  // messagingSenderId: "715920259477",
  // appId: "1:715920259477:web:9e31114f83b1c2e4699e9c",

  apiKey: "AIzaSyAhU5Pr1oUyfrRUu3D2hX3saGLVsbr50Mo",
  authDomain: "otp-login-9bb36.firebaseapp.com",
  projectId: "otp-login-9bb36",
  storageBucket: "otp-login-9bb36.appspot.com",
  messagingSenderId: "523427360041",
  appId: "1:523427360041:web:34096ab79e7bb1d9c85b38"

  // apiKey: "AIzaSyDTnlGKStrG4caMgh9Kr73d9goQdDON87U",
  // authDomain: "otp-emergency.firebaseapp.com",
  // projectId: "otp-emergency",
  // storageBucket: "otp-emergency.appspot.com",
  // messagingSenderId: "700844055179",
  // appId: "1:700844055179:web:08d88b2331405bcc0d528e",
  // measurementId: "G-67GS8ZBKRF"
};
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
