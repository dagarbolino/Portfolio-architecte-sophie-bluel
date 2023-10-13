const url = "http://localhost:5678/api/";

const getWorks = async () => {
  try {
    const response = await fetch(url + "works");
    const data = await response.json();
    //console.table(data);
    return data; // Retourne les données récupérées
  } catch (error) {
    console.log(error);
    throw new Error('Erreur lors de la récupération des données');
  }
};

/**********************Bouton de toutes la liste********************************/
const boutonAll = document.querySelector(".btnTous");
boutonAll.addEventListener("click", async function () {
  try {
    const worksData = await getWorks(); // Attend les données des travaux
    const filteredCategoriesAll = worksData.filter(function (work) {
      return work.categoryId === 1 || work.categoryId === 2 || work.categoryId === 3;
    });
    console.log(filteredCategoriesAll); // Affiche tous les travaux dans la console

    const boutonAllElement = document.querySelector(".btnTous"); // Utilise le bouton "Tous"
    for (let i = 0; i < filteredCategoriesAll.length; i++) {
      const card = filteredCategoriesAll[i];
      const figure = document.createElement("figure");
      const imageElement = document.createElement("img");
      imageElement.src = card.imageUrl ?? "aucune image pour le moment";
      const titleElement = document.createElement("p");
      titleElement.innerText = card.title ?? "aucun titre pour le moment";

      boutonAllElement.appendChild(figure); //Utilise le bouton "Tous"

      figure.appendChild(imageElement);
      figure.appendChild(titleElement);
    }
  } catch (error) {
    console.log(error); // Affiche les erreurs dans la console
  }
});

/***************************Bouton liste des objets********************************/
const boutonObjets = document.querySelector(".btnObjets");
boutonObjets.addEventListener("click", async function () {
  try {
    const worksData = await getWorks(); // Les données des Objets
    const filteredCategoriesObjets = worksData.filter(function (work) {
      return work.categoryId === 1; // Filtre les Objets par categoryId 
    });
    console.log(filteredCategoriesObjets); // Affiche les travaux filtrés Objets
    const boutonObjetsElement = document.querySelector(".btnObjets"); // Utilise le bouton "Objets"
    for (let i = 0; i < filteredCategoriesObjets.length; i++) {
      const card = filteredCategoriesObjets[i];
      const figure = document.createElement("figure");
      const imageElement = document.createElement("img");
      imageElement.src = card.imageUrl ?? "aucune image pour le moment";
      const titleElement = document.createElement("p");
      titleElement.innerText = card.title ?? "aucun titre pour le moment";

      boutonObjetsElement.appendChild(figure); // Utiliser le bouton "Objets"

      figure.appendChild(imageElement);
      figure.appendChild(titleElement);
    }
  } catch (error) {
    console.log(error); // Affiche les erreurs dans la console
  }
});

/***************************Bouton liste des Appartements*********************************/

const boutonAppartements = document.querySelector(".btnAppartements");
boutonAppartements.addEventListener("click", async function () {
  try {
    const worksData = await getWorks(); // Les données des Appartement
    const filteredCategoriesApparts = worksData.filter(function (work) {
      return work.categoryId === 2; // Filtre les Appartement par categoryId 
    });
    console.log(filteredCategoriesApparts); // Affiche les travaux filtrés Appartement
    const boutonObjetsElement = document.querySelector(".btnAppartements"); // Utilise le bouton "Objets"
    for (let i = 0; i < filteredCategoriesApparts.length; i++) {
      const card = filteredCategoriesApparts[i];
      const figure = document.createElement("figure");
      const imageElement = document.createElement("img");
      imageElement.src = card.imageUrl ?? "aucune image pour le moment";
      const titleElement = document.createElement("p");
      titleElement.innerText = card.title ?? "aucun titre pour le moment";

      boutonObjetsElement.appendChild(figure); // Utilise le bouton "Objets"

      figure.appendChild(imageElement);
      figure.appendChild(titleElement);
    }
  } catch (error) {
    console.log(error); // Affiche les erreurs dans la console
  }
});

/************************Bouton de la liste des Hôtels et des restaurants **********************/

const boutonHotelsRestos = document.querySelector(".btnHotelsRestos");
boutonHotelsRestos.addEventListener("click", async function () {
  try {
    const worksData = await getWorks(); // Les données des Hotel&resto
    const filteredCategoriesHotelsResto = worksData.filter(function (work) {
      return work.categoryId === 3; // Filtre les Hotel&resto par categoryId 
    });
    console.log(filteredCategoriesHotelsResto); // Affiche les travaux filtrés Hotel&resto
    const boutonObjetsElement = document.querySelector(".btnHotelsRestos"); // Utilise le bouton "Objets"
    for (let i = 0; i < filteredCategoriesHotelsResto.length; i++) {
      const card = filteredCategoriesHotelsResto[i];
      const figure = document.createElement("figure");
      const imageElement = document.createElement("img");
      imageElement.src = card.imageUrl ?? "aucune image pour le moment";
      const titleElement = document.createElement("p");
      titleElement.innerText = card.title ?? "aucun titre pour le moment";

      boutonObjetsElement.appendChild(figure); // Utilise le bouton "Objets"

      figure.appendChild(imageElement);
      figure.appendChild(titleElement);
    }
  } catch (error) {
    console.log(error); // Affiche les erreurs dans la console
  }
});
