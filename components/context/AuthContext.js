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
  getDoc,
  setDoc,
} from 'firebase/firestore';

import {
  auth,
  db,
} from '../../firebase';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null)

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
    loadProfile(userCredential.user)
  };

  const loadProfile = async (user) => {
    if (!user) return;
    const docRef = doc(db, 'users', user.uid);
    const docSnapshot = await getDoc(docRef);
    const data = docSnapshot.data()
    data.id = user.uid
    setProfile(data)
  }

  const logOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setProfile(null)
    } catch (error) {
      console.error('Error signing out');
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      loadProfile(currentUser)
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, signUp, emailSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
