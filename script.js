const feed = document.getElementById('feed');
const liveFeed = document.getElementById('liveNowFeed');
let liveEvents = [];

function mostraEventi() {
  const eventi = [
    { titolo: "Sabato Night Fever", categoria: "Discoteca", data: "2025-04-26", media: "videos/evento1.mp4" },
    { titolo: "Sunset Aperitivo", categoria: "Aperitivo", data: "2025-04-27", media: "videos/evento2.mp4" },
    { titolo: "Street Music Live", categoria: "Concerto", data: "2025-04-28", media: "videos/evento3.mp4" },
    { titolo: "Festival della Musica", categoria: "Concerto", data: "2025-04-22", media: "videos/evento4.mp4" },
    { titolo: "AperiSunday", categoria: "Aperitivo", data: "2025-04-20", media: "videos/evento5.mp4" },
    { titolo: "Spring Dance Party", categoria: "Discoteca", data: "2025-04-19", media: "videos/evento6.mp4" }
  ];
  feed.innerHTML = '';
  eventi.forEach(ev => {
    const post = document.createElement('div');
    post.classList.add('post');
    post.innerHTML = \`
      <video src="\${ev.media}" autoplay muted loop></video>
      <div class="description">
        <h2>\${ev.titolo}</h2>
        <p>Categoria: \${ev.categoria}</p>
        <p>Data: \${ev.data}</p>
      </div>
    \`;
    feed.appendChild(post);
  });
}

function aggiornaLive() {
  liveFeed.innerHTML = '';
  liveEvents = liveEvents.filter(ev => new Date().getTime() - ev.timestamp < 3600000); // 1 ora
  liveEvents.forEach(ev => {
    const live = document.createElement('div');
    live.classList.add('live-post');
    live.innerHTML = \`
      <div class="description">
        <h2>\${ev.title}</h2>
        <p>Luogo: \${ev.location}</p>
        <p>\${ev.description}</p>
      </div>
    \`;
    liveFeed.appendChild(live);
  });
}

// Apre modali
document.getElementById('roleBtn').onclick = () => document.getElementById('roleModal').classList.remove('hidden');
document.getElementById('liveNowBtn').onclick = () => document.getElementById('liveModal').classList.remove('hidden');
document.getElementById('settingsBtn').onclick = () => document.getElementById('settingsModal').classList.remove('hidden');

// Chiudi modali
document.querySelectorAll('.close-btn').forEach(btn => {
  btn.onclick = () => btn.parentElement.parentElement.classList.add('hidden');
});

// Scelta ruolo
document.querySelectorAll('.choose-role').forEach(btn => {
  btn.onclick = () => {
    localStorage.setItem('spotRole', btn.dataset.role);
    alert('Ruolo selezionato: ' + btn.dataset.role);
    document.getElementById('roleModal').classList.add('hidden');
  };
});

// Invio evento live
document.getElementById('sendLive').onclick = () => {
  const title = document.getElementById('liveTitle').value;
  const location = document.getElementById('liveLocation').value;
  const description = document.getElementById('liveDescription').value;
  if (title && location && description) {
    liveEvents.push({ title, location, description, timestamp: new Date().getTime() });
    aggiornaLive();
    document.getElementById('liveModal').classList.add('hidden');
  } else {
    alert('Completa tutti i campi');
  }
};

// Avvio
mostraEventi();
setInterval(aggiornaLive, 30000); // aggiorna live ogni 30 sec
