const url = "http://localhost:5678/api/";

const getCategories = async () => {
  fetch(url + "categories")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch ((error) => {
      console.log(error);
    });

};

getCategories();