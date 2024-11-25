
var mainForm = document.getElementById("mainForm")
var usersAccounts = []
if (localStorage.getItem('usersaccounts') !== null) {
  usersAccounts = JSON.parse(localStorage.getItem('usersaccounts'))
}

showLoginForm()

function showSignUpForm() {
  mainForm.innerHTML = `
    <div id="signUpForm">
            <h1 class="text-info fw-normal mb-3">Smart Login System</h1>
          <input
            type="text"
            id="userName"
            class="form-control bg-dark text-white shadow-none rounded-1 my-3"
            placeholder="Enter your name"
          />
          <input
            type="email"
            id="signUpEmail"
            class="form-control bg-dark text-white shadow-none rounded-1 my-3"
            placeholder="Enter your email"
          />
          <input
            type="password"
            id="signUpPassword"
            class="form-control bg-dark text-white shadow-none rounded-1 my-3"
            placeholder="Enter your password"
          />
          <p id="signUpmessage"></p>
          <button onclick="usersData()"
           class="btn btn-outline-info form-control rounded-1 my-3">
            Sign Up
          </button>
          <p>
            You have an account? <button 
            class="text-info bg-transparent border-0 text-decoration-underline" 
            onclick="showLoginForm()">Sign In</button>
          </p>
        </div>
    `
}

function showLoginForm() {
  mainForm.innerHTML = `
          <h1 class="text-info fw-normal mb-3">Smart Login System</h1>
          <input
            type="email"
            id="loginEmail"
            class="form-control bg-dark text-white shadow-none rounded-1 my-3"
            placeholder="Enter your email"
          />
          <input
            type="password"
            id="loginPassword"
            class="form-control bg-dark text-white shadow-none rounded-1 my-3"
            placeholder="Enter your password"
          />
          <p id="loginMessage"></p>
          <button 
          onclick="userLogin()"
          class="btn btn-outline-info form-control rounded-1 my-3">
            Login
          </button>
          <p>
            Don’t have an account?
            <button
              class="text-info bg-transparent border-0 text-decoration-underline"
              onclick="showSignUpForm()"
            >
              Sign Up
            </button>
          </p>
    `
}

function usersData() {
  var userName = document.getElementById("userName");
  var signUpEmail = document.getElementById("signUpEmail");
  var signUpPassword = document.getElementById("signUpPassword");

  if (!userName.value.trim()) {
    document.getElementById("signUpmessage").innerHTML = `<p class="text-warning">Name is required.</p>`;
    return;
  }

  if (!validateEmail(signUpEmail.value.trim())) {
    document.getElementById("signUpmessage").innerHTML = `<p class="text-warning">Please enter a valid email address.</p>`;
    return;
  }

  if (!validatePassword(signUpPassword.value.trim())) {
    document.getElementById("signUpmessage").innerHTML = `<p class="text-warning">Password must be at least 6 characters long.</p>`;
    return;
  }

  var userAccount = {
    setName: userName.value.trim(),
    setEmail: signUpEmail.value.trim(),
    setPassword: signUpPassword.value.trim()
  };

  var emailExist = false;
  for (var i = 0; i < usersAccounts.length; i++) {
    if (userAccount.setEmail === usersAccounts[i].setEmail) {
      emailExist = true;
      break;
    }
  }

  if (emailExist) {
    document.getElementById("signUpmessage").innerHTML = `<p class="text-warning">Your email already exists.</p>`;
  } else {
    usersAccounts.push(userAccount);
    localStorage.setItem('usersaccounts', JSON.stringify(usersAccounts));
    document.getElementById("signUpmessage").innerHTML = `<p class="text-success">Registration has been completed successfully.</p>`;
  }
}

function userLogin() {
  var loginEmail = document.getElementById("loginEmail");
  var loginPassword = document.getElementById("loginPassword");

  if (!validateEmail(loginEmail.value.trim())) {
    document.getElementById("loginMessage").innerHTML = `<p class="text-warning">Please enter a valid email address.</p>`;
    return;
  }

  if (!loginPassword.value.trim()) {
    document.getElementById("loginMessage").innerHTML = `<p class="text-warning">Password is required.</p>`;
    return;
  }

  var emailFound = false;

  for (var j = 0; j < usersAccounts.length; j++) {
    if (loginEmail.value === usersAccounts[j].setEmail && loginPassword.value === usersAccounts[j].setPassword) {
      emailFound = true;
      break;
    }
  }

  if (emailFound) {
    document.getElementById("mainForm").innerHTML = `
      <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-black bg-opacity-25 shadow">
        <div class="container d-flex justify-content-between">
          <div><a class="navbar-brand" href="#">SMART LOGIN</a></div>
          <button onclick="showLoginForm()" class="btn btn-outline-warning">Logout</button>
        </div>
      </nav>
      <div id="header" class="w-50 my-5 mx-auto py-5">
        <h1 class="text-info fw-bold mb-3">Welcome <span>${usersAccounts[j].setName}</span></h1>
      </div>
    `;
  } else {
    document.getElementById("loginMessage").innerHTML = `<p id="loginMessage" class="text-warning">Email or Password incorrect.</p>`;
  }
}
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}
