
import { useState, useEffect } from "react";
import "./App.css";

const MATRICE_A = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const MATRICE_B = [
  [9, 8, 7],
  [6, 5, 4],
  [3, 2, 1],
];

const ETAPES = [
  {
    titre: "1. Déclarer les matrices",
    objectif: "Créer A, B et C avec 3 lignes et 3 colonnes.",
    explication:
      "En langage C, int A[3][3] déclare une matrice de 3 lignes et 3 colonnes. Fais la même chose pour B et C.",
    exemple: "int A[3][3], B[3][3], C[3][3];",
  },
  {
    titre: "2. Initialiser la matrice C",
    objectif: "Préparer la matrice qui recevra le résultat.",
    explication:
      "Avant d'additionner les produits, chaque élément de C doit commencer à zéro. Utilise deux boucles imbriquées.",
    exemple: "C[i][j] = 0;",
  },
  {
    titre: "3. Parcourir les lignes et les colonnes",
    objectif: "Accéder à chaque élément de la matrice résultat.",
    explication:
      "Utilise i pour parcourir les lignes et j pour parcourir les colonnes. Chaque indice va de 0 à 2.",
    exemple: "for (i = 0; i < 3; i++)",
  },
  {
    titre: "4. Calculer le produit",
    objectif: "Multiplier A par B.",
    explication:
      "Ajoute une troisième boucle avec k. Pour chaque élément C[i][j], additionne les produits A[i][k] * B[k][j].",
    exemple: "C[i][j] += A[i][k] * B[k][j];",
  },
  {
    titre: "5. Afficher le résultat",
    objectif: "Afficher les 9 éléments de C.",
    explication:
      "Utilise deux boucles pour parcourir C et printf pour afficher chaque élément. Passe à la ligne après chaque ligne de la matrice.",
    exemple: 'printf("%d ", C[i][j]);',
  },
];

const ERREURS_CONNues = [
  {
    id: "declaration",
    nom: "Déclaration ou dimensions des matrices",
    mots: ["declaration", "dimension", "matrice"],
  },
  {
    id: "initialisation",
    nom: "Initialisation de C",
    mots: ["initialisation", "zero", "initialiser"],
  },
  {
    id: "boucles",
    nom: "Boucles ou indices",
    mots: ["boucle", "indice", "parcours"],
  },
  {
    id: "calcul",
    nom: "Formule de multiplication",
    mots: ["formule", "multiplication", "operateur"],
  },
  {
    id: "affichage",
    nom: "Affichage du résultat",
    mots: ["affichage", "printf"],
  },
];

function lireDonnees() {
  try {
    return JSON.parse(
      localStorage.getItem("codeAccessibleDonnees") || '{"etudiants":{}}'
    );
  } catch {
    return { etudiants: {} };
  }
}

function cleEmail(email) {
  return email.trim().toLowerCase();
}

