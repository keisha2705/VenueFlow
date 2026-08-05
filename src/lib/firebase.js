import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDSvoXkVO0O1Q8UAoB1TtQiw6tr-3coWWg",
  authDomain: "venueflow-41bfb.firebaseapp.com",
  projectId: "venueflow-41bfb",
  storageBucket: "venueflow-41bfb.firebasestorage.app",
  messagingSenderId: "955382978494",
  appId: "1:955382978494:web:46519af86712a647428bef"
};

// Initializing Firebase from frontend to backend
const app = initializeApp(firebaseConfig);

// Init services
export const auth = getAuth(app);
