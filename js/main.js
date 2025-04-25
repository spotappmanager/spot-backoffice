const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

auth.onAuthStateChanged(user => {
  if (!user) {
    document.getElementById('login-section').classList.remove('hidden');
  } else {
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('main-content').classList.remove('hidden');
    loadDashboard();
    loadEvents();
    loadUsers();
    loadReports();
  }
});

function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  auth.signInWithEmailAndPassword(email, password)
    .then(() => { location.reload(); })
    .catch(error => { alert('Errore: ' + error.message); });
}

function logout() {
  auth.signOut().then(() => location.reload());
}

function showAddEventForm() {
  document.getElementById('add-event-form').classList.toggle('hidden');
}

function addEvent() {
  const title = document.getElementById('event-title').value;
  const location = document.getElementById('event-location').value;
  const date = document.getElementById('event-date').value;

  if (title && location && date) {
    db.collection('events').add({title, location, date}).then(() => {
      alert('Evento aggiunto!');
      loadEvents();
      document.getElementById('add-event-form').classList.add('hidden');
    }).catch(error => { alert('Errore: ' + error.message); });
  } else {
    alert('Compila tutti i campi.');
  }
}

function loadEvents() {
  const tableBody = document.getElementById('events-table-body');
  tableBody.innerHTML = '';
  db.collection('events').orderBy('date').get().then(snapshot => {
    snapshot.forEach(doc => {
      const data = doc.data();
      tableBody.innerHTML += `<tr><td>${data.title}</td><td>${data.location}</td><td>${data.date}</td></tr>`;
    });
  });
}

function loadUsers() {
  const tableBody = document.getElementById('users-table-body');
  tableBody.innerHTML = '';
  db.collection('users').get().then(snapshot => {
    snapshot.forEach(doc => {
      const data = doc.data();
      tableBody.innerHTML += `<tr><td>${data.email}</td><td>${data.role || 'utente'}</td></tr>`;
    });
  });
}

function loadReports() {
  const tableBody = document.getElementById('reports-table-body');
  tableBody.innerHTML = '';
  db.collection('reports').orderBy('date', 'desc').get().then(snapshot => {
    snapshot.forEach(doc => {
      const data = doc.data();
      tableBody.innerHTML += `<tr><td>${data.type}</td><td>${data.description}</td><td>${data.date}</td></tr>`;
    });
  });
}

function loadDashboard() {
  db.collection('events').get().then(eventsSnap => {
    db.collection('users').get().then(usersSnap => {
      db.collection('reports').get().then(reportsSnap => {
        document.getElementById('stats').innerText =
          `Eventi: ${eventsSnap.size} | Utenti: ${usersSnap.size} | Segnalazioni: ${reportsSnap.size}`;
      });
    });
  });
}
