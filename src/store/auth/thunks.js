import { loginWithEmailAndPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/Providers"
import { clearNotesLogOut } from "../journal/journalSlice"
import { checkingCredentials, login, logout } from "./authSlice"


export const checkingAuthentication = (email, password) => {
    return async (dispatch) => {
        dispatch(checkingCredentials())
    }
}

export const startGoogleSingIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials())
        const result = await singInWithGoogle()
        if (!result.ok) return dispatch(logout(result.errorMessage))
        
        dispatch(login(result))
    }
}

export const creatingUserWithEmailPassword = ({email, password, displayName}) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const {ok, uid, photoURL, errorMessage} = await registerUserWithEmailPassword({email, password, displayName});
        
        if (!ok) return dispatch(logout(errorMessage))
        dispatch(login(uid, email, displayName, photoURL))
    }
}

export const startLoginWithEmailPassword = ({email, password}) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const result = await loginWithEmailAndPassword({email, password})        

        if(!result.ok) return dispatch(logout(result.errorMessage))
        dispatch(login(result))
    }
}

export const startLogout = () => {
    return async (dispatch) => {
        await logoutFirebase();
        dispatch(clearNotesLogOut())
        dispatch(logout())

    }
}