const formRegister = document.getElementById("formulario");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const edad = document.getElementById("edad");
const dni = document.getElementById("dni");
const localidad = document.getElementById("localidad");
const fecha_nacimiento = document.getElementById("fecha-nacimiento");
const email = document.getElementById("email");
const telefono = document.getElementById("telefono");
const mensaje = document.getElementById("error");
let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// console.log(inputNombre);

formRegister.addEventListener("submit", (e) => {
  e.preventDefault();
  validarCampos();
});

const validarCampos = () => {
  if (!nombre.value) {
    validaFalla(nombre, "Campo Vacio");
  } else {
    validaOk(nombre);
  }
  if (!apellido.value) {
    validaFalla(apellido, "Campo Vacio");
  } else {
    validaOk(apellido);
  }
  if (!edad.value) {
    validaFalla(edad, "Campo Vacio");
  } else {
    validaOk(edad);
  }
  if (!dni.value) {
    validaFalla(dni, "Campo Vacio");
  } else {
    validaOk(dni);
  }
  if (!localidad.value) {
    validaFalla(localidad, "Campo Vacio");
  } else {
    validaOk(localidad);
  }
  if (!fecha_nacimiento.value) {
    validaFalla(fecha_nacimiento, "Campo Vacio");
  } else {
    validaOk(fecha_nacimiento);
  }
  if (!email.value) {
    validaFalla(email, "Campo Vacio");
  } else if (!regexEmail.test(email)) {
    validaFalla(email, "El email no es valido");
  } else {
    validaOk(email);
  }

  if (!telefono.value) {
    validaFalla(telefono, "Campo Vacio");
  } else {
    validaOk(telefono);
  }
};

const validaFalla = (input, mensaje) => {
  const inputContent = input.parentElement;
  const aviso = inputContent.querySelector("p");
  aviso.innerText = mensaje;
  aviso.className = "valida_error";
};

const validaOk = (input, mensaje) => {
  const inputContent = input.parentElement;
  formRegister.reset();
};
