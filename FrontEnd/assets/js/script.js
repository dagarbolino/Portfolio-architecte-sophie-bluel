const url = "http://localhost:5678/api/";

const getWorks = async () => {
  try {
    const response = await fetch(url + "works");
    const data = await response.json();
    //console.table(data);
    return data; // Retourne les données récupérées
  } catch (error) {
    console.log(error);
    throw new Error('Erreur lors de la récupération des données');
  }
};


const boutonAll = document.querySelector(".btnTous");

boutonAll.addEventListener("click", async function () {
  try {
    const worksData = await getWorks(); //  Les données des travaux
    const filteredCategories = worksData.filter(function (work) {
      return work.categoryId === 1, 2, 3; //  Les travaux
    });
    console.log(filteredCategories); // Affiche les travaux dans la console
  } catch (error) {
    console.log(error); // Affiche les erreurs dans la console
  }
});


const boutonObjets = document.querySelector(".btnObjets");
boutonObjets.addEventListener("click", async function () {
  try {
    const worksData = await getWorks(); // Les données des travaux
    const filteredCategories = worksData.filter(function (work) {
      return work.categoryId === 1; // Filtre les travaux par categoryId 
    });
    console.log(filteredCategories); // Affiche les travaux filtrés dans la console
  } catch (error) {
    console.log(error); // Affiche les erreurs dans la console
  }
});


const boutonAppartements = document.querySelector(".btnAppartements");
boutonAppartements.addEventListener("click", async function () {
  try {
    const worksData = await getWorks(); // Les données des travaux
    const filteredCategories = worksData.filter(function (work) {
      return work.categoryId === 2; // Filtre les travaux par categoryId 
    });
    console.log(filteredCategories); // Affiche les travaux filtrés dans la console
  } catch (error) {
    console.log(error); // Affiche les erreurs dans la console
  }
});


const boutonHotelsRestos = document.querySelector(".btnHotelsRestos");
boutonHotelsRestos.addEventListener("click", async function () {
  try {
    const worksData = await getWorks(); // Les données des travaux
    const filteredCategories = worksData.filter(function (work) {
      return work.categoryId === 3; // Filtre les travaux par categoryId 
    });
    console.log(filteredCategories); // Affiche les travaux filtrés dans la console
  } catch (error) {
    console.log(error); // Affiche les erreurs dans la console
  }
});
