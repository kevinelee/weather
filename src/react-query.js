/* eslint-disable react/prop-types */
import React, { createContext, useContext, useEffect } from "react";

const FirebaseContext = createContext();
FirebaseContext.displayName = "FirebaseContext";

function useFirebaseContext() {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    console.error(Error);
  }
  return context;
}

let config = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_AUTH_DOMAIN,
  projectId: process.env.GATSBY_PROJECT_ID,
  storageBucket: process.env.GATSBY_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_MESSAGING_SENDER_ID,
  appId: process.env.GATSBY_APP_ID,
  measurementId: process.env.GATSBY_MEASUREMENT_ID,
};

const Provider = ({ children }) => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  useEffect(() => {
    firebase
      .auth()
      .signInAnonymously()
      .then(() => {
        console.log("signed in");
      })
      .catch((error) => {
        console.error({ error });
      });
  }, [firebase]);

  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  );
};

export { useFirebaseContext, Provider };
