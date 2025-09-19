import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAH3Gp1IQDYbnHLYbmhSO6xlbygVCwi2Uk",
  authDomain: "mentora-64.firebaseapp.com",
  projectId: "mentora-64",
  storageBucket: "mentora-64.firebasestorage.app",
  messagingSenderId: "179009943220",
  appId: "1:179009943220:web:e85618b8694f865e02c9e1",
  measurementId: "G-LH997KBZ69"
};



const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);