function Register() {
  let firstName = document.getElementById("FName").value;
  let lastName = document.getElementById("LName").value;
  let email = document.getElementById("Email").value;
  let password = document.getElementById("Password").value;

  if (!firstName || !lastName || !email || !password) {
    alert("User Registeration Failed: fill all inputs!");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let userFound = users.find((user) => user.email == email);

  if (userFound) {
    alert("User Registeration Failed: user already exists!");
    return;
  }

  users.push({
    firstName,
    lastName,
    email,
    password,
    cart: {},
    favourites: {},
  });

  localStorage.setItem("users", JSON.stringify(users));

  alert("User Registered Successfully!");
  location.href = "login.html";
}

function Login() {
  let email = document.getElementById("Email").value;
  let password = document.getElementById("Password").value;
  let rememberMe = document.getElementById("rememberMe").checked;

  if (!email || !password) {
    alert("Login Failed: fill all inputs!");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let userFound = users.find((user) => user.email == email);

  if (!userFound || userFound.password !== password) {
    alert("Login Failed: wrong credintials!");
    return;
  }

  if (rememberMe) {
    localStorage.setItem("currentUser", JSON.stringify(userFound));
  } else {
    sessionStorage.setItem("currentUser", JSON.stringify(userFound));
  }

  alert("User Logged-in Successfully!");
  location.href = "index.html";
}
