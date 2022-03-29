
const locationName = document.querySelector(".api > .card > .name");
const tempVal = document.querySelector(".api > .card .temp > h4");
const tempIcon = document.querySelector(".api > .card > .temp > img");

fetch('https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=2a26f9f282b9a3040f9c5419c953341a&units=metric')
    .then(response => response.json()
        .then((data) => {
            console.log(data);
            locationName.textContent = data.name;
            tempVal.textContent = data.main.temp + "°C";
            const icon = data.weather[0].icon;
             tempIcon.src = "https://openweathermap.org/img/wn/" + icon + ".png";
        }))

.catch(err => alert(err))