import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, User } from 'firebase/auth'
import { collection, doc, Firestore, getDoc, getDocs, getFirestore, query, setDoc, where } from 'firebase/firestore/lite'
import { v4 as uuidv4 } from 'uuid';

const firebaseConfig = {
  apiKey: "AIzaSyAdAMCMZHi9qWGqu8IjiAVC5YUPVcj6Owk",

  authDomain: "linkreview-43ea6.firebaseapp.com",
  projectId: "linkreview-43ea6",
  storageBucket: "linkreview-43ea6.appspot.com",
  messagingSenderId: "959118753926",
  appId: "1:959118753926:web:cd384da1d44702b4111107",
  measurementId: "G-Q5ZYQ2RLYN"
}

// https://firebase.google.com/docs/web/setup?authuser=0&%3Bhl=ko&hl=ko
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// https://firebase.google.com/docs/web/setup?authuser=0&%3Bhl=ko&hl=ko
const db = getFirestore(app);

export async function getUsers() {
  const usersCol = collection(db, 'users');
  const userSnapshot = await getDocs(usersCol);
  const userList = userSnapshot.docs.map(doc => doc.data());
  return userList
}

type UserData = {
  email: string
  name: string
  provider: string
  thumbnailUrl: string
  uidInProvider: string
  uid: string
}

export async function getUser(uid: string) {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);

  if(userSnap.exists()) {
    return userSnap.data();
  } else {
    null;
  }
}

export async function getUserByOpenid(openid: string) {
  const q = query(collection(db, 'users'), where('openid', '==', openid));
  const querySnap = await getDocs(q);
  return querySnap.docs.map(doc => doc.data())[0];
}

export async function setUser(userData: UserData) {
  const existed = await getUser(userData.uid);
  const openid = existed?.openid || uuidv4();

  const userRef = doc(db, 'users', userData.uid);
  return await setDoc(userRef, {...userData, openid });
}

// https://firebase.google.com/docs/auth/web/google-signin?authuser=0#web-version-9
const provider = new GoogleAuthProvider();
const auth = getAuth();

export const signIn = async () => {
  try {
    const result = await signInWithPopup(auth, provider)
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    return { user, token }
  } catch(err) {
    console.log('signIn catch')
    const errorCode = err.code;
    const errorMessage = err.message;
    console.error('signIn catch', errorMessage)
    const email = err.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(err);
    throw err;
  }
}

export const onUserChanged = (onChanged: (user: User) => void) => {
  onAuthStateChanged(auth, user => {
    onChanged(user);
  })
}

export default app;