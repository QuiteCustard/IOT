const apiLocationName = document.querySelector("#current-temps .api .name span");
const apiTempVal = document.querySelector("#current-temps .api .temp .temp-val");
const apiTempIcon = document.querySelector(".api img");

const indoorPiLocationName = document.querySelector(".pi-indoor .name > span");
const indoorPiTempVal = document.querySelector(".pi-indoor .temp > p > .temp-val");
const indoorPiTempIcon = document.querySelector(".pi-indoor > .temp > img");

const outdoorPiLocationName = document.querySelector(".pi-outdoor .name > span");
const outdoorPiTempVal = document.querySelector(".pi-outdoor .temp > p > .temp-val");
const outdoorPiTempIcon = document.querySelector(".pi-outdoor > .temp > img");

const alertContainer = document.querySelector(".alert-container");

const piAlert = document.querySelector(".pi-alert");
const piConfirmAlert = document.querySelector(".pi-alert > .confirm-alert");

const chartAlert = document.querySelector(".chart-alert");
const chartConfirmAlert = document.querySelector(".chart-alert > .confirm-alert");

const key = "2a26f9f282b9a3040f9c5419c953341a";

const controls = document.getElementById('controls');
const ac = document.getElementById('ac');
const heating = document.getElementById('heating');
const windows = document.getElementById('window');

const state = {
    ac: 0,
    window: 0,
    heating: 0,
}

let apiObj = {};

function checkLastTime() {
    fetch(`piUpdateTime.php`)
        .then(response => response.json()
            .then((data) => {
                const indoorUpdate = data.indoor;
                const outdoorUpdate = data.outdoor;

                if (indoorUpdate > 300 && outdoorUpdate > 300) {
                    // dataset.pi is set to 0 if the pi has not updated in 5mins (the pi is offline)
                    ac.dataset.pi = 0;
                    windows.dataset.pi = 0;
                    heating.dataset.pi = 0;
                    piAlert.classList.remove("hidden");
                } else {
                    ac.dataset.pi = 1;
                    windows.dataset.pi = 1;
                    heating.dataset.pi = 1;
                }
            }))
        .catch(err => console.log(err))
}
checkLastTime();

controls.addEventListener('click', async (e) => {
    const type = e.target.id;
    state[type] = state[type] ? 0 : 1;
    e.target.dataset.enabled = state[type];

    const f = await fetch('setControls.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(state),
    })
})

async function setControls() {
    const f = await fetch(`controls.php`);
    const data = await f.json();
    if (data.ac == 1) {
        ac.dataset.enabled = 1;
        state.ac = 1;
    }
    if (data.window == 1) {
        windows.dataset.enabled = 1;
        state.window = 1;
    }
    if (data.heating == 1) {
        heating.dataset.enabled = 1;
        state.heating = 1;
    }
}

setControls();

function apiCall() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${key}&units=metric`)
        .then(response => response.json()
            .then((data) => {
                //  console.log(data); // see array
                let num = data.main.temp.toFixed(1);
                let icon = data.weather[0].icon;
                apiLocationName.textContent = data.name;
                apiTempVal.textContent = num;

                apiTempIcon.src = "https://openweathermap.org/img/wn/" + icon + ".png";
            }))
        .catch(err => console.log(err))


    for (let i = 0; i < 5; i++) {
        let date = new Date();
        date.setDate(date.getDate() - i);
        let unix = Math.floor(new Date(date).getTime() / 1000);

        fetch(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=51.5085&lon=-0.1257&dt=${unix}&appid=${key}&units=metric`)
            .then(response => response.json()
                .then((data) => {
                    console.log(data)
                    apiObj["days"] = data.hourly;
                }))
            .catch(err => console.log(err))
    }
}

function indoorPiCall() {
    const val = indoorPiTempVal.textContent;
    switch (true) {
        case (val <= 0):
            indoorPiTempIcon.src = "../assets/ice.png";
            break;
        case (val > 0 && val <= 10):
            indoorPiTempIcon.src = "../assets/cloud.png";
            break;
        case (val > 10):
            indoorPiTempIcon.src = "../assets/sun.png";
            break;
    }
}

