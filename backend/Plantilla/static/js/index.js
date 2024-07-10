window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.header');
    if (window.scrollY > 0) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

const fetchUsersPromesa = () => {
    //COLOCAR LOGICA DE ESPERA
    fetch('http://127.0.0.1:5000/api/users/', options)
        .then(response => response.json()) // CONVERTIR A FORMATO JSON LA RESPUESTA DEL SERVIDOR
        .then(responseTransform => {
            console.log(responseTransform);
            let users = responseTransform.results;
            const divPopular = document.querySelector('#popular-list');
            movies.forEach(user => {
                const html = `
                    <div class="user-item">
                        <a href="./templates/detail-user.html" >
                            <img  class="user-item-img" src="https://image.tmdb.org/t/p/w500/${user.poster_path}" alt="${user.title}">
                            <div class="user-item-detail">
                                <p class="user-item-detail-title">${movie.title}</p>
                                <p class="user-item-detail-subtitle">${movie.release_date} - ${user.vote_average}</p>
                            </div>
                        </a>
                    </div>
            `;
                divPopular.insertAdjacentHTML('beforeend', html);
            });

        })
        .catch(error => console.error(error));
}

const fetchUsersAyncAwait = async () => {
    try {
        // Hace una solicitud HTTP GET a la URL del servidor seguida de '/movie/popular'. La palabra clave await pausa la ejecución hasta que la promesa devuelta por fetch se resuelva. La variable 'response' contendrá la respuesta HTTP.
        const response = await fetch(`http://127.0.0.1:5000/api/movies/`,
            option);
        // const response = await axios(`${URLSERVER}/movie/popular`, options);
        console.log('Esperando resolución');
        // Utiliza la palabra clave await para pausar la ejecución hasta que la promesa devuelta por response.json() se resuelva. La variable 'data' contendrá el cuerpo de la respuesta JSON.
        const data = await response.json();
        const users = data.results;
        console.log(data);

        const divPopular = document.querySelector('#popular-list');
        users.forEach(user => {
            const html = `
                    <div class="user-item">
                        <a href="./templates/detail-user.html" >
                            <img  class="user-item-img" src="https://image.tmdb.org/t/p/w500/${user.poster_path}" alt="${user.title}">
                            <div class="user-item-detail">
                                <p class="user-item-detail-title">${user.title}</p>
                                <p class="user-item-detail-subtitle">${user.release_date} - ${user.vote_average}</p>
                            </div>
                        </a>
                    </div>
            `;
            divPopular.insertAdjacentHTML('beforeend', html);
        });

    } catch (err) {
        console.error(err)
    }

}

fetchUsersPromesa();