/* =====================================================
   1. DONNÉES : catalogue des produits
   ===================================================== */
const CATEGORIES = {
  ps5: "PlayStation 5", ps4: "PlayStation 4",
  "manette-ps5": "Manettes PS5", "manette-ps4": "Manettes PS4",
  "jeu-ps5": "Jeux PS5", "jeu-ps4": "Jeux PS4",
  vr: "Réalité Virtuelle",
  casque: "Casques"
};

// Icône de secours si un produit n'a pas d'image
const ICONES = {
  ps5:"🎮",
  ps4:"🕹️",
  "manette-ps5":"🎮",
  "manette-ps4":"🕹️",
  "jeu-ps5":"💿",
  "jeu-ps4":"📀",
  vr:"🥽",
  casque:"🎧"
};

// img = nom du fichier dans le dossier images/
const PRODUITS = [
  { id:1, nom:"PlayStation 5 Slim Digital",   cat:"ps5",         prix:449, ancien:499, img:"ps5-digital.webp",         desc:"Console PS5 Slim 100 % numérique avec SSD ultra-rapide et manette DualSense." },
  { id:2, nom:"PlayStation 4 500 Go",         cat:"ps4",         prix:219, ancien:249, img:"ps4-500go.webp",           desc:"Console PS4 reconditionnée, testée et prête à jouer, avec 500 Go de stockage." },
  { id:3, nom:"DualSense Edge",               cat:"manette-ps5", prix:229, img:"dualsense-edge.webp",              desc:"Manette pro personnalisable pour PS5 : boutons, sticks et profils." },
  { id:4, nom:"DualShock 4 Noire",            cat:"manette-ps4", prix:55,  img:"dualshock4-noire.webp",            desc:"La manette officielle PS4, confortable et fiable." },
  { id:5, nom:"Marvel's Spider-Man 2",        cat:"jeu-ps5",     prix:59,  ancien:69, img:"spider-man-2.webp",       desc:"Aventure en monde ouvert avec Peter Parker et Miles Morales." },
  { id:6, nom:"Gran Turismo 7",              cat:"jeu-ps5",     prix:49,  ancien:69, img:"gran-turismo-7.webp",     desc:"Le simulateur de course de référence sur PlayStation." },
  { id:7, nom:"God of War Ragnarök",          cat:"jeu-ps4",     prix:39,  img:"god-of-war-ragnarok.webp",         desc:"Kratos et Atreus face à la fin du monde nordique." },
  { id:8, nom:"The Last of Us Part II",       cat:"jeu-ps4",     prix:29,  img:"last-of-us-2.webp",                desc:"Une histoire intense de survie et de vengeance." },
  { id:9, nom:"PlayStation VR2",              cat:"vr",          prix:499, ancien:549, desc:"Casque de réalité virtuelle PlayStation avec affichage immersif et suivi des mouvements." },
  { id:10, nom:"Casque PULSE 3D Sans Fil",    cat:"casque",      prix:99,  ancien:109, img:"pulse-3d.webp",           desc:"Casque sans fil officiel PS5 avec audio 3D et micros intégrés." },
  { id:11, nom:"Casque PULSE Elite",          cat:"casque",      prix:149, img:"pulse-elite.webp",                 desc:"Casque sans fil PS5 avec micro rétractable, audio planaire et grand confort." },
  { id:12, nom:"HyperX Cloud II",             cat:"casque",      prix:99,  ancien:119, img:"hyperx-cloud-2.webp",     desc:"Casque gaming filaire compatible PS5 et PS4, son surround 7.1 et micro détachable." },
  { id:13, nom:"Razer Kraken X",              cat:"casque",      prix:59,  img:"razer-kraken-x.webp",              desc:"Casque gaming léger et confortable, compatible PS5 et PS4." }
];

// Affiche l'image du produit (ou l'icône si pas d'image)
const imageProduit = p => p.img ? `<img src="images/${p.img}" alt="${p.nom}">` : ICONES[p.cat];


/* =====================================================
   2. PANIER (stocké dans le navigateur avec localStorage)
   ===================================================== */
