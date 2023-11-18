/**
 * login
 * email: sophie.bluel@test.tld
 * password: S0phie 
 */

//#region Variables

const url = "http://localhost:5678/api/";
const URL_WORKS = url + "works";
const URL_LOGIN = url + "users/login";

const form = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");

//#endregion


//#region Class
class Login {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
}

//#endregion


//#region Event

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = {
    email: email.value,
    password: password.value,
  };

  try {
    const response = await fetch(URL_LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      sessionStorage.setItem("token", responseData.token);
      window.location.href = "index.html";
    } else {
      const err = await response.json();
      console.error(err);
    }
  } catch (error) {
    console.error(error);
  }
});


document.addEventListener("DOMContentLoaded", function () {
  const login = async (email, password) => {
    const loginData = new Login(email, password);
    console.log(loginData);

    try {
      const response = await fetch(`${url}users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json();
      console.log(responseData);
      sessionStorage.setItem("token", responseData.token);
      return responseData;
    } catch (error) {
      console.error("Erreur lors de la connexion : " + error.message);
    }
  };





  const loginForm = document.getElementById("loginForm");
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const email = document.getElementById("emailLogin").value;
      const password = document.getElementById("passwordLogin").value;
      const data = await login(email, password);
      console.log(data);
      if (data && data.token) {
        const loginNav = document.querySelector(".login");
        if (loginNav) {
          window.location.href = "./index.html";
          loginNav.innerHTML = `<a href="#" onClick="Logout()">Logout</a>`;
          modeEdit.classList.add("display-flex");
          

        } else {
          console.error("Élément loginNav introuvable dans le DOM");
        }
        localStorage.setItem("userId", data.userId);
      } else {
        console.error("Échec de la connexion");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion : " + error.message);
    }
  });
  

});




//#endregion





