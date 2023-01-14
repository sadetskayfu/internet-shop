import React from 'react';
import './sass/style.scss'
import { onAuthStateChanged } from "firebase/auth";
import Routers from './routers';
import { useAppDispatch } from './hooks/redux';
import { auth } from './firebase-config';
import { IUser } from './models/user';
import { authSlice } from './store/reducer/AuthSlice';

const App = () => {
  const dispatch = useAppDispatch()
  const { onChangeLogin } = authSlice.actions

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const currentUser = {
        id: user.uid,
        email: user.email
      } as IUser
      dispatch(onChangeLogin(currentUser))
    }
  })

  return (
    <>
      <Routers />
    </>
  );
};

export default App;
