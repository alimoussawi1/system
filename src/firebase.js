// Import the functions you need from the Firebase SDK
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"; // ✅ Add this line

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBZVUqrowNWthSL6dqEY-Kl0yPBCoofn30",
    authDomain: "students-with-benefits.firebaseapp.com",
    projectId: "students-with-benefits",
    storageBucket: "students-with-benefits.appspot.com",
    messagingSenderId: "517690962656",
    appId: "1:517690962656:web:ac2f3b955157b8460bd685",
    measurementId: "G-6ZL566BQRW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Optional: Analytics
const analytics = getAnalytics(app);

// ✅ Initialize services
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app); // ✅ Add this line

// Export services you want to use elsewhere
export { app, analytics, db, storage, auth }; // ✅ Export auth
