import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHyst5Zu-X_TQicIpfMF8Fr9l9aD_Oy04",
  authDomain: "login-3f7c9.firebaseapp.com",
  projectId: "login-3f7c9",
  storageBucket: "login-3f7c9.firebasestorage.app",
  messagingSenderId: "656631770893",
  appId: "1:656631770893:web:769d33b5453bdbc3b24a44",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App);

app.use(router);

app.mount("#app");
