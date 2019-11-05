import * as firebase from 'firebase';
import 'firebase/auth';

const firebaseConfiguration = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
};
firebase.initializeApp(firebaseConfiguration);

export const auth: any = firebase.auth();

export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
export const FacebookProvider = new firebase.auth.FacebookAuthProvider();
