<!-- firebase-auth.js -->
<script type="module">
  // Import Firebase SDK
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

  // Configurazione Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyAJqcvzQBiSV5cNQZ-o_m_9JzBFpmyR8f0",
    authDomain: "spot-beed1.firebaseapp.com",
    projectId: "spot-beed1",
    storageBucket: "spot-beed1.firebasestorage.app",
    messagingSenderId: "628548567075",
    appId: "1:628548567075:web:34405c7d4a206a027c3196"
  };

  // Inizializza Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  // Registrazione
  window.registerUser = async function(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      alert("Registrazione completata!");
      window.location.href = "index.html";
    } catch (error) {
      alert("Errore nella registrazione: " + error.message);
    }
  }

  // Login
  window.loginUser = async function(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "dashboard.html";
    } catch (error) {
      alert("Login fallito: " + error.message);
    }
  }

  // Logout
  window.logoutUser = function() {
    signOut(auth).then(() => {
      window.location.href = "login.html";
    });
  }

  // Stato login
  window.addEventListener('DOMContentLoaded', () => {
    onAuthStateChanged(auth, (user) => {
      const restrictedPages = ["dashboard.html"];
      const onRestrictedPage = restrictedPages.some(page => window.location.href.includes(page));
      if (onRestrictedPage && !user) {
        window.location.href = "login.html";
      }
    });
  });
</script>
