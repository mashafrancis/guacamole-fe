import * as firebase from 'firebase';
import 'firebase/auth';

const firebaseConfiguration = {
  apiKey: 'AIzaSyC4tjLivHyvfuEsRMYHnVy1W7j9oFsr8Og',
  authDomain: 'kari4me.firebaseapp.com',
};
firebase.initializeApp(firebaseConfiguration);

export const auth: any = firebase.auth();

export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
export const FacebookProvider = new firebase.auth.FacebookAuthProvider();
