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
const elementBtnModify = document.getElementById("elementBtnModify");

const elementButtons = document.getElementById("elementButtons");
const elementmodalContainer = document.getElementById("modalContainer");

const galleryModale = document.getElementById("galleryModale");

const myBtnModal = document.getElementById("myBtn");

const btn = document.getElementById("myBtn");
const btnAjoutPhoto = document.querySelector(".btnModalAjout");

const span = document.querySelector(".spanModal");

const btnModal2CloseClick = document.querySelector(".spansModal2");
//#endregion

class Works {
  constructor(jsonWorks) {
    jsonWorks && Object.assign(this, jsonWorks);
  }
}

// Fonction de déconnexion
const logout = () => {
  sessionStorage.removeItem("token");
  window.location.href = "index.html";
  loginbtn.innerHTML = "login";
};

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

// Page d'accueil de la galerie
function fetchAndDisplay(categoryId) {
  const token = sessionStorage.getItem("token");
  console.log(token);

  fetch(URL_WORKS)
    .then((data) => data.json())
    .then((jsonListWorks) => {
      let filteredWorks;
      if (categoryId === "all") {
        filteredWorks = jsonListWorks;
      } else {
        filteredWorks = jsonListWorks.filter(
          (work) => work.category.id === categoryId
        );
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








const btnOpenModal = document.getElementById("openModal");
let modalStep = 0;
const categoryMap = { objets: 1, appartements: 2, hotelsrestos: 3 };

btnOpenModal.addEventListener("click", () => {
  updateModal();
});

  // Création d'un élément HTML
function createElement(tag, className, textContent) {
  const element = document.createElement(tag);
  if (className) element.classList.add(className);
  if (textContent) element.textContent = textContent;
  return element;
}


// Affichage de la modale
function updateModal() {
  const existingModal = document.querySelector(".afficheModal");
  if (existingModal) existingModal.remove();

  const modal = createElement("div", "afficheModal");
  const modalContent = createElement("div", "modal-content");

  const modalBtn = createElement(
    "button",
    modalStep === 0 ? "next-btn" : "previous-btn",
    modalStep === 0 ? "Next" : "Previous"
  );

  modalBtn.addEventListener("click", () => {
    modalStep += modalStep === 0 ? 1 : -1;
    updateModal();
  });

  const modalClose = createElement("button", "close-btn", null);
  const iconClose = createElement("i", "fas");
  iconClose.classList.add("fa-close");


  modalClose.appendChild(iconClose);

  modalClose.addEventListener("click", () => {
    modal.remove();
    modalStep = 0;
  });

  switch (modalStep) {
    case 0:

    modalContent.appendChild(
      createElement("h3", "modal-title", "Galerie photo")
    );
    modalContent.appendChild(createElement("div", "figureModale"));

    modalContent.querySelector(".figureModale").appendChild(createElement("img", "imageElement", null)).src = "./assets/images/appartement-paris-v.png";
    const imageElement = modalContent.querySelector(".imageElement");

    imageElement.style.width = "60px";
    imageElement.style.height = "80px";

    modalContent.querySelector(".figureModale").appendChild(createElement("span", "iconSpan", null));

    const trashIcon = createElement("i", "fas");
    trashIcon.classList.add("fa-trash");

    modalContent.querySelector(".iconSpan").appendChild(trashIcon);
      


   
    fetch(URL_WORKS)
    .then((data) => data.json())
    .then((jsonListWorks) => {
      for (let jsonWorks of jsonListWorks) {
        let works = new Works(jsonWorks);

        let figureModals = document.createElement("div");
        figureModals.className = "figureModale";

        let imageElement = document.createElement("img");
        imageElement.src = works.imageUrl;

        let iconSpan = document.createElement("span");
        iconSpan.className = "iconSpan";

        let trashIcon = document.createElement("i");
        trashIcon.className = "fa-solid fa-trash-can";

        // Evénements pour le clic sur l'icône de la corbeille
        trashIcon.addEventListener("click", async () => {
          try {
            const response = await deleteWork(works.id);
            console.log(response);

            if (response === "Work deleted") {
              figureModals.remove();
              console.log("Figure supprimée avec succès");
            }
          } catch (error) {
            console.error(
              "Erreur lors de la suppression de l'œuvre : ",
              error.message
            );
          }
        });
      
      /**
       * Fetches data for the modal.
       */

/**    
 *   function fetchForModal() {
        const token = sessionStorage.getItem("token");
        if (!token) {
          console.error(
            "Token manquant. L'utilisateur n'est peut-être pas connecté."
          );
          return;
        }

        modalContent.appendChild(
          createElement("h3", "modal-title", "Galerie photo")
        );
        modalContent.appendChild(createElement("div", "figureModale"));

        modalContent.appendChild(createElement("div", "galleryModale"));

        document.querySelector(".galleryModale").innerHTML = "";
      
        fetch(URL_WORKS)
          .then((data) => data.json())
          .then((jsonListWorks) => {
            for (let jsonWorks of jsonListWorks) {
              let works = new Works(jsonWorks);
      
              let figureModals = document.createElement("div");
              figureModals.className = "figureModale";
      
              let imageElement = document.createElement("img");
              imageElement.src = works.imageUrl;
      
              let iconSpan = document.createElement("span");
              iconSpan.className = "iconSpan";
      
              let trashIcon = document.createElement("i");
              trashIcon.className = "fa-solid fa-trash-can";
      
              // Evénements pour le clic sur l'icône de la corbeille
              trashIcon.addEventListener("click", async () => {
                try {
                  const response = await deleteWork(works.id);
                  console.log(response);
      
                  if (response === "Work deleted") {
                    figureModals.remove();
                    console.log("Figure supprimée avec succès");
                  }
                } catch (error) {
                  console.error(
                    "Erreur lors de la suppression de l'œuvre : ",
                    error.message
                  );
                }
              });
              iconSpan.appendChild(trashIcon);
              figureModals.appendChild(iconSpan);
              figureModals.appendChild(imageElement);
      
              document.querySelector(".spanModal").innerHTML = "";
              const spanModal = document.querySelector(".spanModal").innerHTML = `&times`;
              spanModal.className = "spanModal";
      
              document.getElementById("galleryModale").appendChild(figureModals);
            }
          })
          .catch((error) => {
            console.error("Erreur lors de la récupération des articles : " + error);
          });
      }

 */


/**
      let figureModals = document.createElement("div");
      figureModals.className = "figureModale";

      let imageElement = document.createElement("img");
      imageElement.src = works.imageUrl;

      let iconSpan = document.createElement("span");
      iconSpan.className = "iconSpan";

      let trashIcon = document.createElement("i");
      trashIcon.className = "fa-solid fa-trash-can"; */









    }

    });


      break;

    case 1:
      modalContent.appendChild(
        createElement("input", "modal-input", null)
      ).type = "file";
      modalContent.appendChild(
        createElement("input", "modal-input", null)
      ).placeholder = "Title";
      const modalSelectCategory = createElement("select", "modal-input");
      for (const category in categoryMap) {
        const option = createElement("option");
        option.value = categoryMap[category];
        option.textContent = category;
        modalSelectCategory.appendChild(option);
      }
      modalContent.appendChild(modalSelectCategory);
      break;

    default:
      break;
  }

  modalContent.appendChild(modalBtn);
  modalContent.appendChild(modalClose);

  modal.appendChild(modalContent);
  document.body.appendChild(modal);
}







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

  return data;
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
//S0phie
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




/**
const btnFetchForDelete = document.getElementById("openModal")

btnFetchForDelete.onclick = function () {
 // modal.style.display = "block";
 fetchForModal();
};


 */





//  S0phie