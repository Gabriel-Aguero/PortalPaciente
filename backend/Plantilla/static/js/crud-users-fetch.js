const BASEURL = 'http://127.0.0.1:5000';
/**
* Función para realizar una petición fetch con JSON.
* @param {string} url - La URL a la que se realizará la petición.
* @param {string} method - El método HTTP a usar (GET, POST, PUT, DELETE, etc.).
* @param {Object} [data=null] - Los datos a enviar en el cuerpo de la petición.
* @returns {Promise<Object>} - Una promesa que resuelve con la respuesta en formato JSON.
*/
async function fetchData(url, method, data = null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: data ? JSON.stringify(data) : null, // Si hay datos, los convierte a JSON y los incluye en el cuerpo
    };
    try {
        const response = await fetch(url, options); // Realiza la petición fetch
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return await response.json(); // Devuelve la respuesta en formato JSON
    } catch (error) {
        console.error('Fetch error:', error);
        alert('An error occurred while fetching data. Please try again.');
    }
}


// Función para comunicarse con el servidor para poder Crear o Actualizar un Usuario 
async function saveUser() {
    const iduser = document.querySelector('#id-user').value;
    const nombre = document.querySelector('#nombre').value;
    const correo = document.querySelector('#correo').value;
    const password = document.querySelector('#password').value;
    const banner = document.querySelector('#banner-form').value;

    //VALIDACION DE FORMULARIO
    if (!nombre || !correo || !password || !banner) {
        Swal.fire({
            title: 'Error!',
            text: 'Por favor completa todos los campos.',
            icon: 'error',
            confirmButtonText: 'Cerrar'
        });
        return;
    }
    // Crea un objeto con los datos de la película
    const userData = {
        nombre: nombre,
        correo: correo,
        password: password,
        banner: banner,
    };

    let result = null;
    // Si hay un idUser, realiza una petición PUT para actualizar el usuario existente
    if (iduser !== "") {
        result = await fetchData(`${BASEURL}/api/users/${iduser}`, 'PUT', userData);
    } else {
        // Si no hay idUser, realiza una petición POST para crear un nuevo Usuario
        result = await fetchData(`${BASEURL}/api/users/`, 'POST', userData);
    }

    const formUser = document.querySelector('#form-user');
    formUser.reset();
    Swal.fire({
        title: 'Exito!',
        text: result.message,
        icon: 'success',
        confirmButtonText: 'Cerrar'
    })
    showUsers();

}

/**
 * Funcion que permite crear un elemento <tr> para la tabla de usuario
 * por medio del uso de template string de JS.
 */
async function showUsers() {
    let users = await fetchData(BASEURL + '/api/users/', 'GET');
    const tableUsers = document.querySelector('#list-table-users tbody');
    tableUsers.innerHTML = '';
    users.forEach((user, index) => {
        let tr = `<tr>
                    <td>${user.nombre}</td>
                    <td>${user.correo}</td>
                    <td>${user.password}</td>                 
                    <td>
                        <img src="${user.banner}" width="30%">
                    </td>
                    <td>
                        <button class="btn-cac" onclick='updateUser(${user.id_user})'><i class="fa fa-pencil" ></button></i>
                        <button class="btn-cac" onclick='deleteUser(${user.id_user})'><i class="fa fa-trash" ></button></i>
                    </td>
                  </tr>`;
        tableUsers.insertAdjacentHTML("beforeend", tr);
    });
}


/**
* Function que permite eliminar una pelicula del array del localstorage
* de acuedo al indice del mismo
* @param {number} id posición del array que se va a eliminar
*/
function deleteUser(id) {
    Swal.fire({
        title: "Esta seguro de eliminar este Usuario?",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
    }).then(async (result) => {
        if (result.isConfirmed) {
            let response = await fetchData(`${BASEURL}/api/users/${id}`, 'DELETE');
            showUsers();
            Swal.fire(response.message, "", "success");
        }
    });

}

/**
* Function que permite cargar el formulario con los datos de la pelicula 
* para su edición
* @param {number} id Id de la pelicula que se quiere editar
*/
async function updateUser(id) {
    //Buscamos en el servidor el usuario de acuerdo al id
    let response = await fetchData(`${BASEURL}/api/users/${id}`, 'GET');
    const idUser = document.querySelector('#id-user');
    const nombre = document.querySelector('#nombre');
    const correo = document.querySelector('#correo');
    const password = document.querySelector('#password');
    const banner = document.querySelector('#banner-form');

    idUser.value = response.id_user;
    nombre.value = response.nombre;
    correo.value = response.correo;
    password.value = response.password;
    banner.value = response.banner;
}

// Escuchar el evento 'DOMContentLoaded' que se dispara cuando el 
// contenido del DOM ha sido completamente cargado y parseado.
document.addEventListener('DOMContentLoaded', function () {
    const btnSaveUser = document.querySelector('#btn-save-user');
    //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
    btnSaveUser.addEventListener('click', saveUser);
    showUsers();
});