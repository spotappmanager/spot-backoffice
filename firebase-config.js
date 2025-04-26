// firebase-config.js

const firebaseConfig = {
  apiKey: "AIzaSyAJqcvzQ8iSV6sNQZ-o_m_9JzBFpmyR8f0",
  authDomain: "spot-beed1.firebaseapp.com",
  projectId: "spot-beed1",
  storageBucket: "spot-beed1.appspot.com",
  messagingSenderId: "628548567075",
  appId: "1:628548567075:web:34485c7d4a206a027c3196"
};

// Inizializza Firebase
firebase.initializeApp(firebaseConfig);

// Collegamenti servizi
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
