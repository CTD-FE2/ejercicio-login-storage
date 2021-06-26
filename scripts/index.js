// Esta es la base de datos de nuestros usuarios
const baseDeDatos = {
  usuarios: [
    {
      id: 1,
      name: "Steve Jobs",
      email: "steve@jobs.com",
      password: "Steve123",
    },
    {
      id: 2,
      name: "Ervin Howell",
      email: "shanna@melissa.tv",
      password: "Ervin345",
    },
    {
      id: 3,
      name: "Clementine Bauch",
      email: "nathan@yesenia.net",
      password: "Floppy39876",
    },
    {
      id: 4,
      name: "Patricia Lebsack",
      email: "julianne.oconner@kory.org",
      password: "MysuperPassword345",
    },
  ],
};

window.onload = () => {

  const form = document.forms.login;
  const password = form.password;
  const btnIniciarSesion = form.querySelector("button.login-btn");

  cargarInformacion()

  btnIniciarSesion.onclick = event => {
    event.preventDefault();
    iniciarSesion(form.email.value, password.value);
  };

  password.onkeypress = event => {
    if (event.key === "Enter") {
      iniciarSesion(form.email.value, password.value);
    }
  };
};

function cargarInformacion() {
  const formOculto = localStorage.getItem("visibilidadForm");
  if (formOculto === "true") {
    document.forms.login.classList.add("hidden");
    mostrarNombreUsuario();
    agregarBotonCerrarSesion();
  }
}

function guardarInformacion(email) {
  const formOculto = document.forms.login.classList.contains("hidden");
  if (formOculto) {
    localStorage.setItem("visibilidadForm", "true");
    localStorage.setItem("h1", document.querySelector("h1").innerText);
    localStorage.setItem("usuario", obtenerNombreUsuario(email));
  }
}

function iniciarSesion(email, password) {
  const errorContainer = document.querySelector("#error-container");
  errorContainer.classList.add("hidden");
  document.querySelector("#loader").classList.remove("hidden");
  setTimeout(() => {
    document.querySelector("#loader").classList.add("hidden");
    if (validarDatos(email, password)) {
      loginExitoso();
    } else {
      errorContainer.classList.remove("hidden");
      errorContainer.innerHTML = "<small>Alguno de los datos ingresados son incorrectos</small>";
    } 
    guardarInformacion(email);
  }, 3000);
}

function validarDatos(email, password) {
  const mailEsValido = validarEmail(email);
  const passEsValida = validarPassword(password);
  const existeUsr = existeUsuario(email, password);
  return mailEsValido && passEsValida && existeUsr;
}

function validarEmail(email) {
  const regex = /^[a-zA-Z0-9.!]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/g;
  return regex.test(email);
}

function validarPassword(password) {
  const regex = /^[a-zA-Z0-9]{5,}/g;
  return regex.test(password);
}

function existeUsuario(email, password) {
  const usuario = baseDeDatos.usuarios.find(usr => usr.email === email && usr.password === password);
  return usuario !== undefined;
}

function loginExitoso() {
  document.forms.login.classList.add("hidden");
  mostrarNombreUsuario();
  agregarBotonCerrarSesion();
}

function agregarBotonCerrarSesion() {
  document.querySelector("main").innerHTML += "<button class=\"logout-btn\">Cerrar Sesión</button>";
  document.querySelector(".logout-btn").onclick = event => {
    event.preventDefault();
    localStorage.clear();
    location.reload();
  }
}

function mostrarNombreUsuario() {
  const usuario = localStorage.getItem("usuario");
  const h1 = document.querySelector("h1");
  if (usuario !== null) {
    h1.innerText = "Bienvenide al sitio " + usuario + " 😀";
  } else {
    h1.innerText = "Bienvenide al sitio 😀";
  }
}

function obtenerNombreUsuario(email) {
  return baseDeDatos.usuarios.find(usr => usr.email === email).name;
}