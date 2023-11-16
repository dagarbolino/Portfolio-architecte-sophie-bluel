/**
 * login
 * email: sophie.bluel@test.tld
 * password: S0phie 
 */

//#region Class

class Login {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
}
//#endregion


//#region Event
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
        const loginNav = document.getElementById("loginNav");

        if (loginNav) {
          window.location.href = "./homePageEdit.html";
          loginNav.innerHTML = `<a href="#" onClick="logout()">Logout</a>`;
          
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
