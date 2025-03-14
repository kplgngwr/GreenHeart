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

// Create Firebase context
const FirebaseContext = createContext(null);

// Your Firebase configuration here
const firebaseConfig = {
  apiKey: "AIzaSyCugLu_wwUY0UeczWWCvagz3DvPhgo4sro",
  authDomain: "greenheart-2025.firebaseapp.com",
  databaseURL: "https://greenheart-2025-default-rtdb.firebaseio.com",
  projectId: "greenheart-2025",
  storageBucket: "greenheart-2025.firebasestorage.app",
  messagingSenderId: "767206203790",
  appId: "1:767206203790:web:795fadf6feb50b247f04df",
};

// Custom hook for using Firebase context
export const useFirebase = () => useContext(FirebaseContext);

// Initialize Firebase app and services
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

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
          
          if (userProfileSnap.exists()) {
            const profileData = userProfileSnap.data();
            setUserDetails({
              ...profileData,
              uid: authUser.uid,
              email: authUser.email
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
    console.log(userDetails)
    return userDetails;
  };

  // Enhanced Sign-Up with Email & Password: accepts additional fields 'name' and 'role'
  const signUpWithEmailAndPassword = async (email, password, name, role = "Consumer") => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      setUser(result.user);

      // Create a new profile document in Firestore using the user's UID
      await setDoc(doc(firestore, "Profiles", result.user.uid), {
        name: name,
        role: role,
        email: result.user.email,
        createdAt: new Date(),
      });

      // Update local user details
      setUserDetails({
        name,
        role,
        email: result.user.email,
        uid: result.user.uid
      });

      // Navigate to a welcome page or dashboard after successful sign-up
      navigate("/dashboard");
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
      console.log(result)
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
        userDetails
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
