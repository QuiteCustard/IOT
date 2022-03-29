const apiLocationName = document.querySelector(".api > .name > span");
const apiTempVal = document.querySelector(".api .temp > p > .temp-val");
const apiTempIcon = document.querySelector(".api > .temp > img");

const piLocationName = document.querySelector(".pi .name > span");
const piTempVal = document.querySelector(".pi .temp > p > .temp-val");
const piTempIcon = document.querySelector(".pi > .temp > img");

function apiCall() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=2a26f9f282b9a3040f9c5419c953341a&units=metric')
        .then(response => response.json()
            .then((data) => {
                console.log(data);
                
                let num = data.main.temp.toFixed(1);
                let icon = data.weather[0].icon;

                apiLocationName.textContent = data.name;
                apiTempVal.textContent = num;

                apiTempIcon.src = "https://openweathermap.org/img/wn/" + icon + ".png";
            }))

        .catch(err => alert(err))
}

function piCall() {
    const val = piTempVal.textContent;
    switch (true) {
        case (val <= 0):
            piTempIcon.src = "../assets/ice.png";
            break;
        case (val > 0 && val <= 10):
            piTempIcon.src = "../assets/cloud.png";
            break;
        case (val > 10):
            piTempIcon.src = "../assets/sun.png";
            break;
    }
}

apiCall();
piCall();