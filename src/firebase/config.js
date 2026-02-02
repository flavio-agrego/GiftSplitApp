import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyB-Hq8lXqjMdZG1HDiqiCA06amY5VPifBw",
  authDomain: "giftsplit-157b6.firebaseapp.com",
  projectId: "giftsplit-157b6",
  storageBucket: "giftsplit-157b6.firebasestorage.app",
  messagingSenderId: "163220630290",
  appId: "1:163220630290:web:cb2aafd2ef1d1daccfa1cb"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)