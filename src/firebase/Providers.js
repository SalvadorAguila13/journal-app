import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    // const creadentials = GoogleAuthProvider.credentialFromResult(result)
    const { displayName, phoneNumber, uid, email } = result.user;
    return {
      ok: true,
      displayName,
      phoneNumber,
      uid,
      email,
    };
  } catch (error) {
    console.log(error);
    const errorCode = error.code;
    const errorMessage = error.message;
    return {
      ok: false,
      errorCode,
      errorMessage,
    };
  }
};

export const registerUserWithEmailPassword = async ({email, password, displayName,}) => {
  try {
    const resp = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { uid, photoURL } = resp.user;
    // console.log(resp);
    // Actualizar el displayName del usuario.
    await updateProfile(FirebaseAuth.currentUser, {displayName});
    
    return {
      ok: true,
      uid, photoURL, displayName
    }
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      errorMessage: 'El usuario ya esta registrado',
    };
  }
};

export const loginWithEmailAndPassword = async ({email, password}) => {
  try {
    const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password)
    const { uid, photoURL, displayName } = resp.user;
    
    return {
      ok: true,
      uid, photoURL, displayName
    }
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      errorMessage: error.message,
    };
  }
}

// Función que devuelve a los valores iniciales del store y ayuda a salir de la sesión al usuario.
export const logoutFirebase = async () => {
  return FirebaseAuth.signOut()
}