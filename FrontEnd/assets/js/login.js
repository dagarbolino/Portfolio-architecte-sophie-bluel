/**
 * login
 * email: sophie.bluel@test.tld
 * password: S0phie 
 */


document.addEventListener("DOMContentLoaded", function() {
  const loginForm = document.getElementById("loginForm");
  const message = document.getElementById("message");

  loginForm.addEventListener("submit", function(event) {
      event.preventDefault();

      const emailLogin = loginForm.emailLogin.value;
      const passwordLogin = loginForm.passwordLogin.value;

      
      const predefinedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5ODQzNzIxNSwiZXhwIjoxNjk4NTIzNjE1fQ.vFGb1ma6QG9_mtok3L9jWx0GWLMaW6_lgIgjJL6YUJc";


      if (authenticate(emailLogin, passwordLogin, predefinedToken)) {
          //message.innerHTML = "Connexion réussie!";

          window.location.href = "homePageEdit.html"; 
      } else {
          message.innerHTML = "Utilisateur ou mot de passe ne sont pas correctes";
        }
  });

  function authenticate(emailLogin, passwordLogin, token) {
      return emailLogin === "sophie.bluel@test.tld" && 
      passwordLogin === "S0phie" && 
      token === "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5ODQzNzIxNSwiZXhwIjoxNjk4NTIzNjE1fQ.vFGb1ma6QG9_mtok3L9jWx0GWLMaW6_lgIgjJL6YUJc";
  }
});

