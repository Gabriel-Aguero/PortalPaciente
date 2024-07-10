// scripts.js
document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Validación de los campos
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const gender = document.querySelector('input[name="gender"]:checked');
    const country = document.getElementById("country").value;
    const profilePicture = document.getElementById("profile-picture").files[0];
    const mensaje = document.getElementById("mensaje");

    // Limpiar mensajes anteriores
    mensaje.style.display = "none";
    mensaje.textContent = "";

    // Mensajes de error
    let isValid = true;
    let errorMessage = "";

    // Validar nombre
    if (name === "") {
      isValid = false;
      errorMessage += "El campo de nombre es obligatorio.\n";
    }

    // Validar correo electrónico
    if (email === "") {
      isValid = false;
      errorMessage += "El campo de correo electrónico es obligatorio.\n";
    } else if (!validateEmail(email)) {
      isValid = false;
      errorMessage += "El correo electrónico no es válido.\n";
    }

    // Validar género
    if (!gender) {
      isValid = false;
      errorMessage += "Debe seleccionar un género.\n";
    }

    // Validar país
    if (country === "") {
      isValid = false;
      errorMessage += "Debe seleccionar un país.\n";
    }

    // Validar imagen
    if (!profilePicture) {
      isValid = false;
      errorMessage += "Debe subir una imagen.\n";
    } else if (!validateImage(profilePicture)) {
      isValid = false;
      errorMessage +=
        "La imagen debe ser un archivo válido (jpeg, png, gif).\n";
    }

    // Mostrar errores o enviar formulario
    if (!isValid) {
      mensaje.style.display = "block";
      mensaje.textContent = errorMessage;
    } else {
      mensaje.style.display = "block";
      mensaje.textContent = "Datos enviados con éxito";
    }
  });

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validateImage(file) {
  const validTypes = ["image/jpeg", "image/png", "image/gif"];
  return validTypes.includes(file.type);
}
