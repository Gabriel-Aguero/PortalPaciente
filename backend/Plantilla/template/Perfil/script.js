// scripts.js
document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evita el envío del formulario para validación

    // Validación de los campos
    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const age = document.getElementById("age").value.trim();
    const dni = document.getElementById("dni").value.trim();
    const gender = document.querySelector('input[name="gender"]:checked');
    const city = document.getElementById("city").value;
    const birthdate = document.getElementById("birthdate").value;
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const errorMessageElement = document.getElementById("error-message");

    // Limpiar mensajes anteriores
    errorMessageElement.style.display = "none";
    errorMessageElement.textContent = "";

    // Mensajes de error
    let isValid = true;
    let errorMessage = "";

    // Validar nombre
    if (firstName === "") {
      isValid = false;
      errorMessage += "El campo de nombre es obligatorio.\n";
    }

    // Validar apellido
    if (lastName === "") {
      isValid = false;
      errorMessage += "El campo de apellido es obligatorio.\n";
    }

    // Validar edad
    if (age === "" || isNaN(age) || age <= 0) {
      isValid = false;
      errorMessage +=
        "El campo de edad es obligatorio y debe ser un número positivo.\n";
    }

    // Validar DNI
    if (dni === "") {
      isValid = false;
      errorMessage += "El campo de DNI es obligatorio.\n";
    }

    // Validar género
    if (!gender) {
      isValid = false;
      errorMessage += "Debe seleccionar un género.\n";
    }

    // Validar localidad
    if (city === "") {
      isValid = false;
      errorMessage += "Debe seleccionar una localidad.\n";
    }

    // Validar fecha de nacimiento
    if (birthdate === "") {
      isValid = false;
      errorMessage += "El campo de fecha de nacimiento es obligatorio.\n";
    }

    // Validar teléfono
    if (phone === "") {
      isValid = false;
      errorMessage += "El campo de teléfono es obligatorio.\n";
    }

    // Validar correo electrónico
    if (email === "") {
      isValid = false;
      errorMessage += "El campo de correo electrónico es obligatorio.\n";
    } else if (!validateEmail(email)) {
      isValid = false;
      errorMessage += "El correo electrónico no es válido.\n";
    }

    // Mostrar errores o enviar formulario
    if (!isValid) {
      errorMessageElement.style.display = "block";
      errorMessageElement.textContent = errorMessage;
    } else {
      errorMessageElement.style.display = "block";
      errorMessageElement.textContent = errorMessage;
    }
  });

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
