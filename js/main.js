'use strict';

const apiLocationName = document.querySelector("#current-temps .api .name span");
const apiTempVal = document.querySelector("#current-temps .api .temp .temp-val");
const apiTempIcon = document.querySelector(".api img");

const indoorPiLocationName = document.querySelector(".pi-indoor .name > span");
const indoorPiTempVal = document.querySelector(".pi-indoor .temp > p > .temp-val");
const indoorPiLastUpdate = document.querySelector(".pi-indoor > .last-update > span");
const indoorPiTempIcon = document.querySelector(".pi-indoor > .temp > img");

const outdoorPiLocationName = document.querySelector(".pi-outdoor .name > span");
const outdoorPiTempVal = document.querySelector(".pi-outdoor .temp > p > .temp-val");
const outdoorPiLastUpdate = document.querySelector(".pi-outdoor > .last-update > span");
const outdoorPiTempIcon = document.querySelector(".pi-outdoor > .temp > img");

const alertContainer = document.querySelector(".alert-container");

const piAlert = document.querySelector(".pi-alert");
const piConfirmAlert = document.querySelector(".pi-alert > .confirm-alert");

const chartAlert = document.querySelector(".chart-alert");
const chartConfirmAlert = document.querySelector(".chart-alert > .confirm-alert");

const key = "";

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

setPiUpdateTime();

async function setPiUpdateTime() {
    let data = await getPiUpdateTime();

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
}

async function getPiUpdateTime() {

    let updateTime = await fetch(`piUpdateTime.php`)
    if (updateTime.status !== 200) return "Error, please try again later";
    return await updateTime.json();
}

controls.addEventListener('click', async (e) => {
    const type = e.target.id;
    state[type] = state[type] ? 0 : 1;
    e.target.dataset.enabled = state[type];

    if (e.target.dataset.pi != 0) {
        const f = await fetch('setControls.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(state),
        })
    }
})

updateControls();

