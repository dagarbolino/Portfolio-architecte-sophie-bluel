const url = "http://localhost:5678/api/";
const URL_WORKS = url + "works";
const URL_LOGIN = url + "users/login";
const URL_USERS = url + "users";
const URL_CATEGORY = url + "categories";
const galleryElement = document.getElementById("gallery");
const modalAjoutElement = document.getElementById("btnModalAjout");
const btnModalAjout = document.querySelector(".btnModalAjout");

const boutonAll = document.querySelector(".btn[data-category='all']");
const boutonObjets = document.querySelector(".btn[data-category='objets']");
const boutonAppart = document.querySelector(".btn[data-category='appartements']");
const boutonHotelResto = document.querySelector(".btn[data-category='hotels-restos']");

const modeEdit = document.querySelector(".modeEdit");
const loginbtn = document.querySelector(".login");
const modeEditElement = document.getElementById("modeEdit");
const elementButtons = document.getElementById("elementButtons");
const myBtnModal = document.getElementById("myBtn");
const btn = document.getElementById("myBtn");
const btnOpenModal = document.getElementById("myBtn");
const categoryMap = { "": 0, "Objets": 1, "Appartements": 2, "Hôtels & Restaurants": 3 };
let modalStep = 0;

// class Works 
class Works {
  constructor(jsonWorks) {
    jsonWorks && Object.assign(this, jsonWorks);
    // methode qui permet de copier les propriétés d'un objet source vers un objet cible
  }
}

// Fonction de déconnexion
const logout = () => {
  sessionStorage.removeItem("token");
  window.location.href = "index.html";
  loginbtn.innerHTML = "login";
};

// Fonction de vérification du token
const checkToken = () => {
  if (sessionStorage.getItem("token") != null) {
    loginbtn.innerHTML = "Logout";

    loginbtn.addEventListener("click", () => {
      logout();
    });
  } else {
    loginbtn.innerHTML = "login";
    loginbtn.addEventListener("click", () => {
      window.location.href = "login.html";
    });
  }
};
checkToken();

// Création d'un élément HTML
function createElement(tag, className, textContent) {
  const element = document.createElement(tag);
  if (className) element.classList.add(className);
  if (textContent) element.textContent = textContent;
  return element;
}
//vérifie si l'utilisateur est connecté en vérifiant la présence d'un token dans la session.
document.addEventListener("DOMContentLoaded", function () {
  const token = sessionStorage.getItem("token");// stock le token dans une variable
  if (token) {
    console.log("L'utilisateur est connecté !");
    elementButtons.remove();
  } else {
    console.log("L'utilisateur est déconnecté !!!");
    modeEditElement.remove("conected");
    myBtnModal.remove();
  }
});






//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//fonction qui récupère les données de l'API
async function getWorks() {
  const response = await fetch(URL_WORKS);
  return await response.json();

}
getWorks();

// affichage des données de l'API dans le DOM
async function displayWorks() {
  const works = await getWorks();
  works.forEach((fiche) => {
    createFiche(fiche); // appel de la fonction createFiche
  });
}
displayWorks();

function createFiche(fiche) {
  const figure = createElement("figure", "works__item");
  const img = createElement("img", "img");
  const figcaption = createElement("figcaption", "works__figcaption");
  img.src = fiche.imageUrl;
  img.alt = fiche.title;
  figcaption.textContent = fiche.title;
  figure.appendChild(img);
  figure.appendChild(figcaption);
  galleryElement.appendChild(figure);
}
//*********************Affichage des boutons par catégories************************************** */

//fonction pour récupérer les catégories de l'API
async function getCategory() {
  const response = await fetch(URL_CATEGORY);
  //console.log(await response.json());
  return await response.json();
}

//fonction pour afficher les catégories dans le DOM
async function displayCategoryButtons() {
  const categories = await getCategory();
  console.log(categories);
  categories.forEach((category) => {
    const button = createElement("button", "btn");
    button.textContent = category.name;
    button.id = category.id;
    elementButtons.appendChild(button);
  });
}
displayCategoryButtons();

//filtrer les données par catégories au clic sur les boutons
async function filterByCategory() {
  const works = await getWorks();
  console.log(works);
  const buttons = document.querySelectorAll(".btn");
  console.log(buttons.length);

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      
     
      galleryElement.innerHTML = "";
      works.forEach((fiche) => {
        if (fiche.categoryId === categoryMap[button.textContent]) {
          createFiche(fiche);
        }
        if (button.textContent === "Tous") {
          createFiche(fiche);
        }
      });
    });
  });
}
filterByCategory();

/********************Affichege de la modale******************************** */

const modals = document.querySelector(".modals");
const closeBtnModale = document.querySelector(".close-btn");

myBtnModal.addEventListener("click", () => {
  openModal()
});

closeBtnModale.addEventListener("click", () => {
  modals.style.display = "none";
});

modals.addEventListener("click", (e) => {
  if (e.target.classList.contains("modals")) {
    modals.style.display = "none";
  }
}); 

const modalContainer = document.querySelector(".modalContainer");

async function displayWorksModal() {
  galleryModale.innerHTML = "";
  const works = await getWorks();
  works.forEach((fiche) => {
    const figure = createElement("figure", "worksItemModal");
    const img = createElement("img", "img");
    const spanTrash = createElement("span");
    spanTrash.classList.add("spanTrashh");
    const trash = createElement("i");
    trash.classList.add("fas", "fa-trash-can");
    trash.id = fiche.id;
    img.src = fiche.imageUrl;
   
    img.alt = fiche.title;
    spanTrash.appendChild(trash);

    figure.appendChild(img);
    figure.appendChild(spanTrash);



    galleryModale.appendChild(figure);

    
  });
  deleteFiche();



}
displayWorksModal();

// fonction de rapel pur afficher la modale
async function openModal() {
  modals.style.display = "flex";
}


// suppression d'une fiche au clic sur la poubelle
async function deleteFiche() {
const trashAll = document.querySelectorAll(".fa-trash-can");
trashAll.forEach((trash) => {
  trash.addEventListener("click", (e) => {
    const id = trash.id
    console.log(id, "helloooooo");
    const init = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    fetch(URL_WORKS + "/" + id, init)
      .then((res) => {
        if (!res.ok) {
       console.log("le delete n'a pas fonctionné");
        }
        return res.json();
      })
      .then((data) => {
        console.log("le delete à fonctioné, voici la data: ", data);
        displayWorksModal();
        displayWorks();
      }
      );
  }
  );
}
);

}
deleteFiche();






//*********************Affichage de la modale d'ajout************************************** */
