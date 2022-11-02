import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCqAMbzOsOMPi8hjSzbjO1ZHqXHi1G0Ceo',
  authDomain: 'alkemy-movie.firebaseapp.com',
  projectId: 'alkemy-movie',
  storageBucket: 'alkemy-movie.appspot.com',
  messagingSenderId: '392493493209',
  appId: '1:392493493209:web:abda1dbee2679db0ba47c8'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth()

export { db, auth }
