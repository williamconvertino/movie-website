import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  doc,
  setDoc,
} from 'firebase/firestore';

import {
  auth,
  db,
} from '../../firebase';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signUp = async (email, password, username) => {
    try {
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const docRef = doc(db, 'users', userCredential.user.uid)

      const data = {
        email: email,
        username: username,
        datetimeCreated: new Date()
      };
      
      await setDoc(docRef, data);

      setUser(userCredential.user);
    } catch (e) {
      console.log(e)
    }
  };

  const emailSignIn = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    setUser(userCredential.user);
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Error signing out');
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signUp, emailSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
