

const url = "http://localhost:5678/api/";
const URL_WORKS = url + "works";
const URL_LOGIN = url + "users/login";


const galleryyElement = document.getElementById("gallery");
const modalAjoutElement = document.getElementById("btnModalAjout");



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
  const tokensss = localStorage.getItem("token");
  const token = sessionStorage.getItem("token");
  
  console.log(token);
  console.log(tokensss);
  

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
const span = document.getElementsByClassName("close")[0];

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




