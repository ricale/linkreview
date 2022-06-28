import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, User } from 'firebase/auth'

// https://firebase.google.com/docs/auth/web/google-signin?authuser=0#web-version-9
const _provider = new GoogleAuthProvider();
const _auth = getAuth();

const signIn = async () => {
  try {
    const result = await signInWithPopup(_auth, _provider)
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

const onUserChanged = (onChanged: (user: User) => void) => {
  onAuthStateChanged(_auth, user => {
    onChanged(user);
  })
}

const auth = {
  signIn,
  onUserChanged,
}

export default auth;
