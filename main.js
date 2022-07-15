// On récupèere tous les élément du DOM

const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
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

			const date = data.location.localtime;
			const y = parseInt(date.substr(0, 4));
			const m = parseInt(date.substr(5, 2));
			const d = parseInt(date.substr(8, 2));
			const time = date.substr(11);

			dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d} - ${m} - ${y}`;
			timeOutput.innerHTML = time;
				
			nameOutput.innerHTML = data.location.name;

			const iconId = data.current.condition.icon.substr(
				"//cdn.weatherapi.com/weather/64x64/".length);
				
			icon.src = "./icons/" + iconId;

			cloudOutput.innerHTML = data.current.cloud + "%";
			humidityOutput.innerHTML = data.current.humidity + "%";
			windOutput.innerHTML = data.current.wind_kph + "km/h";

			let timeOfDay = "day";
			//recupère l'identifiant unique pour chaque condition météo
			const code = data.current.condition.code;
				
			// On passe en mode nuit si c'est la nuit dans la ville
			if (!data.current.is_day) {
				timeOfDay = "night";

			}
			if (code == 1000) {
				// On définit l'image de l'arrière plan sur claire le temps est clair
				app.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`;

				//On change la couleur du bouton bg selon si c'est le jour ou la nuit
				btn.style.background = "#e5ba92";
				if (timeOfDay == "night") {
					btn.style.background = "#181e";
						
				}
			}
				
			else if (
				code == 1003 ||
				code == 1006 ||
				code == 1009 ||
				code == 1030 ||
				code == 1069 ||
				code == 1087 ||
				code == 1135 ||
				code == 1273 ||
				code == 1276 ||
				code == 1279 ||
				code == 1282
			) {
				app.style.backgroundImage = `url(./images/${timeOfDay}/cloudy.jpg)`;
				btn.style.background = "#fa6d1b";
				if (timeOfDay == "night") {
					btn.style.background = "#181e27";
				}
			} else if (
				code == 1063 ||
				code == 1069 ||
				code == 1072 ||
				code == 1150 ||
				code == 1153 ||
				code == 1180 ||
				code == 1183 ||
				code == 1186 ||
				code == 1189 ||
				code == 1192 ||
				code == 1195 ||
				code == 1204 ||
				code == 1207 ||
				code == 1204 ||
				code == 1240 ||
				code == 1243 ||
				code == 1246 ||
				code == 1249 ||
				code == 1252
			) {
				app.style.backgroundImage = `url(./images/${timeOfDay}/rainy.jpg)`;
				btn.style.background = "#647d75";
				if (timeOfDay == "night") {
					btn.style.background = "#325c80";
				}

			} else {
				app.style.backgroundImage = `url(./images/${timeOfDay}/snowy.jpg)`;
				btn.style.background == "#4d72aa";
				if (timeOfDay == "night") {
					btn.style.background = "#1b1b1b";
				}
			}
			app.style.opacity = "1";
		})
	
		.catch(() => {
			alert('Ville introuvable veuillez réessayer');
			app.style.opacity = "1";
		});
}

fetchWeatherData();

app.style.opacity = "1";