function analyserCode(code) {
  const erreurs = [];

  if (!code.trim()) {
    return {
      erreurs: ["Le code est vide."],
      categorie: ["Aucune réponse"],
    };
  }

  if (!/\bint\s+main\s*\(/.test(code)) {
    erreurs.push(
      "Fonction principale absente : ajoute int main() à ton programme."
    );
  }

  if (!/\breturn\s+0\s*;/.test(code)) {
    erreurs.push(
      "Fin du programme : vérifie si return 0; est présent dans main."
    );
  }

  if (!/\bA\s*\[\s*3\s*\]\s*\[\s*3\s*\]/.test(code)) {
    erreurs.push(
      "Vérifie la déclaration de A : elle doit avoir 3 lignes et 3 colonnes."
    );
  }

  if (!/\bB\s*\[\s*3\s*\]\s*\[\s*3\s*\]/.test(code)) {
    erreurs.push(
      "Vérifie la déclaration de B : elle doit avoir 3 lignes et 3 colonnes."
    );
  }

  if (!/\bC\s*\[\s*3\s*\]\s*\[\s*3\s*\]/.test(code)) {
    erreurs.push(
      "Vérifie la déclaration de C : elle doit avoir 3 lignes et 3 colonnes."
    );
  }

  if (!/C\s*\[\s*i\s*\]\s*\[\s*j\s*\]\s*=\s*0\s*;/.test(code)) {
    erreurs.push(
      "Initialisation : initialise C[i][j] à zéro avant d'accumuler les produits."
    );
  }

  const formuleProduit =
    /C\s*\[\s*i\s*\]\s*\[\s*j\s*\]\s*\+?=\s*A\s*\[\s*i\s*\]\s*\[\s*k\s*\]\s*\*\s*B\s*\[\s*k\s*\]\s*\[\s*j\s*\]/;

  const formuleAddition =
    /C\s*\[\s*i\s*\]\s*\[\s*j\s*\]\s*\+?=\s*A\s*\[\s*i\s*\]\s*\[\s*k\s*\]\s*\+\s*B\s*\[\s*k\s*\]\s*\[\s*j\s*\]/;

  if (formuleAddition.test(code)) {
    erreurs.push(
      "Erreur de calcul : il faut multiplier A[i][k] par B[k][j], pas les additionner directement."
    );
  } else if (!formuleProduit.test(code)) {
    erreurs.push(
      "Formule de multiplication non reconnue. Vérifie la troisième boucle et le calcul de C[i][j]."
    );
  }

  const boucles = (code.match(/\bfor\s*\(/g) || []).length;

  if (boucles < 3) {
    erreurs.push(
      "Vérifie les boucles : le calcul du produit matriciel nécessite trois boucles imbriquées."
    );
  }

  if (!/\bprintf\s*\(/.test(code)) {
    erreurs.push(
      "Affichage absent : utilise printf pour afficher la matrice résultat."
    );
  }

  const categories = [];

  if (erreurs.some((e) => /déclaration|dimensions/i.test(e))) {
    categories.push("Déclaration ou dimensions des matrices");
  }
  if (erreurs.some((e) => /initialisation/i.test(e))) {
    categories.push("Initialisation de C");
  }
  if (erreurs.some((e) => /boucles|trois boucles/i.test(e))) {
    categories.push("Boucles ou indices");
  }
  if (erreurs.some((e) => /calcul|formule|produire/i.test(e))) {
    categories.push("Formule de multiplication");
  }
  if (erreurs.some((e) => /affichage|printf/i.test(e))) {
    categories.push("Affichage du résultat");
  }
  if (erreurs.some((e) => /fonction principale|return 0/i.test(e))) {
    categories.push("Structure du programme C");
  }

  return { erreurs, categorie: categories };
}

function App() {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [identifie, setIdentifie] = useState(false);

  const [code, setCode] = useState("");
  const [message, setMessage] = useState(null);
  const [etapeActive, setEtapeActive] = useState(0);
  const [donnees, setDonnees] = useState(lireDonnees);

  const identifiant = cleEmail(email);
  const etudiant = donnees.etudiants[identifiant];
  const tentatives = etudiant?.tentatives || [];

  useEffect(() => {
    try {
      localStorage.setItem(
        "codeAccessibleDonnees",
        JSON.stringify(donnees)
      );
    } catch {
      // Le stockage peut être indisponible ou plein.
    }
  }, [donnees]);

  function commencer(e) {
    e.preventDefault();

    const cle = cleEmail(email);
    const nouvellesDonnees = lireDonnees();
    const existant = nouvellesDonnees.etudiants[cle];

    nouvellesDonnees.etudiants[cle] = {
      prenom: existant?.prenom || prenom.trim(),
      nom: existant?.nom || nom.trim(),
      email: cle,
      dateInscription: existant?.dateInscription || new Date().toISOString(),
      tentatives: existant?.tentatives || [],
    };

    setDonnees(nouvellesDonnees);
    setPrenom(nouvellesDonnees.etudiants[cle].prenom);
    setNom(nouvellesDonnees.etudiants[cle].nom);
    setIdentifie(true);
  }

  function verifier() {
    const resultat = analyserCode(code);

    const tentative = {
      date: new Date().toISOString(),
      code,
      erreurs: resultat.erreurs,
      categories: resultat.categorie,
      reussie: resultat.erreurs.length === 0,
    };

    const nouvellesDonnees = lireDonnees();
    const cle = cleEmail(email);
    const profil = nouvellesDonnees.etudiants[cle];

    profil.tentatives = [...(profil.tentatives || []), tentative];

    setDonnees(nouvellesDonnees);
    setMessage(tentative);
  }

  function retourIdentification() {
    setIdentifie(false);
    setMessage(null);
    setCode("");
  }

  const frequences = {};
  tentatives.forEach((tentative) => {
    tentative.categories?.forEach((categorie) => {
      frequences[categorie] = (frequences[categorie] || 0) + 1;
    });
  });

  const erreursFrequentes = Object.entries(frequences).sort(
    (a, b) => b[1] - a[1]
  );

  if (!identifie) {
    return (
      <div className="page">
        <div className="carte">
          <div className="icone">🎓</div>
          <h1>CodeAccessible</h1>
          <p className="sous-titre">
            Apprends la programmation C à ton rythme.
          </p>

          <h2>Bienvenue !</h2>
          <p>Identifie-toi pour commencer ton exercice.</p>

          <form onSubmit={commencer}>
            <label htmlFor="prenom">Prénom</label>
            <input
              id="prenom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              placeholder="Entre ton prénom"
              required
            />

            <label htmlFor="nom">Nom</label>
            <input
              id="nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Entre ton nom"
              required
            />

            <label htmlFor="email">Adresse e-mail</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemple@email.com"
              required
            />

            <button type="submit">Commencer →</button>
          </form>

          <p className="note">
            Tes tentatives sont enregistrées sur ce navigateur.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="espace">
      <header className="entete">
        <div>
          <h1>CodeAccessible</h1>
          <p>
            Bienvenue, {prenom} {nom} !
          </p>
        </div>
        <button className="bouton-secondaire" onClick={retourIdentification}>
          Retour
        </button>
      </header>

      <main className="contenu">
        <section className="exercice">
          <h2>Exercice : multiplication de matrices 3 × 3</h2>
          <p>
            Écris un programme en C qui calcule le produit de A par B.
            Le résultat doit être stocké dans une matrice C.
          </p>

          <h3>Matrice A</h3>
          <div className="matrice">
            {MATRICE_A.flat().map((n, i) => (
              <span key={i}>{n}</span>
            ))}
          </div>

          <h3>Matrice B</h3>
          <div className="matrice">
            {MATRICE_B.flat().map((n, i) => (
              <span key={i}>{n}</span>
            ))}
          </div>

          <h3>Consignes expliquées</h3>
          <p className="aide">
            Suis les étapes dans l'ordre. Tu peux consulter chaque explication
            avant de continuer.
          </p>

          <div className="etapes">
            {ETAPES.map((etape, index) => (
              <div className="etape" key={etape.titre}>
                <button
                  className="bouton-etape"
                  onClick={() => setEtapeActive(index)}
                  aria-expanded={etapeActive === index}
                >
                  {etape.titre}
                  <span>{etapeActive === index ? "−" : "+"}</span>
                </button>

                {etapeActive === index && (
                  <div className="detail-etape">
                    <strong>Ce que tu dois faire</strong>
                    <p>{etape.objectif}</p>
                    <strong>Comment faire ?</strong>
                    <p>{etape.explication}</p>
                    <strong>Exemple</strong>
                    <pre>{etape.exemple}</pre>
                    {index < ETAPES.length - 1 && (
                      <button
                        onClick={() => setEtapeActive(index + 1)}
                      >
                        Étape suivante →
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="editeur">
          <h2>Ton code C</h2>
          <p className="aide">
            La zone est vide au départ. Écris ton programme ici.
          </p>

          <textarea
            aria-label="Éditeur de code C"
            spellCheck={false}
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setMessage(null);
            }}
            placeholder="Écris ton programme C ici..."
          />

          <button onClick={verifier}>Vérifier mon code</button>

          {message && (
            <div className="retour" role="status">
              <h3>
                {message.reussie
                  ? "Vérification préliminaire positive"
                  : "Retour pédagogique"}
              </h3>
              <p>
                Tentative n° {tentatives.length}
              </p>

              {message.erreurs.length === 0 ? (
                <p>
                  Aucune des erreurs recherchées n'a été détectée.
                  Cela ne garantit pas que le programme compile ou donne
                  le bon résultat.
                </p>
              ) : (
                <ul>
                  {message.erreurs.map((erreur, i) => (
                    <li key={i}>{erreur}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <button
            className="bouton-secondaire"
            onClick={() => {
              setCode("");
              setMessage(null);
            }}
          >
            Effacer mon code
          </button>

          <div className="retour">
            <h3>Mon suivi</h3>
            <p>
              Nombre total de tentatives : <strong>{tentatives.length}</strong>
            </p>
            <p>
              Tentatives sans erreur détectée :{" "}
              <strong>
                {tentatives.filter((t) => t.reussie).length}
              </strong>
            </p>

            <h4>Erreurs les plus fréquentes</h4>
            {erreursFrequentes.length === 0 ? (
              <p>Aucune erreur catégorisée pour le moment.</p>
            ) : (
              <ul>
                {erreursFrequentes.map(([categorie, nombre]) => (
                  <li key={categorie}>
                    {categorie} : {nombre} occurrence(s)
                  </li>
                ))}
              </ul>
            )}
          </div>

          <h3>Historique des tentatives</h3>
          {tentatives.length === 0 ? (
            <p className="aide">Aucune tentative enregistrée.</p>
          ) : (
            <ol className="historique">
              {[...tentatives].reverse().map((t, i) => (
                <li key={`${t.date}-${i}`}>
                  <strong>
                    {new Date(t.date).toLocaleString("fr-FR")}
                  </strong>
                  <p>
                    {t.erreurs.length} erreur(s) détectée(s)
                  </p>
                  <details>
                    <summary>Voir le code soumis</summary>
                    <pre>{t.code || "(Code vide)"}</pre>
                    {t.erreurs.length > 0 && (
                      <ul>
                        {t.erreurs.map((e, j) => (
                          <li key={j}>{e}</li>
                        ))}
                      </ul>
                    )}
                  </details>
                </li>
              ))}
            </ol>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
