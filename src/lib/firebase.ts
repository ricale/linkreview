import { initializeApp } from 'firebase/app';

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
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);

export default firebaseApp;
