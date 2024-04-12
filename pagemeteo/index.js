// Fonction pour vérifier si le token est présent dans le cookie
function checkToken() {
    const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
    if (!token) {
        // Si le token n'est pas présent, rediriger vers la page de connexion
        window.location.href = 'index.html';
    }
}

// Appel de la fonction lors du chargement de la page

window.onload = checkToken;
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const searchInput = document.querySelector('.search-box input');



// Ajout de l'événement d'alerte sur le bouton hookciel
const hookcielButton = document.getElementById("hookciel");

hookcielButton.addEventListener("click", function() {
    

const hookcielinput = document.getElementById("hookcielvalues");
if(hookcielinput!= undefined){
    

    const url = 'http://192.168.65.243:3000/ajouterlocalisation';

    // Données à envoyer
    const donnees = {
        ville: hookcielinput.value
    };

     // Options de la requête
     const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(donnees)
    };


    // Envoi de la requête
    fetch(url, options)
    .then(response => {
        if (response.ok) {
            console.log("Localisation ajoutée avec succès pour la ville d'Amiens.");
        } else {
            console.error("Erreur lors de l'ajout de la localisation pour la ville ");
        }
    })
    .catch(error => {
        console.error('Erreur réseau:', error);
    });

}

});

// Code pour afficher les données météo
search.addEventListener('click', () => {
    const APIKey = 'ede5e9a00d38b3ad0a227e97c7c340e3';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'image/clear.png';
                    break;

                case 'Rain':
                    image.src = 'image/rain.png';
                    break;

                case 'Snow':
                    image.src = 'image/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'image/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'image/mist.png';
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';


            function getCurrentDate() {
                const now = new Date();
                const options = { month: 'long', day: 'numeric', year: 'numeric' };
                return now.toLocaleDateString('fr-FR', options);
            }
        
            const dateElement = document.getElementById('datetime');
            if (dateElement) {
                dateElement.textContent = getCurrentDate();
            }
        
        });
});

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Empêche le comportement par défaut du formulaire de se produire
        search.click(); // Simule un clic sur le bouton de recherche
    }
});


 // Récupérer le bouton de déconnexion
// Récupérer le bouton de déconnexion
const logoutButton = document.getElementById('logout-button');

// Ajouter un écouteur d'événements sur le bouton de déconnexion
logoutButton.addEventListener('click', function() {
    // Supprimer le token du localStorage
    localStorage.removeItem('token');
    
    // Supprimer le token du cookie
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Rediriger vers la page de connexion
    window.location.href = 'index.html';
});
