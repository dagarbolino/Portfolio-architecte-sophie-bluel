const url = "http://localhost:5678/api/";
const URL_WORKS = url + "works";
const URL_LOGIN = url + "users/login";

//#region Constantes
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
//#endregion

//#region Classes
// class Works 
class Works {
  constructor(jsonWorks) {
    jsonWorks && Object.assign(this, jsonWorks);
  }
}
//#endregion

// overlay for the modal and opacity
const overlay = createElement("div", "overlay");
overlay.id = "overlayId";
document.body.appendChild(overlay);

//#region Fonctions
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

// Page d'accueil de la galerie
function fetchAndDisplay(categoryId) {
  const token = sessionStorage.getItem("token");

  fetch(URL_WORKS)
    .then((data) => data.json())
    .then((jsonListWorks) => {
      let filteredWorks;
      if (categoryId === "all" && boutonAll.classList.contains("active")) {
        filteredWorks = jsonListWorks;
      } else {
        filteredWorks = jsonListWorks.filter(
          (work) => work.category.id === categoryId
        );
        // si btn est clique, on active la couleur du bouton et on desactive les autres
        if (categoryId === boutonAll) { boutonAll.classList.add("active"); }
        if (categoryId === 1) {
          boutonObjets.classList.add("active");
          boutonAll.classList.remove("active");
          boutonAppart.classList.remove("active");
          boutonHotelResto.classList.remove("active");
        } else if (categoryId === 2) {
          boutonAppart.classList.add("active");
          boutonAll.classList.remove("active");
          boutonObjets.classList.remove("active");
          boutonHotelResto.classList.remove("active");
         } 
        else if (categoryId === 3) {
          boutonHotelResto.classList.add("active");
          boutonAll.classList.remove("active");
          boutonObjets.classList.remove("active");
          boutonAppart.classList.remove("active");
        }
        else {
          boutonAll.classList.add("active");
          boutonObjets.classList.remove("active");
          boutonAppart.classList.remove("active");
          boutonHotelResto.classList.remove("active");

           fetchAndDisplay("all");
        }
      }
      for (let jsonWorks of filteredWorks) {
        let works = new Works(jsonWorks);

        let figure = document.createElement("div");
        figure.className = "figure";

        let imageElement = document.createElement("img");
        imageElement.src = works.imageUrl;
        imageElement.alt = works.title;

        let titleElement = document.createElement("p");
        titleElement.textContent = works.title;

        figure.appendChild(imageElement);
        figure.appendChild(titleElement);

        document.getElementById("gallery").appendChild(figure);
      }
})
    .catch((error) => {
      console.error("Erreur lors de la récupération des articles : " + error);
    });
}

// fonction pour appliquer  overlay
function applyOverlay() {
  const overlay = document.getElementById("overlayId");
  overlay.style.opacity = "1";

  const elementMainForMdale = document.getElementById("main");
  elementMainForMdale.style.opacity = "0.5";
  elementMainForMdale.style.transition = "all 0.5s ease-in-out";

  const elementHeaderNav = document.querySelector(".navHeader");
  elementHeaderNav.style.opacity = "0.5";
  elementHeaderNav.style.transition = "all 0.5s ease-in-out";

  const elementH1 = document.querySelector("h1");
  elementH1.style.opacity = "0.5";
  elementH1.style.transition = "all 0.5s ease-in-out";

  const modeEditForMdale = document.getElementById("modeEdit");
  modeEditForMdale.style.opacity = "1";

  const elementFooterForMdale = document.getElementById("footer");
  elementFooterForMdale.style.opacity = "0.5";
  elementFooterForMdale.style.transition = "all 0.5s ease-in-out";
}

// fonction pour supprimer  overlay
function removeOverlay() {
  const overlay = document.getElementById("overlayId");
  overlay.style.display = "none";

  const elementMainForMdale = document.getElementById("main");
  elementMainForMdale.style.opacity = "1";

  const elementHeaderNav = document.querySelector(".navHeader");
  elementHeaderNav.style.opacity = "1";

  const elementH1 = document.querySelector("h1");
  elementH1.style.opacity = "1";

  const elementFooterForMdale = document.getElementById("footer");
  elementFooterForMdale.style.opacity = "1";
}

