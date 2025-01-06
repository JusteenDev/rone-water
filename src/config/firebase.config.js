import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDsmAcwMtU5VDkHgPsf-vCb9qssqTQ29K4",
  authDomain: "ronedrinkingwater.firebaseapp.com",
  databaseURL: "https://ronedrinkingwater-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ronedrinkingwater",
  storageBucket: "ronedrinkingwater.firebasestorage.app",
  messagingSenderId: "856792056646",
  appId: "1:856792056646:web:5b6aa6288d2f972b681b47",
  measurementId: "G-D2V10HT3M8"
};

const app = initializeApp(firebaseConfig)

export default app