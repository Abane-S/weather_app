let weather = {
    "apiKey": "cdd47fe8cee72480bc33724d22c92c98",
    fetchWeather : function (city, degrees = 'metric', langue = 'fr') {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        + "&appid=" 
        + this.apiKey
        + '&units='
        + degrees +
        '&lang=' +
        langue
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data))
    },

    displayWeather: function(data){
        const { name } =  data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector('.city').innerText = "Météo à " + name;
        document.querySelector('.icon').src = 'https://openweathermap.org/img/wn/' + icon +'@2x.png'
        document.querySelector('.temperature').innerText = Math.round(temp) + '°C';
        document.querySelector('.description').innerText = description;
        document.querySelector('.humidity').innerText =  'Humidité : ' + humidity + '%';
        document.querySelector('.wind').innerText = 'Vitesse du vent : ' + speed + "km/h";

        document.querySelector('.weather').classList.remove("loading");

        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
    },
    search: function (){
        this.fetchWeather(document.querySelector('.search-bar').value);
    }
};

document.querySelector(".search button").addEventListener('click', function() {
    weather.search();
});

document.querySelector('.search-bar').addEventListener('keyup', function (event){
    if (event.key == "Enter"){
        weather.search();
    }
})

weather.fetchWeather('paris');