

import {auth} from './firebase.js'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
//sign up authentication
export const registerUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password)
}
//signin
export const loginUser = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password)
}

//signout
export const logoutUser = () => {
  return signOut(auth);
};