const apiKey = "Enter your API";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const search = document.querySelector('input');
const button = document.querySelector('button');
let weaterIcon = document.querySelector('.weather-icon');

async function checkWeather(city) {

    const response = await fetch(apiURL + city + `&appid=${apiKey}`);
    if (response.status == 404) {
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.weather').style.display = 'none';
    }
    else {

        const data = await response.json();
        document.querySelector('.city').textContent = data.name;
        document.querySelector('.temp').textContent = Math.round(data.main.temp) + "°C";
        document.querySelector('.humidity').textContent = data.main.humidity + "%";
        document.querySelector('.wind').textContent = data.wind.speed + `km/hr`;

        switch (data.weather[0].main) {
            case 'Haze':
                weaterIcon.setAttribute("src", "images/clouds.png");
                break;
            case 'Clouds':
                weaterIcon.setAttribute("src", "images/clouds.png");
                break;
            case 'Rain':
                weaterIcon.setAttribute("src", "images/rain.png");
                break;
            case 'Drizzle':
                weaterIcon.setAttribute("src", "images/drizzle.png");
                break;
            case 'Mist':
                weaterIcon.setAttribute("src", "images/mist.png");
                break;
            case 'Clear':
                weaterIcon.setAttribute("src", "images/clear.png");
                break;
        }

        document.querySelector('.weather').style.display = "block";
        document.querySelector('.error').style.display = "none";
    }
    search.value = "";
    search.focus();
};
button.addEventListener('click', () => {
    checkWeather(search.value);
});
