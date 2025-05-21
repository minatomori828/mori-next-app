import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ← Firestore を追加！

const firebaseConfig = {
    apiKey: "AIzaSyCO3DxgUJrLgY6t5feeB7RmisCfvph4NWA",
    authDomain: "mori-next-app.firebaseapp.com",
    projectId: "mori-next-app",
    storageBucket: "mori-next-app.firebasestorage.app",
    messagingSenderId: "314283561438",
    appId: "1:314283561438:web:ee07081181eb1bc6988d4f"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app); // ← 追加！

export { auth, db }; // ← db も export
