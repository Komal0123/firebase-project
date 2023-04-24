
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCFEWQGlmcYT_e-ZyHqJEnstcEnQxm_Jq4",
  authDomain: "ragistration-form.firebaseapp.com",
  projectId: "ragistration-form",
  storageBucket: "ragistration-form.appspot.com",
  messagingSenderId: "91450631695",
  appId: "1:91450631695:web:766ce9be9d3d67646e657a",
  measurementId: "G-12WKR9HVDE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth();
export {app,auth};