// Affichage de la modale
function updateModal() {
  const token = sessionStorage.getItem("token");
  if (!token) {
    console.error(
      "Token manquant. L'utilisateur n'est peut-être pas connecté."
    );
    return;
  }
  const existingModal = document.querySelector(".afficheModal");
  if (existingModal) existingModal.remove();

  const modal = createElement("div", "afficheModal");
  modal.id = "afficheModalId";
  const modalContent = createElement("div", "modal-content");

  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  const modalBtn = createElement(
    "button",
    "back-btn",
  );
  const iconArrowLeft = createElement("img", "iconArrowLeft", null);
  iconArrowLeft.src = "assets/icons/arrowLeft.png";
  iconArrowLeft.alt = "Flèche gauche";

  modalBtn.appendChild(iconArrowLeft);
  modalBtn.addEventListener("click", () => {
    modalStep += modalStep === 0 ? 1 : -1;
    updateModal();
  });

  // création du bouton de fermeture de la modale
  const modalClose = createElement("button", "close-btn", null);
  const iconClose = createElement("i", "fas");
  iconClose.classList.add("fa-close");

  // événement sur le bouton de fermeture de la modale
  modalClose.appendChild(iconClose);
  modalClose.addEventListener("click", () => {
    modal.remove();
    removeOverlay();
    modalStep = 0;
  });

  switch (modalStep) {
    case 0:

      modalContent.appendChild(
        createElement("h3", "modal-title", "Galerie photo")
      );
      const galleryModale = createElement("div", "galleryModale");
      galleryModale.id = "galleryModale";
      const elementHr = createElement("hr", "elementHr", null); //ligne de séparation
      const btnModalAjout = createElement("button", "btnModalAjout", null);
      btnModalAjout.id = "btnModalAjout";
      btnModalAjout.textContent = "Ajouter une photo";

      // Evénements pour le clic sur le bouton d'ajout
      btnModalAjout.addEventListener("click", () => {
        modalStep += modalStep === 0 ? 1 : -1;

        updateModal(); //mise a jour de la page apres ajout
      });

      // Ajout de la modale
      modalContent.appendChild(galleryModale);
      modalContent.appendChild(elementHr);
      modalContent.appendChild(btnModalAjout);

      // Récupération des œuvres
      fetch(URL_WORKS)
        .then((data) => data.json())
        .then((jsonListWorks) => {
          for (let jsonWorks of jsonListWorks) {
            let works = new Works(jsonWorks);

            let figureModals = document.createElement("div");
            figureModals.className = "figureModale";

            let imageElement = document.createElement("img");
            imageElement.src = works.imageUrl;
            imageElement.alt = works.title;

            let iconSpan = document.createElement("span");
            iconSpan.className = "iconSpan";

            let trashIcon = document.createElement("i");
            trashIcon.className = "fa-solid fa-trash-can";

            trashIcon.addEventListener("click", async () => { 
              try {
                const response = deleteWork(works.id);
                // Supprime visuellement la figure si la suppression est réussie
                if (response === "Work deleted") {
                  figures[i].remove();
                  console.log("Figure supprimée avec succès");
                }

                else { updateModal() } 
                updatePage();
              } catch (error) {
                console.error(
                  "Erreur lors de la suppression de l'œuvre : ",
                  error.message
                );
              }
            });
            figureModals.appendChild(imageElement);
            iconSpan.appendChild(trashIcon);
            figureModals.appendChild(iconSpan);
            figureModals.appendChild(imageElement);

            document.getElementById("galleryModale").appendChild(figureModals);
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des articles : " + error);
        });

        //mise a jour de la page apres suppression
        function updatePage() {
          document.getElementById("gallery").innerHTML = "";
          fetchAndDisplay("all");
        }
      break;

    // Ajout d'une photo modal 2
    case 1:
      // Ajout du titre de la modale
      modalContent.appendChild(
        createElement("h3", "modal-title", "Ajout photo")
      );

      // Ajout du champ pour l'image
      const modalInputFile = document.createElement("div");
      modalInputFile.className = "modalInputFile";
      modalContent.appendChild(modalInputFile);

      //Ajout d'une icone pour le champ de l'image
      const iconInputFile = document.createElement("i");
      iconInputFile.className = "far fa-image";
      iconInputFile.id = "iconInputFile";
      modalInputFile.appendChild(iconInputFile);

      // Ajout du champ pour l'image
      const fileButton = document.createElement("input");
      fileButton.type = "file";
      fileButton.className = "btnAddClass";
      fileButton.id = "btnAddId";
      fileButton.innerText = "+ Ajouter une photo";
      modalInputFile.appendChild(fileButton);

      // ajout d'un paragraphe pour le texte
      const modalText = document.createElement("p");
      modalText.className = "modalText";
      modalText.innerText = "jpg, png : 4mo max";
      modalInputFile.appendChild(modalText);


      // Ajout du champ pour le titre
      const modalTitreCat = document.createElement("div");
      modalTitreCat.className = "modalTitreCat";
      modalContent.appendChild(modalTitreCat);

      // Ajout du titre pour le titre
      const pTitre = document.createElement("p");
      pTitre.className = "pTitre";
      pTitre.innerText = "Titre";
      modalTitreCat.appendChild(pTitre);

      // Ajout du champ pour le titre
      const inputTitre = document.createElement("input");
      inputTitre.className = "modal-input";
      modalTitreCat.appendChild(inputTitre);

      // Ajout du select pour la catégorie
      const modalCat = document.createElement("div");
      modalCat.className = "modalCat";
      modalContent.appendChild(modalCat);

      // Ajout du champ pour la catégorie
      const pCat = document.createElement("p");
      pCat.className = "pCat";
      pCat.innerText = "Catégorie";
      modalCat.appendChild(pCat);

      // Ajout du champ pour la catégorie
      const modalSelectCategory = createElement("select", "modal-input");
      for (const category in categoryMap) {
        const option = createElement("option");
        option.className = "optionCategory";
        option.value = categoryMap[category];
        option.textContent = category;
        modalSelectCategory.appendChild(option);
      }

      // ajout écouteur d'evenement sur le formulaire
      // si les champs sont remplis, le bouton de validation devient vert
      modalSelectCategory.addEventListener("change", () => {
        if (inputTitre.value && modalSelectCategory.value && modalPreviewImg.value) {
          modalBtnSubmit.style.background = "#1d6154";
        } else {
          modalBtnSubmit.style.background = "#1d6154";
        }
      });

      // Ajout du select pour la catégorie
      modalCat.appendChild(modalSelectCategory);

      //ligne de séparation
      elementHrCase2a = createElement("hr", "elementHr2", null);
      modalContent.appendChild(elementHrCase2a);

      // Bouton d'envoi du formulaire
      const elementSubmit = createElement("div", "elementSubmit");
      modalContent.appendChild(elementSubmit);

      // Bouton d'envoi du formulaire
      const modalBtnSubmit = document.createElement("button");
      modalBtnSubmit.className = "modalBtvValider";
      modalBtnSubmit.innerText = "Valider";

      // Ajout de la modale
      const modalPreview = createElement("div");
      modalPreview.className = "modalPreview";
      modalContent.appendChild(modalPreview);

      // Ajout de l'image de prévisualisation
      const modalPreviewImg = document.createElement("img");
      modalPreviewImg.className = "modalPreviewImg";
      modalPreviewImg.style.display.display = "none";
      modalInputFile.appendChild(modalPreviewImg);

      // Ajout de l'événement de prévisualisation
      fileButton.addEventListener("change", () => {
        const imageInput = document.getElementById("btnAddId");
        const image = imageInput.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = () => {
          modalPreviewImg.src = reader.result;
          iconInputFile.style.display = "none";
          modalText.style.display = "none";
          btnAddId.style.opacity = "0";
          modalPreviewImg.style.display = "block";
        };
      });

      modalBtnSubmit.addEventListener("click", async () => {
        const imageInput = document.getElementById("btnAddId");

        const titleInput = document.querySelector(".modal-input");
        const categoryInput = document.querySelector("select");

        const image = imageInput.files[0];
        console.log(image);

        const title = titleInput.value;
        console.log(title);

        // Prévisualisation de l'image
        const category = categoryInput.value;
        console.log(category);

        let formData = new FormData;

        // Ajout de l'image
        formData.append("image", imageInput.files[0]);
        console.log(imageInput.files[0]);

        // Ajout du titre
        formData.append("title", title);
        console.log(title);

        // Ajout de la catégorie
        formData.append("category", category);
        console.log(category);

        // Envoi du formulaire
        fetch(URL_WORKS, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        })

          .then((response) => response.json())
          .then((json) => {
            console.log(json);
            console.log("L'image a été ajoutée avec succès");
            if (json.status === 401) {
              throw new Error("Unauthorized");
            }
            if (json.status === 200) {
              return "Work added";
            }
           else { updateModal() } //mise a jour de la page apres ajout
          })
          .catch((error) => {
            console.error("Erreur lors de l'ajout de l'image : " + error);
          });
      });

      // Ajout du bouton de validation
      elementSubmit.appendChild(modalBtnSubmit);

      updatePage();  // mise a jour de la page apres ajout

      break;
    }

  // Ajoute le contenu du formulaire
  if (modalStep === 1) {
    modalContent.appendChild(modalBtn);
  }

  modalContent.appendChild(modalClose);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
}

