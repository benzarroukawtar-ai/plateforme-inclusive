
import { useState } from "react";
import "./App.css";

function App() {
  // Informations de l'étudiant
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [identifie, setIdentifie] = useState(false);

  // Zone de programmation vide au départ
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  // Passer à l'exercice
  function commencer(e) {
    e.preventDefault();
    setIdentifie(true);
  }

  // Vérification simple du code
  function verifier() {
    if (!code.trim()) {
      setMessage("Écris d'abord ton programme C avant de le vérifier.");
      return;
    }

    if (!code.includes("int main")) {
      setMessage(
        "Indice : vérifie que ton programme contient une fonction principale int main()."
      );
      return;
    }

    if (
      code.includes("C[i][j] += A[i][k] + B[k][j]") ||
      code.includes("C[i][j] = A[i][k] + B[k][j]")
    ) {
      setMessage(
        "Erreur logique possible : pour multiplier deux matrices, il faut multiplier les éléments correspondants, puis additionner les produits. Vérifie l'opérateur utilisé."
      );
      return;
    }

    if (
      code.includes("C[i][j] += A[i][k] * B[k][j]")
    ) {
      setMessage(
        "Bonne piste ! Cette instruction correspond au calcul d'un produit. Vérifie aussi l'initialisation de C, les dimensions des matrices et les boucles."
      );
      return;
    }

    setMessage(
      "Ton code a été reçu. Cette vérification est limitée : elle ne compile pas le programme et ne détecte pas toutes les erreurs. Une IA sera ajoutée dans une prochaine étape."
    );
  }

  // Page d'identification
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
          <p>Commençons par faire connaissance.</p>

          <form onSubmit={commencer}>
            <label htmlFor="prenom">Prénom</label>
            <input
              id="prenom"
              type="text"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              placeholder="Entre ton prénom"
              required
            />

            <label htmlFor="nom">Nom</label>
            <input
              id="nom"
              type="text"
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
            Une plateforme d'apprentissage accessible à tous.
          </p>
        </div>
      </div>
    );
  }

  // Page de programmation
  return (
    <div className="espace">
      <header className="entete">
        <div>
          <h1>CodeAccessible</h1>
          <p>
            Bienvenue, {prenom} {nom} !
          </p>
        </div>

        <button
          className="bouton-secondaire"
          onClick={() => {
            setIdentifie(false);
            setMessage("");
          }}
        >
          Retour
        </button>
      </header>

      <main className="contenu">
        <section className="exercice">
          <h2>Exercice 1 : multiplication de matrices</h2>

          <p>
            Écris un programme en langage C qui calcule le produit
            de deux matrices A et B de taille 2 × 2.
          </p>

          <h3>Matrice A</h3>
          <div className="matrice">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
          </div>

          <h3>Matrice B</h3>
          <div className="matrice">
            <span>5</span>
            <span>6</span>
            <span>7</span>
            <span>8</span>
          </div>

          <h3>Consignes</h3>
          <ul>
            <li>Déclare les deux matrices A et B.</li>
            <li>Crée une matrice C pour stocker le résultat.</li>
            <li>Utilise des boucles pour calculer le produit.</li>
            <li>Affiche les éléments de la matrice C.</li>
          </ul>

          <p>
            <strong>Objectif pédagogique :</strong> réaliser l'exercice
            par toi-même. Tu recevras un retour après la vérification.
          </p>
        </section>

        <section className="editeur">
          <h2>Ton code C</h2>

          <p className="aide">
            La zone est vide. Écris ton programme ci-dessous.
          </p>

          <textarea
            aria-label="Éditeur de code C"
            spellCheck={false}
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setMessage("");
            }}
            placeholder="Écris ton programme C ici..."
          />

          <button onClick={verifier}>
            Vérifier mon code
          </button>

          {message && (
            <div className="retour" role="status">
              <h3>Retour pédagogique</h3>
              <p>{message}</p>
            </div>
          )}

          <button
            className="bouton-secondaire"
            onClick={() => {
              setCode("");
              setMessage("");
            }}
          >
            Effacer mon code
          </button>
        </section>
      </main>
    </div>
  );
}

export default App;
