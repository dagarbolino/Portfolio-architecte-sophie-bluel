const url = "http://localhost:5678/api/";

const URL_WORKS = url + "works";

const getWorks = async () => {
  try {
    const response = await fetch(URL_WORKS);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Erreur lors de la récupération des données');
  }
};

const galleryElement = document.getElementById("gallery");

const updateContent = async (category) => {
  try {
    const worksData = await getWorks();
    let filteredCategories;
    
    if (category === 'all') {
      filteredCategories = worksData;
    } else {
      filteredCategories = worksData.filter(work => work.categoryId === getCategoryID(category));
    }

    clearGallery();
    appendToGallery(filteredCategories);
  } catch (error) {
    console.log(error);
  }
};

const getCategoryID = (category) => {
  switch (category) {
    case "objets":
      return 1;
    case "appartements":
      return 2;
    case "hotels-restos":
      return 3;
    default:
      return -1;
  }
};

const clearGallery = () => {
  galleryElement.innerHTML = '';
};

const appendToGallery = (works) => {
  for (let i = 0; i < works.length; i++) {
    const card = works[i];
    const figure = document.createElement("figure");
    const imageElement = document.createElement("img");
    imageElement.src = card.imageUrl ?? "aucune image pour le moment";
    const titleElement = document.createElement("figcaption");
    titleElement.innerText = card.title ?? "aucun titre pour le moment";

    figure.appendChild(imageElement);
    figure.appendChild(titleElement);
    galleryElement.appendChild(figure);
  }
};

// Appel initial pour afficher le contenu "all" au chargement de la page
document.addEventListener('DOMContentLoaded', async () => {
  await updateContent('all');
});

const buttons = document.querySelectorAll(".btn");

buttons.forEach(button => {
  button.addEventListener("click", async (event) => {
    const category = event.target.getAttribute("data-category");
    await updateContent(category);
  });
});

const boutonAll = document.querySelector(".btn[data-category='all']");

boutonAll.addEventListener("click", async () => {
  try {
    await updateContent('all');
  } catch (error) {
    console.log(error);
  }
});

const buttonsContainer = document.querySelector(".buttons");

buttonsContainer.addEventListener("click", (event) => {
  const targetButton = event.target.closest(".btn");

  if (targetButton) {
    const currentActiveButton = buttonsContainer.querySelector(".btn.active");

    if (currentActiveButton) {
      currentActiveButton.classList.remove("active");
    }

    targetButton.classList.add("active");
  }
});


/**
 * 
const getWorks = async () => {
  try {
    const response = await fetch(url + "works");
    const data = await response.json();
    return data; // Retourne les données récupérées
  } catch (error) {
    console.log(error);
    throw new Error('Erreur lors de la récupération des données');
  }
};

const galleryElement = document.getElementById("gallery");

const updateContent = async (category) => {
  try {
    const worksData = await getWorks(); // Attend les données des travaux
    const filteredCategories = worksData.filter(function (work) {
      return work.categoryId === getCategoryID(category);
    });

    console.log(filteredCategories); // Affiche les travaux filtrés dans la console

    // Vider le contenu existant
    galleryElement.innerHTML = '';

    // Ajouter le nouveau contenu
    for (let i = 0; i < filteredCategories.length; i++) {
      const card = filteredCategories[i];
      const figure = document.createElement("figure");
      const imageElement = document.createElement("img");
      imageElement.src = card.imageUrl ?? "aucune image pour le moment";
      const titleElement = document.createElement("figcaption");
      titleElement.innerText = card.title ?? "aucun titre pour le moment";

      figure.appendChild(imageElement);
      figure.appendChild(titleElement);
      galleryElement.appendChild(figure);
    }
  } catch (error) {
    console.log(error); // Affiche les erreurs dans la console
  }
};

const getCategoryID = (category) => {
  switch (category) {
    case "objets":
      return 1;
    case "appartements":
      return 2;
    case "hotels-restos":
      return 3;
    default:
      return -1; // Retourne -1 pour une catégorie inconnue
  }
};

const buttons = document.querySelectorAll(".btn");

buttons.forEach(button => {
  button.addEventListener("click", async (event) => {
    const category = event.target.getAttribute("data-category");
    await updateContent(category);
  });
});

const boutonAll = document.querySelector(".btn[data-category='all']");

boutonAll.addEventListener("click", async function () {
  try {
    const worksData = await getWorks(); // Attend les données des travaux
    const allWorks = worksData.filter(function (work) {
      return true; // Retourne tous les travaux
    });

    console.log(allWorks); // Affiche tous les travaux dans la console

    // Vider le contenu existant
    galleryElement.innerHTML = '';

    // Ajouter le nouveau contenu
    for (let i = 0; i < allWorks.length; i++) {
      const card = allWorks[i];
      const figure = document.createElement("figure");
      const imageElement = document.createElement("img");
      imageElement.src = card.imageUrl ?? "aucune image pour le moment";
      const titleElement = document.createElement("figcaption");
      titleElement.innerText = card.title ?? "aucun titre pour le moment";

      figure.appendChild(imageElement);
      figure.appendChild(titleElement);
      galleryElement.appendChild(figure);
    }
  } catch (error) {
    console.log(error); // Affiche les erreurs dans la console
  }
});


const buttonss = document.getElementsByClassName("buttons")[0].getElementsByClassName("btn");

for (let i = 0; i < buttonss.length; i++) {
  buttonss[i].addEventListener("click", function() {
    let current = document.getElementsByClassName("active");

    if (current.length > 0) {
      current[0].className = current[0].className.replace(" active", "");
    }

    this.className += " active";
  });
}



 */
