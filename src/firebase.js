// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCugLu_wwUY0UeczWWCvagz3DvPhgo4sro",
  authDomain: "greenheart-2025.firebaseapp.com",
  databaseURL: "https://greenheart-2025-default-rtdb.firebaseio.com",
  projectId: "greenheart-2025",
  storageBucket: "greenheart-2025.firebasestorage.app",
  messagingSenderId: "767206203790",
  appId: "1:767206203790:web:795fadf6feb50b247f04df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function to get all land data
export async function getAllLandData() {
  const dbRef = ref(database);
  const snapshot = await get(child(dbRef, 'devices'));
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    console.log("No data available");
    return {};
  }
}