async function updateControls() {
    const controls = await fetch(`controls.php`);
    if (controls.status !== 200) return "Error, please try again later";
    const data = await controls.json();

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

setIndoorPiData();

async function setIndoorPiData() {
    let order = "DESC";
    let indoorVal = await getIndoorPiData(order);
    let tempVal = indoorVal[0].temp_val;

    indoorPiTempVal.textContent = tempVal;
    indoorPiLastUpdate.textContent = " " + indoorVal[0].timestamp;

    switch (true) {
        case (tempVal <= 0):
            indoorPiTempIcon.src = "../assets/ice.png";
            break;
        case (tempVal > 0 && tempVal <= 10):
            indoorPiTempIcon.src = "../assets/cloud.png";
            break;
        case (tempVal > 10):
            indoorPiTempIcon.src = "../assets/sun.png";
            break;
    }
}

async function getIndoorPiData(order) {
    let data = await fetch(`indoorData.php`, {
        method: 'POST',
        body: order,
    });

    if (data.status !== 200) return "Error, please try again later";
    return await data.json();
}

setOutdoorPiData();

async function setOutdoorPiData() {
    let order = "DESC";
    let outdoorVal = await getOutdoorPiData(order);
    let tempVal = outdoorVal[0].temp_val;

    outdoorPiTempVal.textContent = tempVal;
    outdoorPiLastUpdate.textContent = " " + outdoorVal[0].timestamp;

    switch (true) {
        case (tempVal <= 0):
            outdoorPiTempIcon.src = "../assets/ice.png";
            break;
        case (tempVal > 0 && tempVal <= 10):
            outdoorPiTempIcon.src = "../assets/cloud.png";
            break;
        case (tempVal > 10):
            outdoorPiTempIcon.src = "../assets/sun.png";
            break;
    }
}

async function getOutdoorPiData(order) {
    let data = await fetch(`outdoorData.php`, {
        method: 'POST',
        body: order,
    });

    if (data.status !== 200) return "Error, please try again later";
    return await data.json();
}

setApiCurrentTemp();

async function setApiCurrentTemp() {
    let data = await getApiCurrentTemp();
    let num = data.main.temp.toFixed(1);
    let icon = data.weather[0].icon;
    apiLocationName.textContent = data.name;
    apiTempVal.textContent = num;
    apiTempIcon.src = "https://openweathermap.org/img/wn/" + icon + ".png";
}

async function getApiCurrentTemp() {
    const apiTemps = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${key}&units=metric`);
    if (apiTemps.status !== 200) return "Error, please try again later";
    return await apiTemps.json();
}

// Populate charts
indoorChart();

async function indoorChart() {
    // Load chart
    google.charts.load('current', {
        packages: ['corechart', 'line']
    });
    google.charts.setOnLoadCallback(async () => {
        let order = "ASC";
        let json = await getIndoorPiData(order);

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
                //     title: 'Timestamp',
                textPosition: 'none' // hide title
            },
            vAxis: {
                title: 'Temperature in °C'
            }
        };

        let chart = new google.visualization.LineChart(document.getElementById('indoor-chart'));
        chart.draw(data, options);
    });
}

outdoorChart();

async function outdoorChart() {
    // Load chart
    google.charts.load('current', {
        packages: ['corechart', 'line']
    });
    google.charts.setOnLoadCallback(async () => {
        let order = "ASC";
        let json = await getOutdoorPiData(order);

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
                //     title: 'Timestamp',
                textPosition: 'none' // hide title
            },
            vAxis: {
                title: 'Temperature in °C'
            }
        };

        let chart = new google.visualization.LineChart(document.getElementById('outdoor-chart'));
        chart.draw(data, options);
    });
}

setApiCurrentTempsOverWeek();

async function setApiCurrentTempsOverWeek() {
    let data = await getApiTempsOverWeek();
    apiObj["days"] = data.hourly;
}

async function getApiTempsOverWeek() {
    for (let i = 0; i < 5; i++) {
        let date = new Date();
        date.setDate(date.getDate() - i);
        let unix = Math.floor(new Date(date).getTime() / 1000);

        const apiTemps = await fetch(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=51.5085&lon=-0.1257&dt=${unix}&appid=${key}&units=metric`);
        if (apiTemps.status !== 200) return "Error, please try again later";
        return await apiTemps.json();
    }
}

apiChart();

async function apiChart() {
    // Load chart
    google.charts.load('current', {
        packages: ['corechart', 'line']
    });
    google.charts.setOnLoadCallback(async () => {
        const chartElement = document.getElementById('api-chart');
 
        if (!apiObj.days) {   
            const ele = document.createElement("p");
            ele.textContent = "Sorry, there has been an API error. Please try again later."
            chartElement.append(ele);
            return;
        }

        let jsonMap = apiObj.days.map(i => {
            return [new Date(i.dt * 1000).toLocaleDateString(), Number(i.temp)]
        })

        let data = new google.visualization.DataTable();
        data.addColumn('string', 'Date');
        data.addColumn('number', 'Temperature in °C');
        data.addRows(jsonMap);

        let options = {
            hAxis: {
                // title: 'Timestamp',
                textPosition: 'none' // hide title
            },
            vAxis: {
                title: 'Temperature'
            }
        };

        let chart = new google.visualization.LineChart(chartElement);
        chart.draw(data, options);
    });
}

// Run these functions again every 30 secs to get up to date weather + check if pi is online + chart updates
setInterval(function () {
    getPiUpdateTime();
    setApiCurrentTemp();
    setIndoorPiData();
    setOutdoorPiData();
    indoorChart();
    outdoorChart();
}, 30000)


piConfirmAlert.addEventListener('click', () => {
    piAlert.classList.add("hidden");

    setTimeout(function () {
        piAlert.classList.remove("hidden");
        piAlert.classList.add("none")
    }, 1000);
});

function chartAlertFunction() {
    chartAlert.classList.remove("hidden");

    chartConfirmAlert.addEventListener("click", () => {
        chartAlert.classList.add("hidden");
        setTimeout(function () {
            chartAlert.classList.add("none");
        }, 1000);
    })
}

window.addEventListener('resize', function () {
    chartAlertFunction();
}, true);