function outdoorPiCall() {
    const val = outdoorPiTempVal.textContent;
    switch (true) {
        case (val <= 0):
            outdoorPiTempIcon.src = "../assets/ice.png";
            break;
        case (val > 0 && val <= 10):
            outdoorPiTempIcon.src = "../assets/cloud.png";
            break;
        case (val > 10):
            outdoorPiTempIcon.src = "../assets/sun.png";
            break;
    }
}

apiCall();
outdoorPiCall();
indoorPiCall();


setInterval(function () {
    // Run these functions again every 30 secs to get up to date weather + check if pi is online
    checkLastTime();
    outdoorPiCall();
    indoorPiCall();
}, 30000)


function piConfirmAlertFunction() {
    piAlert.classList.add("hidden");

    setTimeout(function () {
        piAlert.classList.remove("hidden");
        piAlert.classList.add("none")
    }, 1000);
}

piConfirmAlert.addEventListener('click', piConfirmAlertFunction);

async function indoorChart() {
    // Load chart
    google.charts.load('current', {
        packages: ['corechart', 'line']
    });
    google.charts.setOnLoadCallback(async () => {
        const getFetchData = await fetch(`indoorData.php`);
        const json = await getFetchData.json();

        // Map json to array
        const jsonMap = json.map(i => {
            // Convert to correct types for columns
            return [new Date(i.timestamp).toLocaleDateString(), Number(i.temp_val)]
        })

        let data = new google.visualization.DataTable();
        data.addColumn('string', 'Date');
        data.addColumn('number', 'Temperature in °C');
        data.addRows(jsonMap);

        let options = {
            hAxis: {
                title: 'Timestamp',
                textPosition: 'none' // hide title
            },
            vAxis: {
                title: 'Temperature'
            }
        };

        let chart = new google.visualization.LineChart(document.getElementById('indoor-chart'));
        chart.draw(data, options);
    });
}
indoorChart();

async function outdoorChart() {
    // Load chart
    google.charts.load('current', {
        packages: ['corechart', 'line']
    });
    google.charts.setOnLoadCallback(async () => {
        const getFetchData = await fetch(`outdoorData.php`);
        const json = await getFetchData.json();

        // Map json to array
        const jsonMap = json.map(i => {
            // Convert to correct types for columns
            return [new Date(i.timestamp).toLocaleDateString(), Number(i.temp_val)]
        })

        let data = new google.visualization.DataTable();
        data.addColumn('string', 'Date');
        data.addColumn('number', 'Temperature in °C');
        data.addRows(jsonMap);

        let options = {
            hAxis: {
                title: 'Timestamp',
                textPosition: 'none' // hide title
            },
            vAxis: {
                title: 'Temperature'
            }
        };

        let chart = new google.visualization.LineChart(document.getElementById('outdoor-chart'));
        chart.draw(data, options);
    });
}

outdoorChart();

async function apiChart() {
    // Load chart
    google.charts.load('current', {
        packages: ['corechart', 'line']
    });
    google.charts.setOnLoadCallback(async () => {
        console.log(apiObj);
        let jsonMap = apiObj.days.map(i => {
            return [new Date(i.dt * 1000).toLocaleDateString(), Number(i.temp)]
            
        })
        console.log(apiObj.days[0].dt*1000)
        let data = new google.visualization.DataTable();
        data.addColumn('string', 'Date');
        data.addColumn('number', 'Temperature in °C');
        data.addRows(jsonMap);

        let options = {
            hAxis: {
                title: 'Timestamp',
                textPosition: 'none' // hide title
            },
            vAxis: {
                title: 'Temperature'
            }
        };

        let chart = new google.visualization.LineChart(document.getElementById('api-chart'));
        chart.draw(data, options);
    });
}
apiChart();


function chartAlertFunction() {
    chartAlert.classList.remove("hidden");

    chartConfirmAlert.addEventListener("click", function () {
        chartAlert.classList.add("hidden");
        setTimeout(function () {
            chartAlert.classList.add("none");
        }, 1000);
    })
}

window.addEventListener('resize', function () {
    chartAlertFunction();
}, true);