const getPanier = () => JSON.parse(localStorage.getItem("panier") || "[]");
const savePanier = p => { localStorage.setItem("panier", JSON.stringify(p)); majCompteur(); };
const euro = n => n.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
const app = document.getElementById("app");

function majCompteur() {
  document.getElementById("cart-count").textContent = getPanier().reduce((s, l) => s + l.qte, 0);
}

function ajouterAuPanier(id, qte = 1) {
  const panier = getPanier();
  const ligne = panier.find(l => l.id === id);
  ligne ? ligne.qte += qte : panier.push({ id, qte });
  savePanier(panier);
  alert("Produit ajouté au panier !");
}

function changerQte(id, v) {
  const p = getPanier();
  p.find(l => l.id === id).qte = Math.max(1, Number(v));
  savePanier(p);
  pagePanier();
}

function supprimer(id) {
  savePanier(getPanier().filter(l => l.id !== id));
  pagePanier();
}

function viderPanier() {
  savePanier([]);
  pagePanier();
}

function commander() {
  savePanier([]);
  app.innerHTML = '<main class="container mt-5"><div class="alert alert-success">Merci ! Votre commande (simulation) a bien été enregistrée.</div></main>';
}


/* =====================================================
   3. COMPOSANT : carte produit
   ===================================================== */
function carteProduit(p) {
  return `
  <div class="col-6 col-lg-3">
    <div class="product-card d-flex flex-column">
      <a href="#/produit/${p.id}" class="product-img text-decoration-none position-relative">
        ${p.ancien ? '<span class="badge badge-promo position-absolute top-0 start-0 m-2">Promo</span>' : ""}
        ${imageProduit(p)}
      </a>
      <div class="p-3 d-flex flex-column flex-grow-1">
        <small class="text-muted">${CATEGORIES[p.cat]}</small>
        <a href="#/produit/${p.id}" class="fw-semibold text-decoration-none text-dark my-1">${p.nom}</a>
        <div class="mt-auto">
          <span class="price">${euro(p.prix)}</span>${p.ancien ? `<span class="old-price">${euro(p.ancien)}</span>` : ""}
          <button class="btn btn-primary btn-sm w-100 mt-2" onclick="ajouterAuPanier(${p.id})">Ajouter au panier</button>
        </div>
      </div>
    </div>
  </div>`;
}

const titrePage = t => `<div class="page-title"><div class="container"><h1 class="mb-0">${t}</h1></div></div>`;


/* =====================================================
   4. PAGES : chaque fonction affiche une page dans #app
   ===================================================== */
function pageAccueil() {
  const cats = Object.entries(CATEGORIES).map(([cle, nom]) =>
    `<div class="col-6 col-md-3 col-lg"><a class="cat-tile" href="#/produits/${cle}"><span class="icon">${ICONES[cle]}</span>${nom}</a></div>`).join("");
  const promos = PRODUITS.filter(p => p.ancien).slice(0, 4).map(carteProduit).join("");

  app.innerHTML = `
  <section class="hero">
    <div class="container row mx-auto align-items-center">
      <div class="col-lg-7">
        <h1>Tout pour jouer sur PlayStation</h1>
        <p class="my-4">Consoles PS5 et PS4, manettes, jeux et accessoires, livrés en 48 h.</p>
        <a href="#/produits" class="btn btn-primary btn-lg">Voir les produits</a>
        <a href="#/produits/ps5" class="btn btn-outline-light btn-lg ms-2">PS5 en stock</a>
      </div>
      <div class="col-lg-5 hero-visual d-none d-lg-block" aria-hidden="true">🎮</div>
    </div>
  </section>
  <main class="container mt-5">
    <h2 class="mb-4">Nos catégories</h2><div class="row g-3">${cats}</div>
    <h2 class="mt-5 mb-4">Nos coups de cœur</h2><div class="row g-4">${promos}</div>
    <div class="row text-center g-4 mt-4">
      <div class="col-md-4"><h4>Livraison en 48 h</h4><p>Gratuite dès 60 € d'achat.</p></div>
      <div class="col-md-4"><h4>Paiement sécurisé</h4><p>Carte bancaire ou PayPal.</p></div>
      <div class="col-md-4"><h4>Retour sous 14 jours</h4><p>Satisfait ou remboursé.</p></div>
    </div>
  </main>`;
}


