// On récupèere tous les élément du DOM

const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.dete');
const timeOutput = document.querySelector('.time');
const nameOutput = document.querySelector('.name');
const conditionOutput = document.querySelector('.condition');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');

const apiKey = 'de85dc143aa5444db5b85825220107';
let lang = navigator.language;
// Ville par défaut lors du chargement de la page
let cityInput = "Marseille";

// On ajoute l'evenement click à chaque ville dans le panneau
cities.forEach((city) => {
	city.addEventListener('click', (e) => {
		// On  passe de la ville par défaut à celle sur laquelle on a cliqué
		cityInput = e.target.innerHTML;

		fetchWeatherData();
		
		// animation Fade out de l'application 
		app.getElementsByClassName.opacity = "0";
	})
})


// On ajoute l'évenementsubmit à notre formulaire de recherche
form.addEventListener('submit', (e) => {
	// Si le champs de recherche des villes est vide on envoie on envoie une alert
	if (search.value.length == 0) {
		alert('Veuillez saisir le nom de votre ville');
	} else {
		cityInput = search.value;

		fetchWeatherData();
		// On retire tout text dans la barre de cherche
		search.value = '';

		app.style.opacity = '0';
	}
	e.preventDefault();
});

function dayOfTheWeek(day, month, year) {
	const weekDay = [
		"Dimanche",
		"Lundi",
		"Mardi",
		"Mercredi",
		"Jeudi",
		"Vendredi",
		"Samedi"
	];
	return weekDay[new Date(`${day}/${month}/${year}`).getDay()];

}

function fetchWeatherData() {
	// On recupère les données de l'API
	fetch(
		`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityInput}&lan=${lang}`)
			.then(response => response.json())
			.then(data => {
				console.log(data);

				// On ajoute la température et les dondition météo à notre page
				temp.innerHTML = Math.trunc(data.current.temp_c) + '&#176;';
				conditionOutput.innerHTML = data.current.condition.text;

				nameOutput.innerHTML = data.location.name;
				
			})
	
	
}