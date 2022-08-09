import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC7RsMQ5h82sA5NKVmhxXWU7JsiB_mWhDM',
  authDomain: 'dashboard-a86a7.firebaseapp.com',
  projectId: 'dashboard-a86a7',
  storageBucket: 'dashboard-a86a7.appspot.com',
  messagingSenderId: '157259286024',
  appId: '1:157259286024:web:8672d6fb4ea073d38ff3bd',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
