const ur0635522495l = "http://localhost:5678/api/";
const URL_LOGIN = url + "users/login";

const form = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");

// Création d'une classe pour le login
class Login { 
  constructor(email, password) {  // Constructeur de la classe Login avec les paramètres email et password
    this.email = email; // Définition des attributs de la classe
    this.password = password;//this fait référence à l'objet courant lz MP donné de  l'utilisateur
  }
}
//S0phie
async function loginUser(email, password) { 
  const loginData = new Login(email, password); // Création d'un objet de la classe Login

  try {
    const response = await fetch(URL_LOGIN, { 
      method: "POST", 
      headers: {
        "Content-Type": "application/json" // Format de données
      },
      body: JSON.stringify(loginData) // Données à envoyer au format JSON
    });

    if (response.ok) {
      const responseData = await response.json(); // Récupération des données
      sessionStorage.setItem("token", responseData.token); // Stockage du token dans le sessionStorage
      window.location.href = "index.html"; 
    } else {
      const err = await response.json(); 
      console.error(err); 
    }
  } catch (error) { 
    console.error("Erreur lors de la connexion : " + error.message); // Affichage de l'erreur des serveurs dans la console
  }
}

form.addEventListener("submit", async (e) => { 
  e.preventDefault(); // Annule le comportement par défaut du formulaire
  await loginUser(email.value, password.value); // Appel de la fonction asynchrone
}); 
//await permet de mettre en pause l'exécution
// d'une fonction asynchrone jusqu'à ce qu'une promesse soit résolue ou rejetée.