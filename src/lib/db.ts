import { collection, doc, Firestore, getDoc, getDocs, getFirestore, query, setDoc, where } from 'firebase/firestore/lite'
import shortUuid from 'short-uuid';

import firebaseApp from './firebase';

type DbState = {
  db: Firestore | null
}
const _state: DbState = {
  // https://firebase.google.com/docs/web/setup?authuser=0&%3Bhl=ko&hl=ko
  db: getFirestore(firebaseApp)
}

type UserData = {
  email: string
  name: string
  provider: string
  thumbnailUrl: string
  uidInProvider: string
  uid: string
  openid?: string
}

type LinkReviewData = {
  id: string
  userId: string
  url: string
  title: string
  content: string
}

type DbData = {
  users: UserData
  linkReviews: LinkReviewData
}

// async function getDocuments<T extends keyof DbData>(collectionName: T) {
//   if(!_state.db) {
//     return;
//   }

//   const usersCol = collection(_state.db, collectionName);
//   const userSnapshot = await getDocs(usersCol);
//   const userList = userSnapshot.docs.map(doc => doc.data());
//   return userList as DbData[T][]
// }

const db = {

  // async getUsers() {
  //   return await getDocuments('users');
  // },

  async getUser(uid: string) {
    if(!_state.db) {
      return;
    }

    const userRef = doc(_state.db, 'users', uid);
    const userSnap = await getDoc(userRef);

    if(userSnap.exists()) {
      return userSnap.data();
    } else {
      null;
    }
  },

  async getUserByOpenid(openid: string) {
    if(!_state.db) {
      return;
    }

    const q = query(collection(_state.db, 'users'), where('openid', '==', openid));
    const querySnap = await getDocs(q);
    return querySnap.docs.map(doc => doc.data())[0] as UserData;
  },

  async setUser(userData: UserData) {
    if(!_state.db) {
      return;
    }

    const existed = await this.getUser(userData.uid);
    const openid = existed?.openid || shortUuid.generate();

    const userRef = doc(_state.db, 'users', userData.uid);
    const newUser = {...userData, openid }
    await setDoc(userRef, newUser);
    return newUser
  },

  async getLinkReviews(userId: string) {
    const q = query(collection(_state.db, 'linkReviews'), where('userId', '==', userId))
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}));
  },

  async setLinkReview(linkReviewData: Omit<LinkReviewData, 'id'> & { id?: string }) {
    if(!_state.db) {
      return;
    }

    const { id, ...data } = linkReviewData;

    const linkReviewRef = doc(_state.db, 'linkReviews', id ?? shortUuid.generate())
    await setDoc(linkReviewRef, data);
  }
}

export default db;
