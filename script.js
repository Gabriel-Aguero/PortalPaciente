const files = document.getElementById("foto_field");

files.addEventListener("change", () => {
  const filename = this.files[0]
    ? this.files[0].name
    : "Ningun archivo seleccionado";
  document.getElementById("file-name").textContent = filename;
});
