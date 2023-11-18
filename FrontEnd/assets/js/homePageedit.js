

/**


const url = "http://localhost:5678/api/";
const URL_WORKS = url + ("works")

const logoutNav = document.getElementById("pageEditLogout");
const elementGalleryy = document.getElementById("galleryy");

const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];



//#region Class
class Works {
  constructor(jsonWorks) {
    jsonWorks && Object.assign(this, jsonWorks);
  }
}
//#endregion

//#region Function



//#endregion

//#region Event

logoutNav.addEventListener("click", () => {
  //console.log("J'ai cliqué sur le bouton de déconnexion")
window.location.href = "./index.html";
}); 

const modaleGallery = document.getElementById("galleryModale");
modaleGallery.document.addEventListener("click", () => {
console.log(modaleGallery);
  fetchAndDisplay();
});


//#endregion

 */



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







