import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, updateProfile, updatePassword,sendEmailVerification,signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import toast from "react-hot-toast";
import store from "./store";
import { login as loginHandle, logout as logoutHandle } from "./store/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const register = (email, password) => {
  try {
    const { user } = createUserWithEmailAndPassword(auth, email, password);
    return user;
  }
  catch (error) {
    toast.error(error);
  }
};

export const login = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password)
    return user;
  } catch (error) {
    toast.error(error.message);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    return true
  } catch (error) {
    toast.error(error.message);
  }
};

export const update = async data => {
  try {
    const user = auth.currentUser;
    await updateProfile(user, data);
    toast.success("Profile updated");
    return user;
  } catch (error) {
    toast.error(error.message);
  }
}

export const resetPassword = async password => {
  try {
    const user = auth.currentUser;
    await updatePassword(user, password);
    toast.success("Password updated");
    return user;
  } catch (error) {
    toast.error(error.message);
  }
}


export const emailVerification = async () => {
  try {
    await sendEmailVerification(auth.currentUser);
    toast.success(`Email verification sent ${auth.currentUser.email} address.`);
  } catch (error) {
    toast.error(error.message);
  }
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(loginHandle({
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      uid: user.uid,
      photoURL: user.photoURL
    }));
  } else {
    store.dispatch(logoutHandle());
  }
});


export const db = getFirestore(app);
