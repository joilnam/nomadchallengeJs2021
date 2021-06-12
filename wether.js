const API_KEY="06e98f616062e6c5af8f30b20e9a7716";
const COORDS= 'coords';

const weather=document.querySelector(".js-weather");

async function getWeather(lat, lng) {
    const postResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    );
    const post = await postResponse.json();
    const temperature = post.main.temp;
    const place = post.name;
    weather.innerText = `${temperature} @ ${place}`;
    }

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj))
}

function handleGeoSucces(position){
    const latitude=position.coords.latitude;
    const longitude=position.coords.longitude;
    const coordsObj={
        latitude,
        longitude,
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function handleGeoError(position){
    console.log("어디인지 알 수 없어")
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError);
}


function loadCoords(){
    const loadedCoords= localStorage.getItem(COORDS);
    if(loadedCoords ===null){
        askForCoords();
    }else{
        const parseCoords= JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude,parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();