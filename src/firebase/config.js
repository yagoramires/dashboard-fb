import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAPuZ1x7Qw6FBVAs8wbiyrhTwsIMX73dU8',
  authDomain: 'dashboard-6b4fd.firebaseapp.com',
  projectId: 'dashboard-6b4fd',
  storageBucket: 'dashboard-6b4fd.appspot.com',
  messagingSenderId: '78580965246',
  appId: '1:78580965246:web:2e8d9aa0502ed7940e9d2f',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
