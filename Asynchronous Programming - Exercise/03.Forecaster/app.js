function attachEvents() {

    document.getElementById("submit").addEventListener('click', getWeather);
    let forecastSectionRef = document.getElementById("forecast");
    let locationInputRef = document.getElementById("location");
    let currentRef = document.getElementById("current");
    let upcomingRef = document.getElementById("upcoming");

    let locationURL = `http://localhost:3030/jsonstore/forecaster/locations`
    //let locationURL = `http://localhost:3030/jsonstore/forecaster/2cc6e324-6220-4d7b-a72c-7961890f00db/locations`

    let todayURL = 'http://localhost:3030/jsonstore/forecaster/today/'
    //let todayURL = 'http://localhost:3030/jsonstore/forecaster/2cc6e324-6220-4d7b-a72c-7961890f00db/today/'

    let upcomingURL = 'http://localhost:3030/jsonstore/forecaster/upcoming/'
    //let upcomingURL = 'http://localhost:3030/jsonstore/forecaster/2cc6e324-6220-4d7b-a72c-7961890f00db/upcoming/'

    let conditionWeather = {
        "Sunny": "&#x2600",
        "Partly sunny": "&#x26C5",
        "Overcast": "&#x2601",
        "Rain": "&#x2614",
        "Degrees": "&#176"
    }

    async function getWeather(e){
        
        try {
        let userInput = locationInputRef.value;
        forecastSectionRef.style.display = "block";

        let locationRes = await fetch(locationURL);
        let locationData = await locationRes.json();

        let currentLocationData = locationData.find(x => x.name == userInput);
        
        await fillTodayData(currentLocationData.code);
        await fillUpcomingData(currentLocationData.code);
        } catch (err) {
            forecastSectionRef.textContent = 'Error'
        }
    }

    async function fillUpcomingData(code) {

        let res = await fetch(upcomingURL + code);
        let data = await res.json();

        console.log(data.forecast[0].condition, data.forecast[0].low)

        let forecastInfo = createUpcomingSection(data);
        upcomingRef.appendChild(forecastInfo);
    }

    function createUpcomingSection(data) {
        let container = document.createElement('div');
        container.className = "forecast-info";

        let spanContainer1 = document.createElement("span");
        spanContainer1.className = "upcoming";

        let spanCond = document.createElement("span");
        spanCond.className = "symbol";
        spanCond.innerHTML = conditionWeather[data.forecast[0].condition];

        let degree = document.createElement("span");
        degree.className = "forecast-data";
        degree.innerHTML = `${data.forecast[0].low}${conditionWeather.Degrees}/${data.forecast[0].high}${conditionWeather.Degrees}`;

        let cond = document.createElement("span");
        cond.className = "forecast-data";
        cond.textContent = data.forecast[0].condition;

        spanContainer1.appendChild(spanCond);
        spanContainer1.appendChild(degree);
        spanContainer1.appendChild(cond);
        container.appendChild(spanContainer1);

        let spanContainer2 = document.createElement("span");
        spanContainer2.className = "upcoming";

        let spanCond2 = document.createElement("span");
        spanCond2.className = "symbol";
        spanCond2.innerHTML = conditionWeather[data.forecast[1].condition];

        let degree2 = document.createElement("span");
        degree2.className = "forecast-data";
        degree2.innerHTML = `${data.forecast[1].low}${conditionWeather.Degrees}/${data.forecast[1].high}${conditionWeather.Degrees}`;

        let cond2 = document.createElement("span");
        cond2.className = "forecast-data";
        cond2.textContent = data.forecast[1].condition;

        spanContainer2.appendChild(spanCond2);
        spanContainer2.appendChild(degree2);
        spanContainer2.appendChild(cond2);
        container.appendChild(spanContainer2);

        let spanContainer3 = document.createElement("span");
        spanContainer3.className = "upcoming";

        let spanCond3 = document.createElement("span");
        spanCond3.className = "symbol";
        spanCond3.innerHTML = conditionWeather[data.forecast[2].condition];

        let degree3 = document.createElement("span");
        degree3.className = "forecast-data";
        degree3.innerHTML = `${data.forecast[2].low}${conditionWeather.Degrees}/${data.forecast[2].high}${conditionWeather.Degrees}`;

        let cond3 = document.createElement("span");
        cond3.className = "forecast-data";
        cond3.textContent = data.forecast[2].condition;

        spanContainer3.appendChild(spanCond3);
        spanContainer3.appendChild(degree3);
        spanContainer3.appendChild(cond3);
        container.appendChild(spanContainer3);

        return container;        
    }

    async function fillTodayData(code) {

        let res = await fetch(todayURL + code);
        let data = await res.json();
        
        let todayInfo = createForecastTodaySection(data)
        currentRef.appendChild(todayInfo);
    }

    function createForecastTodaySection(data) {
        let container = document.createElement('div');
        container.className = "forecasts";
        let conditionSpan = document.createElement("span");
        conditionSpan.classList.add("condition");
        conditionSpan.classList.add("symbol");
        conditionSpan.innerHTML = conditionWeather[data.forecast.condition];
        container.appendChild(conditionSpan);

        let spanContainer = document.createElement("span");
        spanContainer.className = "condition";

        let spanName = document.createElement("span");
        spanName.className = "forecast-data";
        spanName.textContent = data.name;

        let degree = document.createElement("span");
        degree.className = "forecast-data";
        degree.innerHTML = `${data.forecast.low}${conditionWeather.Degrees}/${data.forecast.high}${conditionWeather.Degrees}`;

        let cond = document.createElement("span");
        cond.className = "forecast-data";
        cond.textContent = data.forecast.condition;

        spanContainer.appendChild(spanName);
        spanContainer.appendChild(degree);
        spanContainer.appendChild(cond);
        container.appendChild(spanContainer);


        return container;
    }
}

attachEvents();