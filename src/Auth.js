import React, { useEffect, useState } from "react";
import firebase from "firebase";

//grabs current user
export default function getUser() {
  return firebase.auth().currentUser;
}

export const AuthContext = React.createContext();

//function for setting current user and grab user froom firebase auth
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
    });
  }, []);

  if (pending) {
    return <>Loading...</>;
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
