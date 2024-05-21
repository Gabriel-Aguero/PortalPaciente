const form = document.getElementById("formulario");
const apellido = document.getElementById("apellido_field");
const nombre = document.getElementById("nombre_field");
const edad = document.getElementById("edad_field");
const dni = document.getElementById("dni_field");
const tel = document.getElementById("tel_field");
const domicilio = document.getElementById("domicilio_field");
const genero = document.getElementById("genero_field");
const localidad = document.getElementById("localidad_field");
const fecha_nac = document.getElementById("fecha_nac_field");
const email = document.getElementById("email_field");

const files = document.getElementById("foto_field");

files.addEventListener("change", () => {
  const filename = this.files[0]
    ? this.files[0].name
    : "Ningun archivo seleccionado";
  document.getElementById("file-name").textContent = filename;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let warning = "";
  let valor = false;
  // parrafo.innerHTML="";
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!regexEmail.test(email.value)) {
    warning += `El email no es valido<br>`;
    valor = true;
  }
});