//#endregion

// Suppression d'une œuvre
const deleteWork = async (id) => {
  const token = sessionStorage.getItem("token");
  console.log(token);
  if (!token) {
    console.error(
      "Token manquant. L'utilisateur n'est peut-être pas connecté."
    );
    return;
  }

  const response = await fetch(`${url}works/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    throw new Error("Unauthorized");
  }

  if (response.status === 200) {
    return "Work deleted";
  }
};

let figures = document.getElementsByClassName("figureModale");
for (let i = 0; i < figures.length; i++) {
  figures[i].addEventListener("click", async function () {
    console.log("Figure cliquée :", figures[i]);

    // Récupére l'ID associée à cette figure
    let workId = jsonListWorks[i].id;
    console.log(workId);

    try {
      const response = await deleteWork(workId);
      console.log(response);

      // Supprime visuellement la figure si la suppression est réussie
      if (response === "Work deleted") {
        figures[i].remove();
        console.log("Figure supprimée avec succès");
      }
    } catch (error) {
      console.error(
        "Erreur lors de la suppression de l'œuvre : ",
        error.message
      );
    }
  });
}

//#region Evénements
document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("gallery").innerHTML = "";
  fetchAndDisplay("all");
});

boutonAll.addEventListener("click", async () => {
  document.getElementById("gallery").innerHTML = "";
  fetchAndDisplay("all");
});

boutonObjets.addEventListener("click", async () => {
  document.getElementById("gallery").innerHTML = "";
  fetchAndDisplay(1);
});

boutonAppart.addEventListener("click", async () => {
  document.getElementById("gallery").innerHTML = "";
  fetchAndDisplay(2);
});

boutonHotelResto.addEventListener("click", async () => {
  document.getElementById("gallery").innerHTML = "";
  fetchAndDisplay(3);
});

// Ouverture de la modale événement sur le bouton
btnOpenModal.addEventListener("click", () => {
  updateModal();
  applyOverlay();
});

// évenement sur le DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  const token = sessionStorage.getItem("token");

  if (token) {
    console.log("L'utilisateur est connecté !");
    elementButtons.remove();
  } else {
    console.log("L'utilisateur est déconnecté !!!");
    modeEditElement.remove("conected");
    myBtnModal.remove();
  }
});

//#endregion
