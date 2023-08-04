import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/auth/authSlice";
import { FirebaseAuth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { startLoadingNotes } from "../store/journal/thunks";

export const useCheckAuth = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout());
      const { displayName, uid, email, photoURL } = user;
      dispatch(login({ displayName, uid, email, photoURL }));
      dispatch(startLoadingNotes());
    });
  },[]);

  return {
    status
  }
};
