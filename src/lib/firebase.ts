import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

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

// https://firebase.google.com/docs/auth/web/google-signin?authuser=0#web-version-9
const provider = new GoogleAuthProvider();
const auth = getAuth();

export const signIn = () => {
  console.log('signIn')
signInWithPopup(auth, provider)
  .then(result => {
    console.log('signIn then')
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
  })
  .catch(error => {
    console.log('signIn catch')
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error('signIn catch', errorMessage)
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  })
}

export default app;