function pageProduits(catInitiale = "") {
  app.innerHTML = `${titrePage("Tous les produits")}
  <main class="container">
    <div class="row g-2 mb-4">
      <div class="col-md-5"><input id="recherche" class="form-control" placeholder="Rechercher un produit" aria-label="Recherche"></div>
      <div class="col-md-4"><select id="filtre-cat" class="form-select" aria-label="Catégorie">
        <option value="">Toutes les catégories</option>
        ${Object.entries(CATEGORIES).map(([c, n]) => `<option value="${c}">${n}</option>`).join("")}</select></div>
      <div class="col-md-3"><select id="tri" class="form-select" aria-label="Tri">
        <option value="">Trier par défaut</option><option value="asc">Prix croissant</option><option value="desc">Prix décroissant</option></select></div>
    </div>
    <div class="row g-4" id="liste"></div>
  </main>`;

  const selCat = document.getElementById("filtre-cat"),
        recherche = document.getElementById("recherche"),
        tri = document.getElementById("tri");

  selCat.value = catInitiale;

  function afficher() {
    const liste = PRODUITS.filter(p =>
      (!selCat.value || p.cat === selCat.value) &&
      p.nom.toLowerCase().includes(recherche.value.toLowerCase())
    );

    if (tri.value === "asc") liste.sort((a, b) => a.prix - b.prix);
    if (tri.value === "desc") liste.sort((a, b) => b.prix - a.prix);

    document.getElementById("liste").innerHTML =
      liste.length
        ? liste.map(carteProduit).join("")
        : '<p class="text-center">Aucun produit ne correspond à votre recherche.</p>';
  }

  [selCat, recherche, tri].forEach(el => el.addEventListener("input", afficher));
  afficher();
}


function pageProduit(id) {
  const p = PRODUITS.find(x => x.id === id);

  if (!p) {
    app.innerHTML = '<main class="container mt-5"><p>Produit introuvable. <a href="#/produits">Retour aux produits</a></p></main>';
    return;
  }

  const similaires = PRODUITS
    .filter(x => x.cat === p.cat && x.id !== p.id)
    .slice(0, 4)
    .map(carteProduit)
    .join("");

  app.innerHTML = `
  <main class="container mt-5">
    <a href="#/produits">&larr; Retour aux produits</a>
    <div class="row g-5 mt-1">
      <div class="col-md-6"><div class="detail-img">${imageProduit(p)}</div></div>
      <div class="col-md-6">
        <small class="text-muted">${CATEGORIES[p.cat]}</small>
        <h1>${p.nom}</h1>
        <p class="lead">${p.desc}</p>
        <div class="mb-3"><span class="price fs-2">${euro(p.prix)}</span>${p.ancien ? `<span class="old-price">${euro(p.ancien)}</span>` : ""}</div>
        <div class="d-flex gap-2" style="max-width:320px">
          <input id="qte" type="number" min="1" value="1" class="form-control" style="width:90px" aria-label="Quantité">
          <button class="btn btn-primary flex-grow-1" onclick="ajouterAuPanier(${p.id}, Math.max(1, Number(document.getElementById('qte').value)))">Ajouter au panier</button>
        </div>
        <p class="text-muted mt-3 mb-0">En stock · Livraison en 48 h</p>
      </div>
    </div>
    ${similaires ? `<h2 class="mt-5 mb-4">Produits similaires</h2><div class="row g-4">${similaires}</div>` : ""}
  </main>`;
}


