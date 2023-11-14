
/**
 * login
 * email: sophie.bluel@test.tld
 * password: S0phie 
 */


//#region Variable

const url = "http://localhost:5678/api/";
const URL_WORKS = url + ("works")
const URL_CATEGORY = "http://localhost:5678/api/categories";
const URL_LOGIN = url + ("users/login");

const galleryyElement = document.getElementById("galleryy");
const modalAjoutElement = document.getElementById("btnModalAjout");
//const loginForm = document.getElementById("loginForm");
const loginNavvvv = document.querySelector(".loginNav");




const btnCategories = document.getElementById("btnCategories");
const btnWork = document.getElementById("btnWork");
const btnDeleteWork = document.getElementById("btnDeleteWork");




//#endregion


//#region Class
// Class Works
class Works {
  constructor(jsonWorks) {
    jsonWorks && Object.assign(this, jsonWorks);
  }
}
// Class Categories
class Category {
  constructor(jsonCats) {
    jsonCats && Object.assign(this, jsonCats);
  }
}

class Login {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
}
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

// Logout
const logout = () => {
  localStorage.removeItem("token");
  const a = document.createElement("a");
  a.href = "login.html";
  a.innerHTML = "Login";
  a.addEventListener("click", () => {
    logout();
  });

  loginNav.innerHTML = "";
  loginNav.appendChild(a);
};



//#endregion


//#region Function

// Fetch des articles (works)
const elementBtnAll = document.getElementById("btnAll");
const worksContainer = document.getElementById("gallery"); 

elementBtnAll.addEventListener("click", () => {
  fetch(URL_WORKS)
    .then((data) => data.json())
    .then((jsonListWorks) => {
      worksContainer.innerHTML = ""; 

      for (let jsonWorks of jsonListWorks) {
        let works = new Works(jsonWorks);
        console.log(works);
        worksContainer.innerHTML += `
        <div id="figure">
          <img id="img" src="${works.imageUrl}" alt="section de toutes les images">
          <p id="para">${works.title}</p>
        </div>
        `;
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des données : " + error);
    });
});




const elementBtnObjets = document.getElementById("btnObjets");
const worksContainerObjets = document.getElementById("gallery");

  elementBtnObjets.addEventListener("click", () => {
    fetch(URL_WORKS)
      .then((data) => data.json())
      .then((jsonListWorks) => {
        gallery.innerHTML = "";
        for (let jsonWorks of jsonListWorks) {
          let works = new Works(jsonWorks);
  
          if (works.category && works.category.name === "Objets") {
            gallery.innerHTML += `
              <div id="figure">
                <img src="${works.imageUrl}" alt="${works.title}">
                <p>${works.title}</p>
              </div>
            `;
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching data: " + error);
      });
  });


  const elementBtnApp = document.getElementById("btnApp");
  elementBtnApp.addEventListener("click", () => {
    //const categoryId = 1; // Replace with the actual category ID for "Objets"
  
    fetch(URL_WORKS)
      .then((data) => data.json())
      .then((jsonListWorks) => {
        gallery.innerHTML = "";
        for (let jsonWorks of jsonListWorks) {
          let works = new Works(jsonWorks);
  
          if (works.category && works.category.name === "Appartements") {
            gallery.innerHTML += `
              <div id="figure">
                <img src="${works.imageUrl}" alt="${works.title}">
                <p>${works.title}</p>
              </div>
            `;
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching data: " + error);
      });
  });


  const elementBtnHotelResto = document.getElementById("btnHotelResto");
  elementBtnHotelResto.addEventListener("click", () => {
  
    fetch(URL_WORKS)
      .then((data) => data.json())
      .then((jsonListWorks) => {
        gallery.innerHTML = "";
        for (let jsonWorks of jsonListWorks) {
          let works = new Works(jsonWorks);
  
          if (works.category && works.category.name === "Hotels & restaurants") {
            gallery.innerHTML += `
              <div id="figure">
                <img src="${works.imageUrl}" alt="${works.title}">
                <p>${works.title}</p>
              </div>
            `;
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching data: " + error);
      });
  });



/**const elementBtnAlll = (works) => {
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



// Fetch des catégories (works)
fetch(URL_CATEGORY)
  .then((data) => data.json())
  .then((jsonCategory) => {
    for (let jsonCat of jsonCategory) {
      let Categorys = new Category(jsonCat);

      console.log(Categorys);
      
//categoryId: 2



    }
  })
  .catch((error) => {
    console.error("Erreur lors de la récupération des catégories : " + error);

    console.log(reponse);
  });










//#endregion

//#region Events   S0phie

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