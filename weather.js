const weather = document.querySelector(".js-weather");
const API_KEY = "03f1c9c62da0d00af83f5c9fa36bec35";
const COORDS = 'coords';

function init() {
    loadCoords();
}
init();

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError);
}

function handleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function getWeather(lat,lon) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`    
        )
        .then(function(response){
            return response.json();
        })
        .then(function(json){
            console.log(json);
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerText = `${temperature} @ ${place}`;
        });
    }

function handleGeoError() {
    console.log("Cant access geo location");
}