function pagePanier() {
  const panier = getPanier();
  let contenu;

  if (!panier.length) {
    contenu = '<div class="text-center py-5"><p class="fs-5">Votre panier est vide.</p><a class="btn btn-primary" href="#/produits">Voir les produits</a></div>';
  } else {
    let total = 0;

    const lignes = panier.map(l => {
      const p = PRODUITS.find(x => x.id === l.id);
      const sous = p.prix * l.qte;
      total += sous;

      return `<tr>
        <td><a href="#/produit/${p.id}">${p.nom}</a></td>
        <td>${euro(p.prix)}</td>
        <td><input type="number" min="1" value="${l.qte}" class="form-control form-control-sm" style="width:80px" onchange="changerQte(${p.id}, this.value)" aria-label="Quantité"></td>
        <td>${euro(sous)}</td>
        <td><button class="btn btn-outline-danger btn-sm" onclick="supprimer(${p.id})">Retirer</button></td></tr>`;
    }).join("");

    contenu = `
      <div class="table-responsive"><table class="table align-middle">
        <thead><tr><th>Produit</th><th>Prix</th><th>Quantité</th><th>Total</th><th></th></tr></thead>
        <tbody>${lignes}</tbody>
      </table></div>
      <div class="d-flex justify-content-between align-items-center flex-wrap gap-3 mt-3">
        <button class="btn btn-outline-secondary" onclick="viderPanier()">Vider le panier</button>
        <div class="text-end"><div class="fs-4">Total : <strong class="price">${euro(total)}</strong></div>
        <button class="btn btn-primary btn-lg mt-2" onclick="commander()">Passer la commande</button></div>
      </div>`;
  }

  app.innerHTML = `${titrePage("Mon panier")}<main class="container">${contenu}</main>`;
}


function pageContact() {
  app.innerHTML = `${titrePage("Contactez-nous")}
  <main class="container" style="max-width:640px">
    <div id="succes" class="alert alert-success d-none">Message envoyé. Nous vous répondons sous 24 h.</div>
    <form id="form-contact" novalidate>
      <div class="mb-3"><label for="nom" class="form-label">Nom</label>
        <input id="nom" class="form-control" required><div class="invalid-feedback">Entrez votre nom.</div></div>
      <div class="mb-3"><label for="email" class="form-label">E-mail</label>
        <input id="email" type="email" class="form-control" required><div class="invalid-feedback">Entrez une adresse e-mail valide.</div></div>
      <div class="mb-3"><label for="message" class="form-label">Message</label>
        <textarea id="message" rows="5" class="form-control" required minlength="10"></textarea><div class="invalid-feedback">Écrivez au moins 10 caractères.</div></div>
      <button class="btn btn-primary">Envoyer le message</button>
    </form>
  </main>`;

  const form = document.getElementById("form-contact");

  form.addEventListener("submit", e => {
    e.preventDefault();
    form.classList.add("was-validated");

    if (form.checkValidity()) {
      form.reset();
      form.classList.remove("was-validated");
      document.getElementById("succes").classList.remove("d-none");
    }
  });
}


/* =====================================================
   5. ROUTEUR : choisit la page selon l'adresse (#/...)
   ===================================================== */
function router() {
  const [, page = "", param = ""] = location.hash.split("/");   // ex: "#/produit/5" -> page="produit", param="5"

  if (page === "produits") pageProduits(param);
  else if (page === "produit") pageProduit(Number(param));
  else if (page === "panier") pagePanier();
  else if (page === "contact") pageContact();
  else pageAccueil();

  document.querySelectorAll("[data-route]").forEach(a =>
    a.classList.toggle("active", a.dataset.route === (page || "accueil"))
  );

  window.scrollTo(0, 0);
}

const THEME_KEY = "playzone-theme";

function applyTheme(theme) {
  const nextTheme = theme === "dark" ? "dark" : "light";
  document.body.dataset.theme = nextTheme;

  const toggle = document.getElementById("theme-toggle");
  if (toggle) {
    const icon = toggle.querySelector(".theme-icon");
    const label = toggle.querySelector(".theme-label");

    if (icon) icon.textContent = nextTheme === "dark" ? "☀️" : "🌙";
    if (label) label.textContent = nextTheme === "dark" ? "Clair" : "Sombre";

    toggle.classList.toggle("btn-outline-light", nextTheme !== "dark");
    toggle.classList.toggle("btn-outline-secondary", nextTheme === "dark");
  }

  localStorage.setItem(THEME_KEY, nextTheme);
}

function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  applyTheme(savedTheme || preferredTheme);

  const toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      applyTheme(document.body.dataset.theme === "dark" ? "light" : "dark");
    });
  }
}

window.addEventListener("hashchange", router);
majCompteur();
initTheme();
router();

