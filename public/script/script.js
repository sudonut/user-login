function formValidate() {
  const userName = document.getElementById("user-name");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const passwordConfirm = document.getElementById("password-confirm");

  if (password.value != passwordConfirm.value) {
    alert("Passwords must match!");
    password.style.borderColor = "#E34234";
    passwordConfirm.style.borderColor = "#E34234";
    return false;
  } else {
    return true;
  }
}