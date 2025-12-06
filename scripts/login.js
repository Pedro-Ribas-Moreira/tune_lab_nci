/*
Pedro Moreira
  x22140034
  x22140034@student.ncirl.ie

  Date: 06/12/2025
  Higher Diploma in Computing  
  Web Design Client-Side Scripting
*/

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");
  const usernameInput = document.getElementById("usernameInput");
  const passwordInput = document.getElementById("passwordInput");
  const forgotPasswordLink = document.getElementById("forgotPasswordLink");

  forgotPasswordLink.addEventListener("click", function (event) {
    event.preventDefault();
    alert("An email to reset your password has been sent.");
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    usernameInput.classList.remove("is-invalid");
    passwordInput.classList.remove("is-invalid");

    let isValid = true;

    if (usernameInput.value.trim() === "") {
      usernameInput.classList.add("is-invalid");
      isValid = false;
    }

    if (passwordInput.value.trim() === "") {
      passwordInput.classList.add("is-invalid");

      isValid = false;
    }

    if (isValid) {
      alert("Login Successful! ");

      document.location.href = "index.html";
    }
  });
});
