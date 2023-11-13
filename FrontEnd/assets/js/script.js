























/**const url = "http://localhost:5678/api/";

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



var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
 */