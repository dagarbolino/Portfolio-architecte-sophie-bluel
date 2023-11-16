//#region Variable
const url = "http://localhost:5678/api/";
const URL_WORKS = url + ("works")

const logoutNav = document.getElementById("pageEditLogout");
const elementGalleryy = document.getElementById("galleryy");

const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];

//#endregion

//#region Class
class Works {
  constructor(jsonWorks) {
    jsonWorks && Object.assign(this, jsonWorks);
  }
}
//#endregion

//#region Function
function fetchAndDisplay() {
  fetch(URL_WORKS)
    .then((data) => data.json())
    .then((jsonListWorks) => {
     
      for (let jsonWorks of jsonListWorks) {
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

logoutNav.addEventListener("click", () => {
  //console.log("J'ai cliqué sur le bouton de déconnexion")
window.location.href = "./index.html";
}); 


document.addEventListener('DOMContentLoaded', async () => {
  document.getElementById("galleryy").innerHTML = "";
  fetchAndDisplay("all");
});


//#endregion















// Logout
/**const logout = () => {
  localStorage.removeItem("token");
  const a = document.createElement("a");
  a.href = "login.html";
  a.innerHTML = "Login";
  a.addEventListener("click", () => {
    logout();
  });

  loginNav.innerHTML = "";
  loginNav.appendChild(a);




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
}; */







