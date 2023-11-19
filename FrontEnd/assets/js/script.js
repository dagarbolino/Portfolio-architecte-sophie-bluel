


const url = "http://localhost:5678/api/";
const URL_WORKS = url + ("works")
const URL_CATEGORY = url + ("categories");
const URL_LOGIN = url + ("users/login");

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
  fetch(URL_WORKS)
    .then((data) => data.json())
    .then((jsonListWorks) => {
      //console.log(jsonListWorks);
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

// function pour ajouter ou suprimer des élément de la page index.html
// si l'on est connecté ou non
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




//galleryModale

function fetchForModal() {
  // Efface le contenu de la galerie avant d'ajouter de nouveaux éléments
  document.getElementById("galleryModale").innerHTML = "";
  fetch(URL_WORKS)
    .then((data) => data.json())
    .then((jsonListWorks) => {
      //console.log(jsonListWorks);

      for (let jsonWorks of jsonListWorks) {
        let works = new Works(jsonWorks);

        let figure = document.createElement("div");
        figure.className = "figure";

        let imageElement = document.createElement("img");
        imageElement.src = works.imageUrl;

        let iconSpan = document.createElement("span");


        let iconTrash = document.createElement("i");
        iconTrash.className = "fa-regular fa-trash-can";


        figure.appendChild(iconSpan);

        iconSpan.appendChild(iconTrash);



        figure.appendChild(imageElement);


        document.getElementById("galleryModale").appendChild(figure);
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des articles : " + error);
    });
}



/**const modal = document.querySelector(".modal-container");
//const btn = document.getElementById("elementBtnModify");
const close = document.getElementsByClassName("close-modal")[0];
const modalBtnn = document.querySelector(".modal-btn")

modalBtnn.addEventListener("click", () => {
console.log(modalBtnn);

  const elementBtnAll = (works) => {
    console.log(elementBtnAll);
    for (let i = 0; i < works.length; i++) {
      const card = works[i];
      console.log(card);

      const figure = document.createElement("figure");
      const imageElement = document.createElement("img");
      imageElement.src = card.imageUrl ?? "aucune image pour le moment";
      const titleElement = document.createElement("figcaption");
      titleElement.innerText = card.title ?? "aucun titre pour le moment";
  
      figure.appendChild(imageElement);
      figure.appendChild(titleElement);
      elementBtnAll.appendChild(figure);
    }
  };

  document.getElementById("galleryModale").innerHTML = `

  ` 

})





 */








// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function () {
  modal.style.display = "block";
  fetchForModal();
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}














const deleteItem = (id) => {
  // fetch delete api with id
};





/**data.works.forEach((work) => {
  const card = document.createElement("div");
  card.classList.add("card");
  const img = document.createElement("img");
  img.src = work.image;
  const title = document.createElement("h3");
  title.innerHTML = work.title;
  const description = document.createElement("p");
  description.innerHTML = work.description;
  const button = document.createElement("button");
  button.innerHTML = "Delete";
  button.addEventListener("click", deleteItem(work.id));
  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(description);
  document.querySelector(".cards").appendChild(card);
});
 */

/**

 //   S0phie

//#endregion


 */





/**


//#region Function
function fetchAndDisplay(categoryId) {
  fetch(URL_WORKS)
    .then((data) => data.json())
    .then((jsonListWorks) => {
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

//#endregion

//#region Event

// Evénements

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


//#endregion


 */


/**voir le melange de code apres le14/11 23h55
 * 

const URL_WORKS = url + "works";

const getWorks = async () => {
  try {
    const response = await fetch(URL_WORKS);
    console.log(re);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Erreur lors de la récupération des données');
  }
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




//#endregion

//#region Events   S0phie

/**


boutonAll.addEventListener("click", async () => {
  try {
    await updateContent('all');
  } catch (error) {
    console.log(error);
  }



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



const modal = document.getElementById("myModal");

const btn = document.getElementById("myBtn");


const span = document.getElementsByClassName("close")[0];


btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
 */



/** code ok 14/11/23   23h46 
 * 

//#endregion



//#region Methods


// Delete work
const deleteWork = async (id) => {
  const reponse = await fetch(`${url}works/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (reponse.status === 401) {
    throw new Error("Unauthorized");
  }
  if (reponse.status === 200) {
    return "Work deleted"
  }
  return data;
};







// Fetch des catégories (works)
fetch(URL_CATEGORY)
.then((data) => data.json())
.then((jsonCategory) => {
  for (let jsonCat of jsonCategory) {
    let Categorys = new Category(jsonCat);

    console.log(Categorys);
    
  }
})
.catch((error) => {
  console.error("Erreur lors de la récupération des catégories : " + error);

  console.log(reponse);
});



















const elementBtnAlll = (works) => {
  for (let i = 0; i < works.length; i++) {
    const card = works[i];
    const figure = document.createElement("figure");
    const imageElement = document.createElement("img");
    imageElement.src = card.imageUrl ?? "aucune image pour le moment";
    const titleElement = document.createElement("figcaption");
    titleElement.innerText = card.title ?? "aucun titre pour le moment";

    figure.appendChild(imageElement);
    figure.appendChild(titleElement);
    elementBtnAll.appendChild(figure);
  }
}; */

