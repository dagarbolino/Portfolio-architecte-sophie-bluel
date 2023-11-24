

const url = "http://localhost:5678/api/";
const URL_WORKS = url + "works";
const URL_LOGIN = url + "users/login";


const galleryyElement = document.getElementById("gallery");
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


// Function Logout
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



class Works {
  constructor(jsonWorks) {
    jsonWorks && Object.assign(this, jsonWorks);
  }
}




function fetchAndDisplay(categoryId) {
  //const tokensss = localStorage.getItem("token");
  const token = sessionStorage.getItem("token");

  console.log(token);
  //console.log(tokensss);

  if (!token) {
    console.error("Token manquant. L'utilisateur n'est peut-être pas connecté.");
    return;
  }

  fetch(URL_WORKS)
    .then((data) => data.json())
    .then((jsonListWorks) => {
      //console.log(jsonListWorks);
      const token = sessionStorage.getItem("token");

      if (!token) {
        console.error("Token manquant. L'utilisateur n'est peut-être pas connecté.");
        return;
      }

      let filteredWorks;
      if (categoryId === "all") {
        filteredWorks = jsonListWorks;
      } else {
        filteredWorks = jsonListWorks.filter(work => work.category.id === categoryId);
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



document.addEventListener('DOMContentLoaded', async () => {
  document.getElementById("gallery").innerHTML = "";
  fetchAndDisplay("all");
});

boutonAll.addEventListener("click", async () => {
  document.getElementById("gallery").innerHTML = ""; // Efface le contenu
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



//galleryModale

function fetchForModal() {
  const token = sessionStorage.getItem("token");
  if (!token) {
    console.error("Token manquant. L'utilisateur n'est peut-être pas connecté.");
    return;
  }
  document.getElementById("galleryModale").innerHTML = "";

  fetch(URL_WORKS)
    .then((data) => data.json())
    .then((jsonListWorks) => {
      for (let jsonWorks of jsonListWorks) {
        let works = new Works(jsonWorks);

        let figureModals = document.createElement("div");
        figureModals.className = "figureModale";

        let idElement = document.createElement("p");
        idElement.textContent = works.id;

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
            console.error("Erreur lors de la suppression de l'œuvre : ", error.message);
          }
        });

        iconSpan.appendChild(trashIcon);
        figureModals.appendChild(iconSpan);
        figureModals.appendChild(imageElement);
        figureModals.appendChild(idElement);

        document.getElementById("galleryModale").appendChild(figureModals);
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des articles : " + error);
    });
}







  function fetchForPhoto() {

    const token = sessionStorage.getItem("token");
    if (!token) {
      console.error("Token manquant. L'utilisateur n'est peut-être pas connecté.");
      return;
    }
    //  je construit ma page .....

    const modalH2 = document.querySelector(".modal-content h2");
    modalH2.innerHTML = `
  <h2>Ajout photo</h2>
  `;

    document.getElementById("galleryModale").innerHTML = ``;

    const modalLine = document.querySelector(".modal-content .line");
    modalLine.className = "hide";

    const modalAjoutBtn = document.querySelector(".deleteBtnAjoutModal");
    modalAjoutBtn.innerHTML = ``;

    const spanAddPhoto = document.createElement("span");
    spanAddPhoto.className = "back";
    spanAddPhoto.innerHTML = `&#129104;`

  


    // Formulaire

    const form = document.createElement("form");
    form.action = "#";
    form.method = "post";
    form.enctype = "multipart/form-data";
    form.id = "photoForm";

    // Ajoute le contenu du formulaire
    const addImgModaleDiv = document.createElement("div");
    addImgModaleDiv.className = "addImgModale";

    const label = document.createElement("label");
    label.for = "photo";
    label.className = "custom-file-input";
    label.innerHTML = '<i class="fa-solid fa-image"></i>';

    // Bouton ajouter une photo
    const fileButton = document.createElement("button");
    fileButton.type = "button";
    fileButton.textContent = "Ajouter une photo";

    // Elément de fichier
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.name = "photo";
    fileInput.id = "photo";
    fileInput.accept = "image/*";
    fileInput.style.display = "none";

    const p = document.createElement("p");
    p.textContent = "jpg, png : 4mo max";

    addImgModaleDiv.appendChild(label);
    addImgModaleDiv.appendChild(fileButton);
    addImgModaleDiv.appendChild(p);

    

    const labelTitle = document.createElement("label");
    labelTitle.for = "title";
    labelTitle.textContent = "Titre";

    const inputTitle = document.createElement("input");
    inputTitle.type = "text";
    inputTitle.name = "title";
    inputTitle.id = "title";

    const labelCategories = document.createElement("label");
    labelCategories.for = "categories";
    labelCategories.textContent = "Catégories";

    const selectCategories = document.createElement("select");
    selectCategories.name = "categories";
    selectCategories.id = "categories";

    const optionDefault = document.createElement("option");
    selectCategories.appendChild(optionDefault);

    const optionObjets = document.createElement("option");
    optionObjets.value = "objets";
    optionObjets.textContent = "Objets";
    selectCategories.appendChild(optionObjets);

    const optionAppartements = document.createElement("option");
    optionAppartements.value = "appartements";
    optionAppartements.textContent = "Appartements";
    selectCategories.appendChild(optionAppartements);

    const optionHotelsRestos = document.createElement("option");
    optionHotelsRestos.value = "hotels-restos";
    optionHotelsRestos.textContent = "Hôtels & restaurants";
    selectCategories.appendChild(optionHotelsRestos);

    const submitBtn = document.createElement("input");
    submitBtn.type = "submit";
    submitBtn.value = "Valider";

    form.appendChild(addImgModaleDiv);
    form.appendChild(labelTitle);
    form.appendChild(inputTitle);
    form.appendChild(labelCategories);
    form.appendChild(selectCategories);
    form.appendChild(submitBtn);

    const divForm = document.createElement("div");
    divForm.className = "divFormAdd";
    divForm.appendChild(form);

    modalAjoutBtn.appendChild(spanAddPhoto);
    modalAjoutBtn.appendChild(divForm);

  

    modalAjoutBtn.appendChild(spanAddPhoto);


    fileButton.addEventListener("click", function () {
      fileInput.click();
    });

    addImgModaleDiv.appendChild(fileButton);
    addImgModaleDiv.appendChild(fileInput);


    const formAddWorkModal = document.createElement("div");
    formAddWorkModal.appendChild(divForm);

    document.querySelector(".modal-content").appendChild(formAddWorkModal);
    document.querySelector(".spanModal").appendChild(spanAddPhoto);


    
    // faire mon appel fetch

    const addWork = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("Token manquant. L'utilisateur n'est peut-être pas connecté.");
        return;
      }
    /**----------- */

    const form = document.querySelector(".divFormAdd form");
    const formData = new FormData(form);
    
    try {
      const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {

          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      console.log(formData);
      //console.log(formData(JSON.stringify));
      console.log(response);

      } catch (error) {
        console.error("Erreur lors de l'ajout de l'œuvre : ", error.message);
        throw error; 
      }
      
    };


     /**----------- */
    const photoForm = document.querySelector(".divFormAdd form"); 
    
    if (photoForm) {
      photoForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        try {
          const response = await addWork();
          console.log(response);

    //console.log(formData);

        } catch (error) {
          console.error("Erreur lors de l'ajout de l'œuvre : ", error.message);
        }
      });
    } else {
      console.error("L'élément avec l'id 'photoForm' n'a pas été trouvé.");
    }

  };








  

  /**{
    "id": 0,
    "title": "string",
    "imageUrl": "string",
    "categoryId": "string",
    "userId": 0
  } */










// Delete work

const deleteWork = async (id) => {

  const token = sessionStorage.getItem("token");
  console.log(token);
  if (!token) {
    console.error("Token manquant. L'utilisateur n'est peut-être pas connecté.");
    return;
  }

  const response = await fetch(`${url}works/${id}`, {
    method: "DELETE",
    headers: {
      'Accept': '*/*',
      'Authorization': `Bearer ${token}`,
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
      console.error("Erreur lors de la suppression de l'œuvre : ", error.message);
    }
  });
}


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


const modal = document.getElementById("myModal");

const btn = document.getElementById("myBtn");
const btnAjoutPhoto = document.querySelector(".btnModalAjout");

const span = document.getElementsByClassName("close")[0];

btnAjoutPhoto.onclick = function () {
  modal.style.display = "block";
  fetchForPhoto();
}

btn.onclick = function () {
  modal.style.display = "block";
  fetchForModal();
}

span.onclick = function () {
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}








//  S0phie


