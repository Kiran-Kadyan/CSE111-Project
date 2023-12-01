var prevScrollpos = window.pageYOffset;

window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-50%";
  }
  prevScrollpos = currentScrollPos;
};

var storageSize = localStorage.length;

function listAccounts() {
  let accounts = [];

  for (let i = 1; i <= storageSize; i++) {
    accounts.push(JSON.parse(localStorage.getItem(i)));
  }

  return accounts;
}

function signUp() {
  let name = document.getElementById("signup-name").value;
  let email = document.getElementById("signup-email").value;
  let password = document.getElementById("signup-password").value;
  let typeFreelancer = document.querySelector("#freelancer");
  let typeClient = document.querySelector("#client");

  if (isNaN(name)) {
    if (password.length >= 8) {
      if (typeFreelancer.checked) {
        localStorage.setItem(
          storageSize + 1,
          JSON.stringify([name, email, password, "freelancer", []])
        );
      } else {
        localStorage.setItem(
          storageSize + 1,
          JSON.stringify([name, email, password, "client", []])
        );
      }

      alert("Conta criada com sucesso!");

      document.getElementById("signup-name").value = "";
      document.getElementById("signup-email").value = "";
      document.getElementById("signup-password").value = "";
      document.querySelector("#freelancer").checked = false;
      document.querySelector("#client").checked = false;

      window.open("../login.html", "_self");
    } else alert("The password must contain at least 8 characters!");
  } else alert("Enter a valid name!");
}

function logIn() {
  let email = document.getElementById("login-email").value;
  let password = document.getElementById("login-password").value;

  let accounts = listAccounts();
  let found = false;

  for (let k = 0; k < accounts.length; k++) {
    if (accounts[k][1] == email && accounts[k][2] == password) {
      found = true;
      sessionStorage.setItem("currentLogin", email);
      if (accounts[k][3] == "freelancer") {
        window.open("../freelancer.html", "_self");
      } else {
        window.open("../client.html", "_self");
      }
    }
  }

  if (!found) {
    alert("The data is incorrect!");
  }

  document.getElementById("login-email").value = "";
  document.getElementById("login-password").value = "";
}

function logOut() {
  sessionStorage.removeItem("currentLogin");
  window.open("../index.html", "_self");
}

function addProject(title, description) {
  let accounts = listAccounts();
  let projects = [];

  for (let k = 0; k < accounts.length; k++) {
    if (accounts[k][1] == sessionStorage.getItem("currentLogin")) {
      for (let m = 0; m < accounts[k][4].length; m++) {
        projects.push(accounts[k][4][m]);
      }

      projects.push([title, description]);

      localStorage.setItem(
        k + 1,
        JSON.stringify([
          accounts[k][0],
          accounts[k][1],
          accounts[k][2],
          accounts[k][3],
          projects,
        ])
      );

      alert("Project added successfully!");
    }
  }
}

function forgotPassword() {
  let accounts = listAccounts();
  let projects = [];
  let user = prompt("Enter your email");

  for (let x = 0; x < accounts.length; x++) {
    if (accounts[x][1] == user) {
      let password = prompt("Enter the new password");
      accounts[x][2] = password;

      for (let k = 0; k < accounts[x][4].length; k++) {
        projects.push(accounts[x][4][k]);
      }

      localStorage.setItem(
        x + 1,
        JSON.stringify([
          accounts[x][0],
          accounts[x][1],
          accounts[x][2],
          accounts[x][3],
          projects,
        ])
      );

      alert("Password modified successfully!");
    }
  }
}

function createOffer() {
  let title = document.getElementById("client-name").innerHTML;
  let description = prompt("Enter the project description");

  let category;

  do {
    category = prompt("Enter the project category");

    if (
      category != "Business" &&
      category != "Data" &&
      category != "Digital Marketing" &&
      category != "Graphics & Design" &&
      category != "Music & Audio" &&
      category != "Programming & Tech" &&
      category != "Video & Animation" &&
      category != "Writing"
    ) {
      alert(
        "Enter a valid category!\nBusiness | Data | Digital Marketing | Graphics & Design | Music & Audio | Programming & Tech | Video & Animation | Writing & Editing"
      );
    }
  } while (
    category !== "Business" &&
    category !== "Data" &&
    category !== "Digital Marketing" &&
    category !== "Graphics & Design" &&
    category !== "Music & Audio" &&
    category !== "Programming & Tech" &&
    category !== "Video & Animation" &&
    category !== "Writing & Editing"
  );

  let accounts = listAccounts();
  let offers = [];

  for (let k = 0; k < accounts.length; k++) {
    if (accounts[k][1] == sessionStorage.getItem("currentLogin")) {
      for (let m = 0; m < accounts[k][4].length; m++) {
        offers.push(accounts[k][4][m]);
      }

      offers.push([title, description, category]);

      localStorage.setItem(
        k + 1,
        JSON.stringify([
          accounts[k][0],
          accounts[k][1],
          accounts[k][2],
          accounts[k][3],
          offers,
        ])
      );
    }
  }

  location.reload();
}

function openInfo(id) {
  document.getElementById(id).style.display = "block";
}

function closeInfo(id) {
  document.getElementById(id).style.display = "none";
}
