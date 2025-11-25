// js/firebase-init.js
// ملف مركزي لتهيئة Firebase وتصدير الخدمات
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.24.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.24.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.24.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.24.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCRF9r5ifsQWvKY-ZjavAjYeRRlk_k3Wlw",
  authDomain: "darkstore-f5094.firebaseapp.com",
  projectId: "darkstore-f5094",
  storageBucket: "darkstore-f5094.firebasestorage.app",
  messagingSenderId: "807275898214",
  appId: "1:807275898214:web:d3547b1d38028adece54a7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };