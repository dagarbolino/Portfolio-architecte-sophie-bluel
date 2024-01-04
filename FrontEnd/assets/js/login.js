const url = "http://localhost:5678/api/";
const URL_LOGIN = url + "users/login";

const form = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");

class Login {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
}
//S0phie
async function loginUser(email, password) {
  const loginData = new Login(email, password);

  try {
    const response = await fetch(URL_LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginData)
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
    console.error("Erreur lors de la connexion : " + error.message);
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  await loginUser(email.value, password.value);
});