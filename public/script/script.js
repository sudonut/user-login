document.getElementById("user-form").addEventListener("submit", formValidate);

function formValidate(e) {
  e.preventDefault();
  const userName = document.getElementById("user-name");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const passwordConfirm = document.getElementById("password-confirm");
}