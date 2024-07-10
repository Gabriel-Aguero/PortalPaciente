// scripts.js
document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evita el envío del formulario para validación

    // Validación de los campos
    const diagnosis = document.getElementById("diagnosis").value;
    const diagnosisDate = document.getElementById("diagnosis-date").value;
    const allergies = document.getElementById("allergies").value.trim();
    const treatment = document.getElementById("treatment").value.trim();
    const studies = document.getElementById("studies").value.trim();
    const relationship = document.getElementById("relationship").value.trim();
    const familyDiagnosis = document
      .getElementById("family-diagnosis")
      .value.trim();
    const additionalDiagnosis = document.querySelectorAll(
      ".additional-diagnosis"
    );
    const additionalFamilyDiagnosis = document.querySelectorAll(
      ".additional-family-diagnosis"
    );
    const errorMessageElement = document.getElementById("error-message");

    // Limpiar mensajes anteriores
    errorMessageElement.style.display = "none";
    errorMessageElement.textContent = "";

    // Mensajes de error
    let isValid = true;
    let errorMessage = "";

    // Validar diagnóstico
    if (diagnosis === "") {
      isValid = false;
      errorMessage += "El campo de diagnóstico es obligatorio.\n";
    }

    // Validar campos adicionales de diagnóstico
    additionalDiagnosis.forEach(function (field, index) {
      if (field.value === "") {
        isValid = false;
        errorMessage += `El diagnóstico adicional ${
          index + 1
        } es obligatorio.\n`;
      }
    });

    // Validar fecha de diagnóstico
    if (diagnosisDate === "") {
      isValid = false;
      errorMessage += "El campo de fecha de diagnóstico es obligatorio.\n";
    }

    // Validar alergias
    if (allergies === "") {
      isValid = false;
      errorMessage += "El campo de alergias es obligatorio.\n";
    }

    // Validar tratamiento
    if (treatment === "") {
      isValid = false;
      errorMessage += "El campo de tratamiento es obligatorio.\n";
    }

    // Validar estudios realizados
    if (studies === "") {
      isValid = false;
      errorMessage += "El campo de estudios realizados es obligatorio.\n";
    }

    // Validar parentesco
    if (relationship === "") {
      isValid = false;
      errorMessage += "El campo de parentesco es obligatorio.\n";
    }

    // Validar diagnóstico familiar
    if (familyDiagnosis === "") {
      isValid = false;
      errorMessage += "El campo de diagnóstico familiar es obligatorio.\n";
    }

    // Validar campos adicionales de diagnóstico familiar
    additionalFamilyDiagnosis.forEach(function (field, index) {
      if (field.value === "") {
        isValid = false;
        errorMessage += `El diagnóstico familiar adicional ${
          index + 1
        } es obligatorio.\n`;
      }
    });

    if (!isValid) {
      errorMessageElement.style.display = "block";
      errorMessageElement.textContent = errorMessage;
    } else {
      // Aquí puedes manejar el envío del formulario si todo es válido
      console.log("Formulario válido y enviado");
      // registrationForm.submit(); // Descomentar para enviar el formulario
    }
  });

document.getElementById("add-diagnosis").addEventListener("click", function () {
  const container = document.getElementById("additional-diagnosis-container");
  const newDiagnosisField = document.createElement("div");
  newDiagnosisField.classList.add("form-group");
  newDiagnosisField.innerHTML = `
        <label for="additional-diagnosis">Diagnóstico Adicional:</label>
        <input type="text" class="additional-diagnosis" name="additional-diagnosis[]" required>
    `;
  container.appendChild(newDiagnosisField);
});

document
  .getElementById("add-family-diagnosis")
  .addEventListener("click", function () {
    const container = document.getElementById(
      "additional-family-diagnosis-container"
    );
    const newFamilyDiagnosisField = document.createElement("div");
    newFamilyDiagnosisField.classList.add("form-group");
    newFamilyDiagnosisField.innerHTML = `
        <label for="additional-family-diagnosis">Diagnóstico Familiar Adicional:</label>
        <input type="text" class="additional-family-diagnosis" name="additional-family-diagnosis[]" required>
    `;
    container.appendChild(newFamilyDiagnosisField);
  });
