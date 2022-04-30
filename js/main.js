const apiLocationName = document.querySelector(".current-temps .api .name span");
const apiTempVal = document.querySelector(".current-temps .api .temp .temp-val");
const apiTempIcon = document.querySelector(".api img");

const indoorPiLocationName = document.querySelector(".pi-indoor .name > span");
const indoorPiTempVal = document.querySelector(".pi-indoor .temp > p > .temp-val");
const indoorPiTempIcon = document.querySelector(".pi-indoor > .temp > img");

const outdoorPiLocationName = document.querySelector(".pi-outdoor .name > span");
const outdoorPiTempVal = document.querySelector(".pi-outdoor .temp > p > .temp-val");
const outdoorPiTempIcon = document.querySelector(".pi-outdoor > .temp > img");

const alertElement = document.querySelector(".pi-alert");
const confirmAlert = document.querySelector(".pi-alert > .confirm-alert");

const alertContainer = document.querySelector(".alert-container");
const chartAlertEle = document.querySelector(".chart-alert");
const alertButton = document.querySelector(".chart-alert > .confirm-alert");

const key = "2a26f9f282b9a3040f9c5419c953341a";

function apiCall() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${key}&units=metric`)
        .then(response => response.json()
            .then((data) => {
                console.log(data);

                let num = data.main.temp.toFixed(1);
                let icon = data.weather[0].icon;

                apiLocationName.textContent = data.name;
                apiTempVal.textContent = num;

                apiTempIcon.src = "https://openweathermap.org/img/wn/" + icon + ".png";
            }))
        .catch(err => console.log(err))
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

function confirmAlertFunction() {
    alertElement.classList.add("hidden");

    setTimeout(function () {
        alertElement.classList.remove("hidden");
        alertElement.classList.add("none")
    }, 1000);
}

confirmAlert.addEventListener('click', confirmAlertFunction);

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
            return [new Date(i.timestamp), Number(i.temp_val)]
        })

        let data = new google.visualization.DataTable();
        data.addColumn('date', 'Date');
        data.addColumn('number', 'Temperature in °C');
        data.addRows(jsonMap);

        let options = {
            hAxis: {
                title: 'Timestamp'
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
            return [new Date(i.timestamp), Number(i.temp_val)]
        })

        let data = new google.visualization.DataTable();
        data.addColumn('date', 'Date');
        data.addColumn('number', 'Temperature in °C');
        data.addRows(jsonMap);

        let options = {
            hAxis: {
                title: 'Timestamp'
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

function chartAlert() {
    chartAlertEle.classList.remove("hidden");

    alertButton.addEventListener("click", function () {
        chartAlertEle.classList.add("hidden");
        setTimeout(function () {
            chartAlertEle.classList.add("none");
        }, 1000);
    })
}

window.addEventListener('resize', function () {
    chartAlert();
}, true);