import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// Import Realtime Database functions
import { getDatabase, ref as dbRef, child, get } from "firebase/database";

// Create Firebase context
const FirebaseContext = createContext(null);

// Your Firebase configuration here
const firebaseConfig = {
  apiKey: "AIzaSyCDUhgidOJeiyDh9eYlq3ZbFYI9gAGrasU",
  authDomain: "greenheart-2025.firebaseapp.com",
  databaseURL: "https://greenheart-2025-default-rtdb.firebaseio.com",
  projectId: "greenheart-2025",
  storageBucket: "greenheart-2025.firebasestorage.app",
  messagingSenderId: "767206203790",
  appId: "1:767206203790:web:ea664286cd91534b7f04df"
};

// Custom hook for using Firebase context
export const useFirebase = () => useContext(FirebaseContext);

// Initialize Firebase app and services
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();
// Initialize Realtime Database
const database = getDatabase(app);

/**
 * Function to fetch all land data from Realtime Database under the "devices" path.
 */
export async function getAllLandData() {
  const dbReference = dbRef(database);
  const snapshot = await get(child(dbReference, "devices"));
  if (snapshot.exists()) {
    // console.log(snapshot.val())
    return snapshot.val();
  } else {
    console.log("No data available");
    return {};
  }
}
getAllLandData()

/**
 * Function to fetch all documents from the "Profiles" collection in Firestore.
 */
export async function getAllProfilesData() {
  try {
    const profilesSnapshot = await getDocs(collection(firestore, "Profiles"));
    const profilesData = profilesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    // console.log(profilesData)
    return profilesData;
  } catch (error) {
    console.error("Error fetching profiles data:", error);
    return [];
  }
}
getAllProfilesData()

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async (authUser) => {
      if (authUser) {
        try {
          const userProfileRef = doc(firestore, "Profiles", authUser.uid);
          const userProfileSnap = await getDoc(userProfileRef);
          console.log(userProfileSnap.data())
          if (userProfileSnap.exists()) {
            const profileData = userProfileSnap.data();
            setUserDetails({
              ...profileData,
              uid: authUser.uid,
              email: authUser.email,
            });
          } else {
            setUserDetails(null);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setUserDetails(null);
        }
      } else {
        setUserDetails(null);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser ? authUser : null);
      fetchUserProfile(authUser);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const isLoggedIn = Boolean(user);

  // Get user details
  const getUserDetails = async () => {
    console.log(userDetails);
    return userDetails;
  };

  // Enhanced Sign-Up with Email & Password: accepts additional fields 'name', 'role', and 'deviceId'
  const signUpWithEmailAndPassword = async (
    email,
    password,
    name,
    gender, // added gender parameter
    role = "Consumer",
    deviceId,
    farmSize,
    location,
  ) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      // Create a new profile document in Firestore using the user's UID
      await setDoc(doc(firestore, "Profiles", result.user.uid), {
        name: name,
        gender: gender, // include gender
        role: role,
        email: result.user.email,
        createdAt: new Date(),
        deviceId: deviceId,
        ...(role === "Farmer" && { farmSize, location }), // Include these only for farmers
      });

      // Optionally update local user details if needed (or clear them)
      setUserDetails({
        name,
        gender, // include gender
        role,
        email: result.user.email,
        uid: result.user.uid,
        deviceId: deviceId,
        ...(role === "Farmer" && { farmSize, location }),
      });

      // Sign out immediately so the user isn't kept signed in
      await firebaseSignOut(auth);

      // Navigate to the sign-in page
      navigate("/signin");
      return result.user;
    } catch (error) {
      console.error("Error signing up with email and password:", error);
      throw error;
    }
  };


  // Sign In with Email & Password
  const signInWithEmailAndPasswordFn = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log(result);
      setUser(result.user);
      // Navigate to dashboard or home page after successful sign-in
      navigate("/dashboard");
      return result.user;
    } catch (error) {
      console.error("Error signing in with email and password:", error);
      throw error;
    }
  };

  const signOutUser = () => {
    firebaseSignOut(auth)
      .then(() => {
        setUser(null);
        setUserDetails(null);
        // Use navigate to redirect after sign-out
        navigate("/signin");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  const signinWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      // Check user profile and navigate accordingly
      const userProfileRef = doc(firestore, "Profiles", user.uid);
      const userProfileSnap = await getDoc(userProfileRef);
      if (userProfileSnap.exists()) {
        navigate("/HSearch");
      } else {
        navigate("/Cprofile");
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        isLoggedIn,
        signOut: signOutUser,
        signinWithGoogle,
        signUpWithEmailAndPassword,
        signInWithEmailAndPassword: signInWithEmailAndPasswordFn,
        getUserDetails,
        user,
        userDetails,
        getAllLandData,     // Function to get data from Realtime Database (devices)
        getAllProfilesData, // Function to get all profiles data from Firestore
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
