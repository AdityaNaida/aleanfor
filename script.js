//search input box pop up
let search_button = document.querySelector(`#search-btn`);
let search_input = document.querySelector(`#search-box input`);

search_button.addEventListener(`click`, () => {
  search_input.style.display = "block";
});

let input_box = document.querySelector(`#search-box input`);
let search_btn = document.querySelector(`#search-btn`);
let current_location = document.querySelector(`.user-current-location`);
let weatherimage = document.querySelectorAll(`.currentWeather`);
let currentWeather_background = document.querySelector(`#current-weather-bg`);
let weatherStatus_image_array = Object.values(weatherimage);
let upcoming_1_weather_image = document.querySelector(`.upcoming1_image`);
let upcoming_2_weather_image = document.querySelector(`.upcoming2_image`);
let upcoming_3_weather_image = document.querySelector(`.upcoming3_image`);
let upcoming_4_weather_image = document.querySelector(`.upcoming4_image`);

let next_day_1_image = document.querySelector(`.day1_image`);
let next_day_2_image = document.querySelector(`.day2_image`);
let next_day_3_image = document.querySelector(`.day3_image`);
let next_day_4_image = document.querySelector(`.day4_image`);

const UserCurrentLocation=()=>{
  
  const status= document.querySelector(`.user_status`);

  const success=async(position)=>{
    console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const geoLocationApi = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

    fetch(geoLocationApi)
    .then((res)=>{return res.json()})
    .then((response2)=>{
      console.log(response2);
    status.innerHTML = response2.city ;
    const apiKey = `8b074109e61cf635ab22445ba896ee44`;
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=${response2.city}`;
  const response = fetch(apiUrl + `&appid=${apiKey}`);
  response.then((response)=> response.json())
  .then((data)=>{ 
    console.log(data)
      
    //Get The day name function
    const getDayName=(date)=>{
      const Input_date = new Date(date);
      const daysOfWeek = [`Sunday`,`Monday`,`Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`];
      const dayIndex = Input_date.getDay();
      const dayName = daysOfWeek[dayIndex];
      return dayName;
    }

    const getSunRiseandSunetTime = (unixTimeStamp) => {
      const date = new Date(unixTimeStamp * 1000); // Convert to milliseconds
      // Extract individual components
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      const time = `${hours}:${minutes}:${seconds}`;
      return time;
    };
  
    const getCurrentDate = (unixTimeStamp) => {
      const date = new Date(unixTimeStamp * 1000); // Convert to milliseconds
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // Months are zero-based, so add 1
      const day = date.getDate();
      const formattedTime = `${day} / ${month} / ${year}`;
      return formattedTime;
    };

    const dateToUnixStampTimeConvert=(dateString)=>{
      const date = new Date(dateString);
      const unixTimeStamp = Math.floor(date.getTime() / 1000);
      return unixTimeStamp;
    }
    
     const GetPreviousDayUnixStamp=(UnixCurrentDate)=>{
     let oneDayInSeconds = 24 * 60 * 60 ;
     let previousDayUnixStamp = UnixCurrentDate - oneDayInSeconds ;
     return previousDayUnixStamp;
     }

    const getDayNamefromUnix =(timestamp)=>{
      let weeksOftheDay = [`Sunday`,`Monday`,`Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`];
      let date = new Date(timestamp * 1000);
      let day = weeksOftheDay[date.getDay()];
      return day;
    }
  
    const GetCurrentPollution=async(ApiKey, lattitude, longitude)=>{
      const CurrentPolutionURL = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lattitude}&lon=${longitude}&appid=${ApiKey}`
      let CurrentPolutionResponse = await fetch(CurrentPolutionURL);
      var CurrentPolutionData = await CurrentPolutionResponse.json();
      console.log(CurrentPolutionData);
      
    //Air Quality Index Parameters
  
    //Current Air Quality Index 
  
    if(CurrentPolutionData.list[0].main.aqi == '1'){
      document.querySelector(`.current-aqi-index`).innerHTML = `0 - 50`;
      document.querySelector(`.current-pollution-status`).innerHTML = `Good`;
    }
    else if(CurrentPolutionData.list[0].main.aqi == '2'){
      document.querySelector(`.current-aqi-index`).innerHTML = `51 - 100`;
      document.querySelector(`.current-pollution-status`).innerHTML = `Fair`;
    }
    else if(CurrentPolutionData.list[0].main.aqi == '3'){
      document.querySelector(`.current-aqi-index`).innerHTML = `101 - 150`;
      document.querySelector(`.current-pollution-status`).innerHTML = `Moderate`;
    }
    else if(CurrentPolutionData.list[0].main.aqi == '4'){
      document.querySelector(`.current-aqi-index`).innerHTML = `151 - 200`;
      document.querySelector(`.current-pollution-status`).innerHTML = `Poor`;
    }
    else if(CurrentPolutionData.list[0].main.aqi == '5'){
      document.querySelector(`.current-aqi-index`).innerHTML = `201 - 300`;
      document.querySelector(`.current-pollution-status`).innerHTML = `Very Poor`;
    }
    }

    
  const GetForecastPollution=async(Apikey, lattitude, longitude)=>{
    const ForesCastPollutionURL = `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lattitude}&lon=${longitude}&appid=${Apikey}`
    let forecastPollutionResponse = await fetch(ForesCastPollutionURL);
    var forecastPolutionData = await forecastPollutionResponse.json()
      console.log(forecastPolutionData);
  
     //Forecast Air Quality Index 
  
     //Forecast AQI day 1
     document.querySelector(`.aqi-forecast-date-1`).innerHTML = getCurrentDate(forecastPolutionData.list[24].dt);
     document.querySelector(`.aqi-forecast-day-1`).innerHTML = getDayNamefromUnix(forecastPolutionData.list[24].dt); 
  
     
    if(forecastPolutionData.list[24].main.aqi == '1'){
      document.querySelector(`.forecast-aqi-index-1`).innerHTML = `0 - 50`;
      document.querySelector(`.forecast-aqi-index-1-pollution-status`).innerHTML = `Good`;
    }
    else if(forecastPolutionData.list[24].main.aqi == '2'){
      document.querySelector(`.forecast-aqi-index-1`).innerHTML = `51 - 100`;
      document.querySelector(`.forecast-aqi-index-1-pollution-status`).innerHTML = `Fair`;
    }
    else if(forecastPolutionData.list[24].main.aqi == '3'){
      document.querySelector(`.forecast-aqi-index-1`).innerHTML = `101 - 150`;
      document.querySelector(`.forecast-aqi-index-1-pollution-status`).innerHTML = `Moderate`;
    }
    else if(forecastPolutionData.list[24].main.aqi == '4'){
      document.querySelector(`.forecast-aqi-index-1`).innerHTML = `151 - 200`;
      document.querySelector(`.forecast-aqi-index-1-pollution-status`).innerHTML = `Poor`;
    }
    else if(forecastPolutionData.list[24].main.aqi == '5'){
      document.querySelector(`.forecast-aqi-index-1`).innerHTML = `201 - 300`;
      document.querySelector(`.forecast-aqi-index-1-pollution-status`).innerHTML = `Very Poor`;
    }
  
  //Forecast AQI day 2
  document.querySelector(`.aqi-forecast-date-2`).innerHTML = getCurrentDate(forecastPolutionData.list[48].dt);
  document.querySelector(`.aqi-forecast-day-2`).innerHTML = getDayNamefromUnix(forecastPolutionData.list[48].dt); 
  if(forecastPolutionData.list[48].main.aqi == '1'){
    document.querySelector(`.forecast-aqi-index-2`).innerHTML = `0 - 50`;
    document.querySelector(`.forecast-aqi-index-2-pollution-status`).innerHTML = `Good`;
  }
  else if(forecastPolutionData.list[48].main.aqi == '2'){
    document.querySelector(`.forecast-aqi-index-2`).innerHTML = `51 - 100`;
    document.querySelector(`.forecast-aqi-index-2-pollution-status`).innerHTML = `Fair`;
  }
  else if(forecastPolutionData.list[48].main.aqi == '3'){
    document.querySelector(`.forecast-aqi-index-2`).innerHTML = `101 - 150`;
    document.querySelector(`.forecast-aqi-index-2-pollution-status`).innerHTML = `Moderate`;
  }
  else if(forecastPolutionData.list[48].main.aqi == '4'){
    document.querySelector(`.forecast-aqi-index-2`).innerHTML = `151 - 200`;
    document.querySelector(`.forecast-aqi-index-2-pollution-status`).innerHTML = `Poor`;
  }
  else if(forecastPolutionData.list[48].main.aqi == '5'){
    document.querySelector(`.forecast-aqi-index-2`).innerHTML = `201 - 300`;
    document.querySelector(`.forecast-aqi-index-2-pollution-status`).innerHTML = `Very Poor`;
  }
  //Forecast AQI day 3
  document.querySelector(`.aqi-forecast-date-3`).innerHTML = getCurrentDate(forecastPolutionData.list[72].dt);
  document.querySelector(`.aqi-forecast-day-3`).innerHTML = getDayNamefromUnix(forecastPolutionData.list[72].dt); 
  
  if(forecastPolutionData.list[72].main.aqi == '1'){
    document.querySelector(`.forecast-aqi-index-3`).innerHTML = `0 - 50`;
    document.querySelector(`.forecast-aqi-index-3-pollution-status`).innerHTML = `Good`;
  }
  else if(forecastPolutionData.list[72].main.aqi == '2'){
    document.querySelector(`.forecast-aqi-index-3`).innerHTML = `51 - 100`;
    document.querySelector(`.forecast-aqi-index-3-pollution-status`).innerHTML = `Fair`;
  }
  else if(forecastPolutionData.list[72].main.aqi == '3'){
    document.querySelector(`.forecast-aqi-index-3`).innerHTML = `101 - 150`;
    document.querySelector(`.forecast-aqi-index-3-pollution-status`).innerHTML = `Moderate`;
  }
  else if(forecastPolutionData.list[72].main.aqi == '4'){
    document.querySelector(`.forecast-aqi-index-3`).innerHTML = `151 - 200`;
    document.querySelector(`.forecast-aqi-index-3-pollution-status`).innerHTML = `Poor`;
  }
  else if(forecastPolutionData.list[72].main.aqi == '5'){
    document.querySelector(`.forecast-aqi-index-3`).innerHTML = `201 - 300`;
    document.querySelector(`.forecast-aqi-index-3-pollution-status`).innerHTML = `Very Poor`;
  }
  //Forecast AQI day 4
  document.querySelector(`.aqi-forecast-date-4`).innerHTML = getCurrentDate(forecastPolutionData.list[95].dt);
  document.querySelector(`.aqi-forecast-day-4`).innerHTML = getDayNamefromUnix(forecastPolutionData.list[95].dt); 
  
  if(forecastPolutionData.list[95].main.aqi == '1'){
    document.querySelector(`.forecast-aqi-index-4`).innerHTML = `0 - 50`;
    document.querySelector(`.forecast-aqi-index-4-pollution-status`).innerHTML = `Good`;
  }
  else if(forecastPolutionData.list[95].main.aqi == '2'){
    document.querySelector(`.forecast-aqi-index-4`).innerHTML = `51 - 100`;
    document.querySelector(`.forecast-aqi-index-4-pollution-status`).innerHTML = `Fair`;
  }
  else if(forecastPolutionData.list[95].main.aqi == '3'){
    document.querySelector(`.forecast-aqi-index-4`).innerHTML = `101 - 150`;
    document.querySelector(`.forecast-aqi-index-4-pollution-status`).innerHTML = `Moderate`;
  }
  else if(forecastPolutionData.list[95].main.aqi == '4'){
    document.querySelector(`.forecast-aqi-index-4`).innerHTML = `151 - 200`;
    document.querySelector(`.forecast-aqi-index-4-pollution-status`).innerHTML = `Poor`;
  }
  else if(forecastPolutionData.list[95].main.aqi == '5'){
    document.querySelector(`.forecast-aqi-index-4`).innerHTML = `201 - 300`;
    document.querySelector(`.forecast-aqi-index-4-pollution-status`).innerHTML = `Very Poor`;
  }
}

const GetHistoricalPolution =async(Apikey, lattitude, longitude, statrtUnixTime, endsUnixTime)=>{
  const HistoricalPollutionURL = `http://api.openweathermap.org/data/2.5/air_pollution/history?lat=${lattitude}&lon=${longitude}&start=${statrtUnixTime}&end=${endsUnixTime}&appid=${Apikey}`
  let historicalPollutionResponse = await fetch(HistoricalPollutionURL);
  var historicalPollutionData = await historicalPollutionResponse.json();
  console.log(historicalPollutionData); 


 //Historical AQI day 1
 document.querySelector(`.aqi-historical-date-1`).innerHTML = getCurrentDate(historicalPollutionData.list[72].dt);
 document.querySelector(`.aqi-historical-day-1`).innerHTML = getDayNamefromUnix(historicalPollutionData.list[72].dt);

 if(historicalPollutionData.list[72].main.aqi == '1'){
  document.querySelector(`.historical-aqi-index-1`).innerHTML = `0 - 50`;
  document.querySelector(`.historical-aqi-index-1-pollution-status`).innerHTML = `Good`;
}
else if(historicalPollutionData.list[72].main.aqi == '2'){
  document.querySelector(`.historical-aqi-index-1`).innerHTML = `51 - 100`;
  document.querySelector(`.historical-aqi-index-1-pollution-status`).innerHTML = `Fair`;
}
else if(historicalPollutionData.list[72].main.aqi == '3'){
  document.querySelector(`.historical-aqi-index-1`).innerHTML = `101 - 150`;
  document.querySelector(`.historical-aqi-index-1-pollution-status`).innerHTML = `Moderate`;
}
else if(historicalPollutionData.list[72].main.aqi == '4'){
  document.querySelector(`.historical-aqi-index-1`).innerHTML = `151 - 200`;
  document.querySelector(`.historical-aqi-index-1-pollution-status`).innerHTML = `Poor`;
}
else if(historicalPollutionData.list[72].main.aqi == '5'){
  document.querySelector(`.historical-aqi-index-1`).innerHTML = `201 - 300`;
  document.querySelector(`.historical-aqi-index-1-pollution-status`).innerHTML = `Very Poor`;
}
//Historical AQI day 2
document.querySelector(`.aqi-historical-date-2`).innerHTML = getCurrentDate(historicalPollutionData.list[48].dt);
document.querySelector(`.aqi-historical-day-2`).innerHTML = getDayNamefromUnix(historicalPollutionData.list[48].dt);

if(historicalPollutionData.list[48].main.aqi == '1'){
  document.querySelector(`.historical-aqi-index-2`).innerHTML = `0 - 50`;
  document.querySelector(`.historical-aqi-index-2-pollution-status`).innerHTML = `Good`;
}
else if(historicalPollutionData.list[48].main.aqi == '2'){
  document.querySelector(`.historical-aqi-index-2`).innerHTML = `51 - 100`;
  document.querySelector(`.historical-aqi-index-2-pollution-status`).innerHTML = `Fair`;
}
else if(historicalPollutionData.list[48].main.aqi == '3'){
  document.querySelector(`.historical-aqi-index-2`).innerHTML = `101 - 150`;
  document.querySelector(`.historical-aqi-index-2-pollution-status`).innerHTML = `Moderate`;
}
else if(historicalPollutionData.list[48].main.aqi == '4'){
  document.querySelector(`.historical-aqi-index-2`).innerHTML = `151 - 200`;
  document.querySelector(`.historical-aqi-index-2-pollution-status`).innerHTML = `Poor`;
}
else if(historicalPollutionData.list[48].main.aqi == '5'){
  document.querySelector(`.historical-aqi-index-2`).innerHTML = `201 - 300`;
  document.querySelector(`.historical-aqi-index-2-pollution-status`).innerHTML = `Very Poor`;
}
//Historical AQI day 3
 document.querySelector(`.aqi-historical-date-3`).innerHTML = getCurrentDate(historicalPollutionData.list[24].dt);
 document.querySelector(`.aqi-historical-day-3`).innerHTML = getDayNamefromUnix(historicalPollutionData.list[24].dt);

 if(historicalPollutionData.list[24].main.aqi == '1'){
  document.querySelector(`.historical-aqi-index-3`).innerHTML = `0 - 50`;
  document.querySelector(`.historical-aqi-index-3-pollution-status`).innerHTML = `Good`;
}
else if(historicalPollutionData.list[24].main.aqi == '2'){
  document.querySelector(`.historical-aqi-index-3`).innerHTML = `51 - 100`;
  document.querySelector(`.historical-aqi-index-3-pollution-status`).innerHTML = `Fair`;
}
else if(historicalPollutionData.list[24].main.aqi == '3'){
  document.querySelector(`.historical-aqi-index-3`).innerHTML = `101 - 150`;
  document.querySelector(`.historical-aqi-index-3-pollution-status`).innerHTML = `Moderate`;
}
else if(historicalPollutionData.list[24].main.aqi == '4'){
  document.querySelector(`.historical-aqi-index-3`).innerHTML = `151 - 200`;
  document.querySelector(`.historical-aqi-index-3-pollution-status`).innerHTML = `Poor`;
}
else if(historicalPollutionData.list[24].main.aqi == '5'){
  document.querySelector(`.historical-aqi-index-3`).innerHTML = `201 - 300`;
  document.querySelector(`.historical-aqi-index-3-pollution-status`).innerHTML = `Very Poor`;
}
//Historical AQI day 4
document.querySelector(`.aqi-historical-date-4`).innerHTML = getCurrentDate(historicalPollutionData.list[0].dt);
document.querySelector(`.aqi-historical-day-4`).innerHTML = getDayNamefromUnix(historicalPollutionData.list[0].dt);

if(historicalPollutionData.list[0].main.aqi == '1'){
  document.querySelector(`.historical-aqi-index-4`).innerHTML = `0 - 50`;
  document.querySelector(`.historical-aqi-index-4-pollution-status`).innerHTML = `Good`;
}
else if(historicalPollutionData.list[0].main.aqi == '2'){
  document.querySelector(`.historical-aqi-index-4`).innerHTML = `51 - 100`;
  document.querySelector(`.historical-aqi-index-4-pollution-status`).innerHTML = `Fair`;
}
else if(historicalPollutionData.list[0].main.aqi == '3'){
  document.querySelector(`.historical-aqi-index-4`).innerHTML = `101 - 150`;
  document.querySelector(`.historical-aqi-index-4-pollution-status`).innerHTML = `Moderate`;
}
else if(historicalPollutionData.list[0].main.aqi == '4'){
  document.querySelector(`.historical-aqi-index-4`).innerHTML = `151 - 200`;
  document.querySelector(`.historical-aqi-index-4-pollution-status`).innerHTML = `Poor`;
}
else if(historicalPollutionData.list[0].main.aqi == '5'){
  document.querySelector(`.historical-aqi-index-4`).innerHTML = `201 - 300`;
  document.querySelector(`.historical-aqi-index-4-pollution-status`).innerHTML = `Very Poor`;
}
}

//getting current date 

const raw_date_current = data.list[0].dt_txt;
const raw_date_current_split = raw_date_current.split(' ');
const raw_date_current_slice = raw_date_current_split[0];

let CurrentTimeStamp = dateToUnixStampTimeConvert(raw_date_current_slice);
let yesterdayUnixTimeStamp = GetPreviousDayUnixStamp(CurrentTimeStamp);
let yesterdayPreviousDayUnixTimeStamp = GetPreviousDayUnixStamp(yesterdayUnixTimeStamp);
let yesterdayPreviousDayUnixTimeStamp2 = GetPreviousDayUnixStamp(yesterdayPreviousDayUnixTimeStamp);
let yesterdayPreviousDayUnixTimeStamp3 = GetPreviousDayUnixStamp(yesterdayPreviousDayUnixTimeStamp2);


GetCurrentPollution(apiKey, data.city.coord.lat, data.city.coord.lon);
GetForecastPollution(apiKey, data.city.coord.lat, data.city.coord.lon);
GetHistoricalPolution(apiKey, data.city.coord.lat, data.city.coord.lon , yesterdayPreviousDayUnixTimeStamp3,
yesterdayUnixTimeStamp);




     //Current Image chaning
  
     if (data.list[0].weather[0].main == "Clouds") {
      weatherStatus_image_array.forEach((image) => {
        image.src = `images/clouds.png`;
        currentWeather_background.style.background =`images/cloudy-sky.jpg`;
      });
    } else if (data.list[0].weather[0].main == "Clear") {
      weatherStatus_image_array.forEach((image) => {
        image.src = `images/clear.png`;
        currentWeather_background.style.background= `images/clear-sky.jpg`;
      });
    } else if (data.list[0].weather[0].main == "Rain") {
      weatherStatus_image_array.forEach((image) => {
        image.src = `images/rain.png`;
        currentWeather_background.style.background =`images/rainy-sky.jpg`;
      });
    } else if (data.list[0].weather[0].main == "Drizzle") {
      weatherStatus_image_array.forEach((image) => {
        image.src = `images/drizzle.png`;
        currentWeather_background.style.background= `images/drizzle-sky.jpg`;
      });
    } else if (data.list[0].weather[0].main == "Mist") {
      weatherStatus_image_array.forEach((image) => {
        image.src = `images/mist.png`;
        currentWeather_background.style.background =`images/mist-sky.jpg`;
      });
    }
  
    document.querySelector(`.tempreature`).innerHTML = Math.round(data.list[0].main.temp);
    document.querySelector(`.city`).innerHTML = data.city.name;
    document.querySelector(`.country`).innerHTML = data.city.country;
    document.querySelector(`.sunrise`).innerHTML =
      getSunRiseandSunetTime(data.city.sunrise) + ` a.m`;
    document.querySelector(`.sunset`).innerHTML =
      getSunRiseandSunetTime(data.city.sunset) + ` p.m`;
    document.querySelector(`.humidity`).innerHTML = data.list[0].main.humidity;
    document.querySelector(`.humidity-small`).innerHTML =
      data.list[0].main.humidity;
    document.querySelector(`.wind`).innerHTML = data.list[0].wind.speed;
    document.querySelector(`.wind-small`).innerHTML = data.list[0].wind.speed;
    document.querySelector(`.sky`).innerHTML =
      data.list[0].weather[0].description;
    document.querySelector(`.sky-small`).innerHTML =
      data.list[0].weather[0].description;
    document.querySelector(`.preassure`).innerHTML = data.list[0].main.pressure;
    document.querySelector(`.preassure-small`).innerHTML =
      data.list[0].main.pressure;
    //get current date
    let raw_date = data.list[0].dt_txt;
    let time_date_split = raw_date.split(" ");
    // document.querySelector(`.date`).innerHTML = time_date_split[0];
    document.querySelector(`.date`).innerHTML = getCurrentDate(data.city.sunrise);
    document.querySelector(`.max-tempreature`).innerHTML =
      data.list[0].main.temp_max;
    document.querySelector(`.max-tempreature-small`).innerHTML =
      data.list[0].main.temp_max;
    document.querySelector(`.min-tempreature`).innerHTML =
      data.list[0].main.temp_min;
    document.querySelector(`.min-tempreature-small`).innerHTML =
      data.list[0].main.temp_min;
    document.querySelector(`.feels-like`).innerHTML = Math.round(
      data.list[0].main.feels_like
    );
    document.querySelector(`.feels-like-small`).innerHTML =
      data.list[0].main.feels_like;
  
    //First Upcoming Weather data box
    let upcoming_time_1 = data.list[1].dt_txt;
    let upcoming_time_parts = upcoming_time_1.split(" ");
    document.querySelector(`.upcoming-time-1`).innerHTML = upcoming_time_parts[1];
    document.querySelector(`.upcoming-temp-1`).innerHTML =
      Math.round(data.list[1].main.temp) + ` °C`;
    document.querySelector(`.upcoming-1-humidity`).innerHTML =
      data.list[1].main.humidity + `%`;
    document.querySelector(`.upcoming-1-wind`).innerHTML =
      data.list[1].wind.speed + ` km/h`;
    //Upcoming 1 image changing using if else
    if (data.list[1].weather[0].main == "Clouds") {
      upcoming_1_weather_image.src = `images/clouds.png`;
    } else if (data.list[1].weather[0].main == "Clear") {
      upcoming_1_weather_image.src = `images/clear.png`;
    } else if (data.list[1].weather[0].main == "Rain") {
      upcoming_1_weather_image.src = `images/rain.png`;
    } else if (data.list[1].weather[0].main == "Drizzle") {
      upcoming_1_weather_image.src = `images/drizzle.png`;
    } else if (data.list[1].weather[0].main == "Mist") {
      upcoming_1_weather_image.src = `images/mist.png`;
    }
    //Upcoming 1 weather status
    document.querySelector(`.upcoming-1-status`).innerHTML =
      data.list[1].weather[0].description;
  
    //Second Upcoming Weather data box
    let upcoming_time_2 = data.list[2].dt_txt;
    let upcoming_time_parts_2 = upcoming_time_2.split(" ");
    document.querySelector(`.upcoming-time-2`).innerHTML =
      upcoming_time_parts_2[1];
    document.querySelector(`.upcoming-temp-2`).innerHTML =
      Math.round(data.list[2].main.temp) + ` °C`;
    document.querySelector(`.upcoming-2-humidity`).innerHTML =
      data.list[2].main.humidity + `%`;
    document.querySelector(`.upcoming-2-wind`).innerHTML =
      data.list[2].wind.speed + ` km/h`;
    //Upcoming 2 image changing using if else
    if (data.list[2].weather[0].main == "Clouds") {
      upcoming_2_weather_image.src = `images/clouds.png`;
    } else if (data.list[2].weather[0].main == "Clear") {
      upcoming_2_weather_image.src = `images/clear.png`;
    } else if (data.list[2].weather[0].main == "Rain") {
      upcoming_2_weather_image.src = `images/rain.png`;
    } else if (data.list[2].weather[0].main == "Drizzle") {
      upcoming_2_weather_image.src = `images/drizzle.png`;
    } else if (data.list[2].weather[0].main == "Mist") {
      upcoming_2_weather_image.src = `images/mist.png`;
    }
    //Upcoming 2 weather status
    document.querySelector(`.upcoming-2-status`).innerHTML =
      data.list[2].weather[0].description;
  
    //Third Upcoming Weather data box
    let upcoming_time_3 = data.list[3].dt_txt;
    let upcoming_time_parts_3 = upcoming_time_3.split(" ");
    document.querySelector(`.upcoming-time-3`).innerHTML =
      upcoming_time_parts_3[1];
    document.querySelector(`.upcoming-temp-3`).innerHTML =
      Math.round(data.list[3].main.temp) + ` °C`;
    document.querySelector(`.upcoming-3-humidity`).innerHTML =
      data.list[3].main.humidity + `%`;
    document.querySelector(`.upcoming-3-wind`).innerHTML =
      data.list[3].wind.speed + ` km/h`;
  
    //Upcoming 3 image changing using if else
    if (data.list[3].weather[0].main == "Clouds") {
      upcoming_3_weather_image.src = `images/clouds.png`;
    } else if (data.list[3].weather[0].main == "Clear") {
      upcoming_3_weather_image.src = `images/clear.png`;
    } else if (data.list[3].weather[0].main == "Rain") {
      upcoming_3_weather_image.src = `images/rain.png`;
    } else if (data.list[3].weather[0].main == "Drizzle") {
      upcoming_3_weather_image.src = `images/drizzle.png`;
    } else if (data.list[3].weather[0].main == "Mist") {
      upcoming_3_weather_image.src = `images/mist.png`;
    }
    //Upcoming 3 weather status
    document.querySelector(`.upcoming-3-status`).innerHTML =
      data.list[3].weather[0].description;
  
    //Fourth Upcoming Weather data box
    let upcoming_time_4 = data.list[4].dt_txt;
    let upcoming_time_parts_4 = upcoming_time_4.split(" ");
    document.querySelector(`.upcoming-time-4`).innerHTML =
      upcoming_time_parts_4[1];
    document.querySelector(`.upcoming-temp-4`).innerHTML =
      Math.round(data.list[4].main.temp) + ` °C`;
    document.querySelector(`.upcoming-4-humidity`).innerHTML =
      data.list[4].main.humidity + `%`;
    document.querySelector(`.upcoming-4-wind`).innerHTML =
      data.list[4].wind.speed + ` km/h`;
  
    //Upcoming 4 image changing using if else
    if (data.list[4].weather[0].main == "Clouds") {
      upcoming_4_weather_image.src = `images/clouds.png`;
    } else if (data.list[4].weather[0].main == "Clear") {
      upcoming_4_weather_image.src = `images/clear.png`;
    } else if (data.list[4].weather[0].main == "Rain") {
      upcoming_4_weather_image.src = `images/rain.png`;
    } else if (data.list[4].weather[0].main == "Drizzle") {
      upcoming_4_weather_image.src = `images/drizzle.png`;
    } else if (data.list[4].weather[0].main == "Mist") {
      upcoming_4_weather_image.src = `images/mist.png`;
    }
  
    //Upcoming 4 weather status
    document.querySelector(`.upcoming-4-status`).innerHTML =
      data.list[4].weather[0].description;


  

   //Next day 1 day name
    const raw_date_day_1 = data.list[8].dt_txt ;
    const raw_date_day_1_split = raw_date_day_1.split(' ') ;
    const raw_date_day_1_slice = raw_date_day_1_split[0]; 
    // console.log(raw_date_day_1_slice);
    document.querySelector(`.day-1`).innerHTML = getDayName(raw_date_day_1_slice);

    //Next Day 1 Tempreature
    document.querySelector(`.temp-day-1`).innerHTML = data.list[8].main.temp  + ` °C`;
    document.querySelector(`.humidity-day-1`).innerHTML =data.list[8].main.humidity + ` %`;
    document.querySelector(`.wind-day-1`).innerHTML = data.list[8].wind.speed+ ` km/h`;
    document.querySelector(`.preassure-day-1`).innerHTML = data.list[8].main.pressure;
    document.querySelector(`.weather-status-day-1`).innerHTML = data.list[8].weather[0].description;

      //Next Day 1 image changing using if else
  if (data.list[8].weather[0].main == "Clouds") {
    next_day_1_image.src = `images/clouds.png`;
  } else if (data.list[8].weather[0].main == "Clear") {
    next_day_1_image.src = `images/clear.png`;
  } else if (data.list[8].weather[0].main == "Rain") {
    next_day_1_image.src = `images/rain.png`;
  } else if (data.list[8].weather[0].main == "Drizzle") {
    next_day_1_image.src = `images/drizzle.png`;
  } else if (data.list[8].weather[0].main == "Mist") {
    next_day_1_image.src = `images/mist.png`;
  }

    //Next day 2 day name
    const raw_date_day_2 = data.list[16].dt_txt ;
    const raw_date_day_2_split = raw_date_day_2.split(' ') ;
    const raw_date_day_2_slice = raw_date_day_2_split[0] ;
    document.querySelector(`.day-2`).innerHTML = getDayName(raw_date_day_2_slice);

    //Next Day 2 Tempreature
    document.querySelector(`.temp-day-2`).innerHTML = data.list[16].main.temp + ` °C`;
    document.querySelector(`.humidity-day-2`).innerHTML =data.list[16].main.humidity + ` %`;
    document.querySelector(`.wind-day-2`).innerHTML = data.list[16].wind.speed+ ` km/h`;
    document.querySelector(`.preassure-day-2`).innerHTML = data.list[16].main.pressure;
    document.querySelector(`.weather-status-day-2`).innerHTML = data.list[16].weather[0].description;

        //Next Day 2 image changing using if else
  if (data.list[16].weather[0].main == "Clouds") {
    next_day_2_image.src = `images/clouds.png`;
  } else if (data.list[16].weather[0].main == "Clear") {
    next_day_2_image.src = `images/clear.png`;
  } else if (data.list[16].weather[0].main == "Rain") {
    next_day_2_image.src = `images/rain.png`;
  } else if (data.list[16].weather[0].main == "Drizzle") {
    next_day_2_image.src = `images/drizzle.png`;
  } else if (data.list[16].weather[0].main == "Mist") {
    next_day_2_image.src = `images/mist.png`;
  }

    //Next day 3 day name
    const raw_date_day_3 = data.list[24].dt_txt ;
    const raw_date_day_3_split = raw_date_day_3.split(' ') ;
    const raw_date_day_3_slice = raw_date_day_3_split[0] ;
    document.querySelector(`.day-3`).innerHTML = getDayName(raw_date_day_3_slice);

    //Next Day 3 Tempreature
    document.querySelector(`.temp-day-3`).innerHTML = data.list[24].main.temp + ` °C`;
    document.querySelector(`.humidity-day-3`).innerHTML =data.list[24].main.humidity + ` %`;
    document.querySelector(`.wind-day-3`).innerHTML = data.list[24].wind.speed+ ` km/h`;
    document.querySelector(`.preassure-day-3`).innerHTML = data.list[24].main.pressure;
    document.querySelector(`.weather-status-day-3`).innerHTML = data.list[24].weather[0].description;

        //Next Day 3 image changing using if else
  if (data.list[24].weather[0].main == "Clouds") {
    next_day_3_image.src = `images/clouds.png`;
  } else if (data.list[24].weather[0].main == "Clear") {
    next_day_3_image.src = `images/clear.png`;
  } else if (data.list[24].weather[0].main == "Rain") {
    next_day_3_image.src = `images/rain.png`;
  } else if (data.list[24].weather[0].main == "Drizzle") {
    next_day_3_image.src = `images/drizzle.png`;
  } else if (data.list[24].weather[0].main == "Mist") {
    next_day_3_image.src = `images/mist.png`;
  }

     //Next day 4 day name
     const raw_date_day_4 = data.list[32].dt_txt ;
     const raw_date_day_4_split = raw_date_day_4.split(' ') ;
     const raw_date_day_4_slice = raw_date_day_4_split[0] ;
     document.querySelector(`.day-4`).innerHTML = getDayName(raw_date_day_4_slice);
 
     //Next Day 4 Tempreature
     document.querySelector(`.temp-day-4`).innerHTML = data.list[32].main.temp + ` °C`;
     document.querySelector(`.humidity-day-4`).innerHTML =data.list[32].main.humidity + ` %`;
     document.querySelector(`.wind-day-4`).innerHTML = data.list[32].wind.speed+ ` km/h`;
     document.querySelector(`.preassure-day-4`).innerHTML = data.list[32].main.pressure;
     document.querySelector(`.weather-status-day-4`).innerHTML = data.list[32].weather[0].description;

         //Next Day 4 image changing using if else
  if (data.list[32].weather[0].main == "Clouds") {
    next_day_4_image.src = `images/clouds.png`;
  } else if (data.list[32].weather[0].main == "Clear") {
    next_day_4_image.src = `images/clear.png`;
  } else if (data.list[32].weather[0].main == "Rain") {
    next_day_4_image.src = `images/rain.png`;
  } else if (data.list[32].weather[0].main == "Drizzle") {
    next_day_4_image.src = `images/drizzle.png`;
  } else if (data.list[32].weather[0].main == "Mist") {
    next_day_4_image.src = `images/mist.png`;
  }

  
   
  });
    })
  }
  const error=()=>{
    status.textContent = 'Unable to retrieve your location.';
  }
  navigator.geolocation.getCurrentPosition(success , error)
}



current_location.addEventListener(`click`,()=>{
  UserCurrentLocation();
  document.querySelector(`.user_status`).style.display = `block`;
  document.querySelector(`.user-current-location`).style.borderRadius = `100px`;
  document.querySelector(`.user-current-location`).style.padding = `2px 6px`;
})



//Weather app fetching
const checkWeather = async (city) => {
  const apiKey = `8b074109e61cf635ab22445ba896ee44`;
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=${city}`;
  const response = await fetch(apiUrl + `&appid=${apiKey}`);
  var data = await response.json();
  console.log(data);
  const getSunRiseandSunetTime = (unixTimeStamp) => {
    const date = new Date(unixTimeStamp * 1000); // Convert to milliseconds
    // Extract individual components
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const time = `${hours}:${minutes}:${seconds}`;
    return time;
  };
  
  //Get The day name function
  const getDayName= (date)=>{
    const Input_date = new Date(date);
    const daysOfWeek = [`Sunday`,`Monday`,`Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`];
    const dayIndex = Input_date.getDay();
    const dayName = daysOfWeek[dayIndex];
    return dayName;
  }

  const getCurrentDate = (unixTimeStamp) => {
    const date = new Date(unixTimeStamp * 1000); // Convert to milliseconds
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-based, so add 1
    const day = date.getDate();
    const formattedTime = `${year}-${day}-${month}`;
    return formattedTime;
  };

  const dateToUnixStampTimeConvert=(dateString)=>{
    const date = new Date(dateString);
    const unixTimeStamp = Math.floor(date.getTime() / 1000);
    return unixTimeStamp;
  }
  
   const GetPreviousDayUnixStamp=(UnixCurrentDate)=>{
   let oneDayInSeconds = 24 * 60 * 60 ;
   let previousDayUnixStamp = UnixCurrentDate - oneDayInSeconds ;
   return previousDayUnixStamp;
   }

  const getDayNamefromUnix =(timestamp)=>{
    let weeksOftheDay = [`Sunday`,`Monday`,`Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`];
    let date = new Date(timestamp * 1000);
    let day = weeksOftheDay[date.getDay()];
    return day;
  }

  const GetCurrentPollution=async(ApiKey, lattitude, longitude)=>{
    const CurrentPolutionURL = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lattitude}&lon=${longitude}&appid=${ApiKey}`
    let CurrentPolutionResponse = await fetch(CurrentPolutionURL);
    var CurrentPolutionData = await CurrentPolutionResponse.json();
    console.log(CurrentPolutionData);
    
  //Air Quality Index Parameters

  //Current Air Quality Index 

  if(CurrentPolutionData.list[0].main.aqi == '1'){
    document.querySelector(`.current-aqi-index`).innerHTML = `0 - 50`;
    document.querySelector(`.current-pollution-status`).innerHTML = `Good`;
  }
  else if(CurrentPolutionData.list[0].main.aqi == '2'){
    document.querySelector(`.current-aqi-index`).innerHTML = `51 - 100`;
    document.querySelector(`.current-pollution-status`).innerHTML = `Fair`;
  }
  else if(CurrentPolutionData.list[0].main.aqi == '3'){
    document.querySelector(`.current-aqi-index`).innerHTML = `101 - 150`;
    document.querySelector(`.current-pollution-status`).innerHTML = `Moderate`;
  }
  else if(CurrentPolutionData.list[0].main.aqi == '4'){
    document.querySelector(`.current-aqi-index`).innerHTML = `151 - 200`;
    document.querySelector(`.current-pollution-status`).innerHTML = `Poor`;
  }
  else if(CurrentPolutionData.list[0].main.aqi == '5'){
    document.querySelector(`.current-aqi-index`).innerHTML = `201 - 300`;
    document.querySelector(`.current-pollution-status`).innerHTML = `Very Poor`;
  }
  }

  const GetForecastPollution=async(Apikey, lattitude, longitude)=>{
  const ForesCastPollutionURL = `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lattitude}&lon=${longitude}&appid=${Apikey}`
  let forecastPollutionResponse = await fetch(ForesCastPollutionURL);
  var forecastPolutionData = await forecastPollutionResponse.json()
    console.log(forecastPolutionData);

   //Forecast Air Quality Index 

   //Forecast AQI day 1
   document.querySelector(`.aqi-forecast-date-1`).innerHTML = getCurrentDate(forecastPolutionData.list[24].dt);
   document.querySelector(`.aqi-forecast-day-1`).innerHTML = getDayNamefromUnix(forecastPolutionData.list[24].dt); 

   
  if(forecastPolutionData.list[24].main.aqi == '1'){
    document.querySelector(`.forecast-aqi-index-1`).innerHTML = `0 - 50`;
    document.querySelector(`.forecast-aqi-index-1-pollution-status`).innerHTML = `Good`;
  }
  else if(forecastPolutionData.list[24].main.aqi == '2'){
    document.querySelector(`.forecast-aqi-index-1`).innerHTML = `51 - 100`;
    document.querySelector(`.forecast-aqi-index-1-pollution-status`).innerHTML = `Fair`;
  }
  else if(forecastPolutionData.list[24].main.aqi == '3'){
    document.querySelector(`.forecast-aqi-index-1`).innerHTML = `101 - 150`;
    document.querySelector(`.forecast-aqi-index-1-pollution-status`).innerHTML = `Moderate`;
  }
  else if(forecastPolutionData.list[24].main.aqi == '4'){
    document.querySelector(`.forecast-aqi-index-1`).innerHTML = `151 - 200`;
    document.querySelector(`.forecast-aqi-index-1-pollution-status`).innerHTML = `Poor`;
  }
  else if(forecastPolutionData.list[24].main.aqi == '5'){
    document.querySelector(`.forecast-aqi-index-1`).innerHTML = `201 - 300`;
    document.querySelector(`.forecast-aqi-index-1-pollution-status`).innerHTML = `Very Poor`;
  }

//Forecast AQI day 2
document.querySelector(`.aqi-forecast-date-2`).innerHTML = getCurrentDate(forecastPolutionData.list[48].dt);
document.querySelector(`.aqi-forecast-day-2`).innerHTML = getDayNamefromUnix(forecastPolutionData.list[48].dt); 
if(forecastPolutionData.list[48].main.aqi == '1'){
  document.querySelector(`.forecast-aqi-index-2`).innerHTML = `0 - 50`;
  document.querySelector(`.forecast-aqi-index-2-pollution-status`).innerHTML = `Good`;
}
else if(forecastPolutionData.list[48].main.aqi == '2'){
  document.querySelector(`.forecast-aqi-index-2`).innerHTML = `51 - 100`;
  document.querySelector(`.forecast-aqi-index-2-pollution-status`).innerHTML = `Fair`;
}
else if(forecastPolutionData.list[48].main.aqi == '3'){
  document.querySelector(`.forecast-aqi-index-2`).innerHTML = `101 - 150`;
  document.querySelector(`.forecast-aqi-index-2-pollution-status`).innerHTML = `Moderate`;
}
else if(forecastPolutionData.list[48].main.aqi == '4'){
  document.querySelector(`.forecast-aqi-index-2`).innerHTML = `151 - 200`;
  document.querySelector(`.forecast-aqi-index-2-pollution-status`).innerHTML = `Poor`;
}
else if(forecastPolutionData.list[48].main.aqi == '5'){
  document.querySelector(`.forecast-aqi-index-2`).innerHTML = `201 - 300`;
  document.querySelector(`.forecast-aqi-index-2-pollution-status`).innerHTML = `Very Poor`;
}
//Forecast AQI day 3
document.querySelector(`.aqi-forecast-date-3`).innerHTML = getCurrentDate(forecastPolutionData.list[72].dt);
document.querySelector(`.aqi-forecast-day-3`).innerHTML = getDayNamefromUnix(forecastPolutionData.list[72].dt); 

if(forecastPolutionData.list[72].main.aqi == '1'){
  document.querySelector(`.forecast-aqi-index-3`).innerHTML = `0 - 50`;
  document.querySelector(`.forecast-aqi-index-3-pollution-status`).innerHTML = `Good`;
}
else if(forecastPolutionData.list[72].main.aqi == '2'){
  document.querySelector(`.forecast-aqi-index-3`).innerHTML = `51 - 100`;
  document.querySelector(`.forecast-aqi-index-3-pollution-status`).innerHTML = `Fair`;
}
else if(forecastPolutionData.list[72].main.aqi == '3'){
  document.querySelector(`.forecast-aqi-index-3`).innerHTML = `101 - 150`;
  document.querySelector(`.forecast-aqi-index-3-pollution-status`).innerHTML = `Moderate`;
}
else if(forecastPolutionData.list[72].main.aqi == '4'){
  document.querySelector(`.forecast-aqi-index-3`).innerHTML = `151 - 200`;
  document.querySelector(`.forecast-aqi-index-3-pollution-status`).innerHTML = `Poor`;
}
else if(forecastPolutionData.list[72].main.aqi == '5'){
  document.querySelector(`.forecast-aqi-index-3`).innerHTML = `201 - 300`;
  document.querySelector(`.forecast-aqi-index-3-pollution-status`).innerHTML = `Very Poor`;
}
//Forecast AQI day 4
document.querySelector(`.aqi-forecast-date-4`).innerHTML = getCurrentDate(forecastPolutionData.list[95].dt);
document.querySelector(`.aqi-forecast-day-4`).innerHTML = getDayNamefromUnix(forecastPolutionData.list[95].dt); 

if(forecastPolutionData.list[95].main.aqi == '1'){
  document.querySelector(`.forecast-aqi-index-4`).innerHTML = `0 - 50`;
  document.querySelector(`.forecast-aqi-index-4-pollution-status`).innerHTML = `Good`;
}
else if(forecastPolutionData.list[95].main.aqi == '2'){
  document.querySelector(`.forecast-aqi-index-4`).innerHTML = `51 - 100`;
  document.querySelector(`.forecast-aqi-index-4-pollution-status`).innerHTML = `Fair`;
}
else if(forecastPolutionData.list[95].main.aqi == '3'){
  document.querySelector(`.forecast-aqi-index-4`).innerHTML = `101 - 150`;
  document.querySelector(`.forecast-aqi-index-4-pollution-status`).innerHTML = `Moderate`;
}
else if(forecastPolutionData.list[95].main.aqi == '4'){
  document.querySelector(`.forecast-aqi-index-4`).innerHTML = `151 - 200`;
  document.querySelector(`.forecast-aqi-index-4-pollution-status`).innerHTML = `Poor`;
}
else if(forecastPolutionData.list[95].main.aqi == '5'){
  document.querySelector(`.forecast-aqi-index-4`).innerHTML = `201 - 300`;
  document.querySelector(`.forecast-aqi-index-4-pollution-status`).innerHTML = `Very Poor`;
}
}


  const GetHistoricalPolution =async(Apikey, lattitude, longitude, statrtUnixTime, endsUnixTime)=>{
    const HistoricalPollutionURL = `http://api.openweathermap.org/data/2.5/air_pollution/history?lat=${lattitude}&lon=${longitude}&start=${statrtUnixTime}&end=${endsUnixTime}&appid=${Apikey}`
    let historicalPollutionResponse = await fetch(HistoricalPollutionURL);
    var historicalPollutionData = await historicalPollutionResponse.json();
    console.log(historicalPollutionData); 


   //Historical AQI day 1
   document.querySelector(`.aqi-historical-date-1`).innerHTML = getCurrentDate(historicalPollutionData.list[72].dt);
   document.querySelector(`.aqi-historical-day-1`).innerHTML = getDayNamefromUnix(historicalPollutionData.list[72].dt);

   if(historicalPollutionData.list[72].main.aqi == '1'){
    document.querySelector(`.historical-aqi-index-1`).innerHTML = `0 - 50`;
    document.querySelector(`.historical-aqi-index-1-pollution-status`).innerHTML = `Good`;
  }
  else if(historicalPollutionData.list[72].main.aqi == '2'){
    document.querySelector(`.historical-aqi-index-1`).innerHTML = `51 - 100`;
    document.querySelector(`.historical-aqi-index-1-pollution-status`).innerHTML = `Fair`;
  }
  else if(historicalPollutionData.list[72].main.aqi == '3'){
    document.querySelector(`.historical-aqi-index-1`).innerHTML = `101 - 150`;
    document.querySelector(`.historical-aqi-index-1-pollution-status`).innerHTML = `Moderate`;
  }
  else if(historicalPollutionData.list[72].main.aqi == '4'){
    document.querySelector(`.historical-aqi-index-1`).innerHTML = `151 - 200`;
    document.querySelector(`.historical-aqi-index-1-pollution-status`).innerHTML = `Poor`;
  }
  else if(historicalPollutionData.list[72].main.aqi == '5'){
    document.querySelector(`.historical-aqi-index-1`).innerHTML = `201 - 300`;
    document.querySelector(`.historical-aqi-index-1-pollution-status`).innerHTML = `Very Poor`;
  }
  //Historical AQI day 2
  document.querySelector(`.aqi-historical-date-2`).innerHTML = getCurrentDate(historicalPollutionData.list[48].dt);
  document.querySelector(`.aqi-historical-day-2`).innerHTML = getDayNamefromUnix(historicalPollutionData.list[48].dt);

  if(historicalPollutionData.list[48].main.aqi == '1'){
    document.querySelector(`.historical-aqi-index-2`).innerHTML = `0 - 50`;
    document.querySelector(`.historical-aqi-index-2-pollution-status`).innerHTML = `Good`;
  }
  else if(historicalPollutionData.list[48].main.aqi == '2'){
    document.querySelector(`.historical-aqi-index-2`).innerHTML = `51 - 100`;
    document.querySelector(`.historical-aqi-index-2-pollution-status`).innerHTML = `Fair`;
  }
  else if(historicalPollutionData.list[48].main.aqi == '3'){
    document.querySelector(`.historical-aqi-index-2`).innerHTML = `101 - 150`;
    document.querySelector(`.historical-aqi-index-2-pollution-status`).innerHTML = `Moderate`;
  }
  else if(historicalPollutionData.list[48].main.aqi == '4'){
    document.querySelector(`.historical-aqi-index-2`).innerHTML = `151 - 200`;
    document.querySelector(`.historical-aqi-index-2-pollution-status`).innerHTML = `Poor`;
  }
  else if(historicalPollutionData.list[48].main.aqi == '5'){
    document.querySelector(`.historical-aqi-index-2`).innerHTML = `201 - 300`;
    document.querySelector(`.historical-aqi-index-2-pollution-status`).innerHTML = `Very Poor`;
  }
  //Historical AQI day 3
   document.querySelector(`.aqi-historical-date-3`).innerHTML = getCurrentDate(historicalPollutionData.list[24].dt);
   document.querySelector(`.aqi-historical-day-3`).innerHTML = getDayNamefromUnix(historicalPollutionData.list[24].dt);

   if(historicalPollutionData.list[24].main.aqi == '1'){
    document.querySelector(`.historical-aqi-index-3`).innerHTML = `0 - 50`;
    document.querySelector(`.historical-aqi-index-3-pollution-status`).innerHTML = `Good`;
  }
  else if(historicalPollutionData.list[24].main.aqi == '2'){
    document.querySelector(`.historical-aqi-index-3`).innerHTML = `51 - 100`;
    document.querySelector(`.historical-aqi-index-3-pollution-status`).innerHTML = `Fair`;
  }
  else if(historicalPollutionData.list[24].main.aqi == '3'){
    document.querySelector(`.historical-aqi-index-3`).innerHTML = `101 - 150`;
    document.querySelector(`.historical-aqi-index-3-pollution-status`).innerHTML = `Moderate`;
  }
  else if(historicalPollutionData.list[24].main.aqi == '4'){
    document.querySelector(`.historical-aqi-index-3`).innerHTML = `151 - 200`;
    document.querySelector(`.historical-aqi-index-3-pollution-status`).innerHTML = `Poor`;
  }
  else if(historicalPollutionData.list[24].main.aqi == '5'){
    document.querySelector(`.historical-aqi-index-3`).innerHTML = `201 - 300`;
    document.querySelector(`.historical-aqi-index-3-pollution-status`).innerHTML = `Very Poor`;
  }
  //Historical AQI day 4
  document.querySelector(`.aqi-historical-date-4`).innerHTML = getCurrentDate(historicalPollutionData.list[0].dt);
  document.querySelector(`.aqi-historical-day-4`).innerHTML = getDayNamefromUnix(historicalPollutionData.list[0].dt);

  if(historicalPollutionData.list[0].main.aqi == '1'){
    document.querySelector(`.historical-aqi-index-4`).innerHTML = `0 - 50`;
    document.querySelector(`.historical-aqi-index-4-pollution-status`).innerHTML = `Good`;
  }
  else if(historicalPollutionData.list[0].main.aqi == '2'){
    document.querySelector(`.historical-aqi-index-4`).innerHTML = `51 - 100`;
    document.querySelector(`.historical-aqi-index-4-pollution-status`).innerHTML = `Fair`;
  }
  else if(historicalPollutionData.list[0].main.aqi == '3'){
    document.querySelector(`.historical-aqi-index-4`).innerHTML = `101 - 150`;
    document.querySelector(`.historical-aqi-index-4-pollution-status`).innerHTML = `Moderate`;
  }
  else if(historicalPollutionData.list[0].main.aqi == '4'){
    document.querySelector(`.historical-aqi-index-4`).innerHTML = `151 - 200`;
    document.querySelector(`.historical-aqi-index-4-pollution-status`).innerHTML = `Poor`;
  }
  else if(historicalPollutionData.list[0].main.aqi == '5'){
    document.querySelector(`.historical-aqi-index-4`).innerHTML = `201 - 300`;
    document.querySelector(`.historical-aqi-index-4-pollution-status`).innerHTML = `Very Poor`;
  }
  }
 
 


  //getting current date 

  const raw_date_current = data.list[0].dt_txt;
  const raw_date_current_split = raw_date_current.split(' ');
  const raw_date_current_slice = raw_date_current_split[0];
  
 let CurrentTimeStamp = dateToUnixStampTimeConvert(raw_date_current_slice);
 let yesterdayUnixTimeStamp = GetPreviousDayUnixStamp(CurrentTimeStamp);
 let yesterdayPreviousDayUnixTimeStamp = GetPreviousDayUnixStamp(yesterdayUnixTimeStamp);
 let yesterdayPreviousDayUnixTimeStamp2 = GetPreviousDayUnixStamp(yesterdayPreviousDayUnixTimeStamp);
 let yesterdayPreviousDayUnixTimeStamp3 = GetPreviousDayUnixStamp(yesterdayPreviousDayUnixTimeStamp2);


 GetCurrentPollution(apiKey, data.city.coord.lat, data.city.coord.lon);
 GetForecastPollution(apiKey, data.city.coord.lat, data.city.coord.lon);
 GetHistoricalPolution(apiKey, data.city.coord.lat, data.city.coord.lon , yesterdayPreviousDayUnixTimeStamp3,
  yesterdayUnixTimeStamp);
  
  //Current Image chaning
  if (data.list[0].weather[0].main == "Clouds") {
    weatherStatus_image_array.forEach((image) => {
      image.src = `images/clouds.png`;
      currentWeather_background.style.background= `url(images/cloudy-sky.jpg) scroll no-repeat center`;
    });
  } else if (data.list[0].weather[0].main == "Clear") {
    weatherStatus_image_array.forEach((image) => {
      image.src = `images/clear.png`;
      currentWeather_background.style.background =`url(images/clear-sky.jpg) scroll no-repeat center`;
    });
  } else if (data.list[0].weather[0].main == "Rain") {
    weatherStatus_image_array.forEach((image) => {
      image.src = `images/rain.png`;
      currentWeather_background.style.background =`url(images/rainy-sky.jpg) scroll no-repeat center`;
    });
  } else if (data.list[0].weather[0].main == "Drizzle") {
    weatherStatus_image_array.forEach((image) => {
      image.src = `images/drizzle.png`;
      currentWeather_background.style.background =`url(images/drizzle-sky.jpg) scroll no-repeat center`;
    });
  } else if (data.list[0].weather[0].main == "Mist") {
    weatherStatus_image_array.forEach((image) => {
      image.src = `images/mist.png`;
      currentWeather_background.style.background =`url(images/mist-sky.jpg) scroll no-repeat center`;
    });
  }

  document.querySelector(`.tempreature`).innerHTML = Math.round(data.list[0].main.temp);
  document.querySelector(`.city`).innerHTML = data.city.name;
  document.querySelector(`.country`).innerHTML = data.city.country;
  document.querySelector(`.sunrise`).innerHTML = getSunRiseandSunetTime(data.city.sunrise) + ` a.m`;
  document.querySelector(`.sunset`).innerHTML = getSunRiseandSunetTime(data.city.sunset) + ` p.m`;
  document.querySelector(`.humidity`).innerHTML = data.list[0].main.humidity;
  document.querySelector(`.humidity-small`).innerHTML = data.list[0].main.humidity;
  document.querySelector(`.wind`).innerHTML = data.list[0].wind.speed;
  document.querySelector(`.wind-small`).innerHTML = data.list[0].wind.speed;
  document.querySelector(`.sky`).innerHTML = data.list[0].weather[0].description;
  document.querySelector(`.sky-small`).innerHTML = data.list[0].weather[0].description;
  document.querySelector(`.preassure`).innerHTML = data.list[0].main.pressure;
  document.querySelector(`.preassure-small`).innerHTML = data.list[0].main.pressure;

  //get current date
  let raw_date = data.list[0].dt_txt;
  let time_date_split = raw_date.split(" ");
  // document.querySelector(`.date`).innerHTML = time_date_split[0];
  document.querySelector(`.date`).innerHTML = getCurrentDate(data.city.sunrise);
  document.querySelector(`.max-tempreature`).innerHTML =
    data.list[0].main.temp_max;
  document.querySelector(`.max-tempreature-small`).innerHTML =
    data.list[0].main.temp_max;
  document.querySelector(`.min-tempreature`).innerHTML =
    data.list[0].main.temp_min;
  document.querySelector(`.min-tempreature-small`).innerHTML =
    data.list[0].main.temp_min;
  document.querySelector(`.feels-like`).innerHTML = Math.round(
    data.list[0].main.feels_like
  );
  document.querySelector(`.feels-like-small`).innerHTML =
    data.list[0].main.feels_like;

  //First Upcoming Weather data box
  let upcoming_time_1 = data.list[1].dt_txt;
  let upcoming_time_parts = upcoming_time_1.split(" ");
  document.querySelector(`.upcoming-time-1`).innerHTML = upcoming_time_parts[1];
  document.querySelector(`.upcoming-temp-1`).innerHTML =
    Math.round(data.list[1].main.temp) + ` °C`;
  document.querySelector(`.upcoming-1-humidity`).innerHTML =
    data.list[1].main.humidity + `%`;
  document.querySelector(`.upcoming-1-wind`).innerHTML =
    data.list[1].wind.speed + ` km/h`;
  //Upcoming 1 image changing using if else
  if (data.list[1].weather[0].main == "Clouds") {
    upcoming_1_weather_image.src = `images/clouds.png`;
  } else if (data.list[1].weather[0].main == "Clear") {
    upcoming_1_weather_image.src = `images/clear.png`;
  } else if (data.list[1].weather[0].main == "Rain") {
    upcoming_1_weather_image.src = `images/rain.png`;
  } else if (data.list[1].weather[0].main == "Drizzle") {
    upcoming_1_weather_image.src = `images/drizzle.png`;
  } else if (data.list[1].weather[0].main == "Mist") {
    upcoming_1_weather_image.src = `images/mist.png`;
  }
  //Upcoming 1 weather status
  document.querySelector(`.upcoming-1-status`).innerHTML =
    data.list[1].weather[0].description;

  //Second Upcoming Weather data box
  let upcoming_time_2 = data.list[2].dt_txt;
  let upcoming_time_parts_2 = upcoming_time_2.split(" ");
  document.querySelector(`.upcoming-time-2`).innerHTML =
    upcoming_time_parts_2[1];
  document.querySelector(`.upcoming-temp-2`).innerHTML =
    Math.round(data.list[2].main.temp) + ` °C`;
  document.querySelector(`.upcoming-2-humidity`).innerHTML =
    data.list[2].main.humidity + `%`;
  document.querySelector(`.upcoming-2-wind`).innerHTML =
    data.list[2].wind.speed + ` km/h`;
  //Upcoming 2 image changing using if else
  if (data.list[2].weather[0].main == "Clouds") {
    upcoming_2_weather_image.src = `images/clouds.png`;
  } else if (data.list[2].weather[0].main == "Clear") {
    upcoming_2_weather_image.src = `images/clear.png`;
  } else if (data.list[2].weather[0].main == "Rain") {
    upcoming_2_weather_image.src = `images/rain.png`;
  } else if (data.list[2].weather[0].main == "Drizzle") {
    upcoming_2_weather_image.src = `images/drizzle.png`;
  } else if (data.list[2].weather[0].main == "Mist") {
    upcoming_2_weather_image.src = `images/mist.png`;
  }
  //Upcoming 2 weather status
  document.querySelector(`.upcoming-2-status`).innerHTML =
    data.list[2].weather[0].description;

  //Third Upcoming Weather data box
  let upcoming_time_3 = data.list[3].dt_txt;
  let upcoming_time_parts_3 = upcoming_time_3.split(" ");
  document.querySelector(`.upcoming-time-3`).innerHTML =
    upcoming_time_parts_3[1];
  document.querySelector(`.upcoming-temp-3`).innerHTML =
    Math.round(data.list[3].main.temp) + ` °C`;
  document.querySelector(`.upcoming-3-humidity`).innerHTML =
    data.list[3].main.humidity + `%`;
  document.querySelector(`.upcoming-3-wind`).innerHTML =
    data.list[3].wind.speed + ` km/h`;

  //Upcoming 3 image changing using if else
  if (data.list[3].weather[0].main == "Clouds") {
    upcoming_3_weather_image.src = `images/clouds.png`;
  } else if (data.list[3].weather[0].main == "Clear") {
    upcoming_3_weather_image.src = `images/clear.png`;
  } else if (data.list[3].weather[0].main == "Rain") {
    upcoming_3_weather_image.src = `images/rain.png`;
  } else if (data.list[3].weather[0].main == "Drizzle") {
    upcoming_3_weather_image.src = `images/drizzle.png`;
  } else if (data.list[3].weather[0].main == "Mist") {
    upcoming_3_weather_image.src = `images/mist.png`;
  }
  //Upcoming 3 weather status
  document.querySelector(`.upcoming-3-status`).innerHTML =
    data.list[3].weather[0].description;

  //Fourth Upcoming Weather data box
  let upcoming_time_4 = data.list[4].dt_txt;
  let upcoming_time_parts_4 = upcoming_time_4.split(" ");
  document.querySelector(`.upcoming-time-4`).innerHTML =
    upcoming_time_parts_4[1];
  document.querySelector(`.upcoming-temp-4`).innerHTML =
    Math.round(data.list[4].main.temp) + ` °C`;
  document.querySelector(`.upcoming-4-humidity`).innerHTML =
    data.list[4].main.humidity + `%`;
  document.querySelector(`.upcoming-4-wind`).innerHTML =
    data.list[4].wind.speed + ` km/h`;

  //Upcoming 4 image changing using if else
  if (data.list[4].weather[0].main == "Clouds") {
    upcoming_4_weather_image.src = `images/clouds.png`;
  } else if (data.list[4].weather[0].main == "Clear") {
    upcoming_4_weather_image.src = `images/clear.png`;
  } else if (data.list[4].weather[0].main == "Rain") {
    upcoming_4_weather_image.src = `images/rain.png`;
  } else if (data.list[4].weather[0].main == "Drizzle") {
    upcoming_4_weather_image.src = `images/drizzle.png`;
  } else if (data.list[4].weather[0].main == "Mist") {
    upcoming_4_weather_image.src = `images/mist.png`;
  }

  //Upcoming 4 weather status
  document.querySelector(`.upcoming-4-status`).innerHTML =
    data.list[4].weather[0].description;

  
   //Next day 1 day name
    const raw_date_day_1 = data.list[8].dt_txt ;
    const raw_date_day_1_split = raw_date_day_1.split(' ') ;
    const raw_date_day_1_slice = raw_date_day_1_split[0]; 
    // console.log(typeof raw_date_current_slice);
    document.querySelector(`.day-1`).innerHTML = getDayName(raw_date_day_1_slice);

    //Next Day 1 Tempreature
    document.querySelector(`.temp-day-1`).innerHTML = data.list[8].main.temp  + ` °C`;
    document.querySelector(`.humidity-day-1`).innerHTML =data.list[8].main.humidity + ` %`;
    document.querySelector(`.wind-day-1`).innerHTML = data.list[8].wind.speed+ ` km/h`;
    document.querySelector(`.preassure-day-1`).innerHTML = data.list[8].main.pressure;
    document.querySelector(`.weather-status-day-1`).innerHTML = data.list[8].weather[0].description;

      //Next Day 1 image changing using if else
  if (data.list[8].weather[0].main == "Clouds") {
    next_day_1_image.src = `images/clouds.png`;
  } else if (data.list[8].weather[0].main == "Clear") {
    next_day_1_image.src = `images/clear.png`;
  } else if (data.list[8].weather[0].main == "Rain") {
    next_day_1_image.src = `images/rain.png`;
  } else if (data.list[8].weather[0].main == "Drizzle") {
    next_day_1_image.src = `images/drizzle.png`;
  } else if (data.list[8].weather[0].main == "Mist") {
    next_day_1_image.src = `images/mist.png`;
  }

    //Next day 2 day name
    const raw_date_day_2 = data.list[16].dt_txt ;
    const raw_date_day_2_split = raw_date_day_2.split(' ') ;
    const raw_date_day_2_slice = raw_date_day_2_split[0] ;
    document.querySelector(`.day-2`).innerHTML = getDayName(raw_date_day_2_slice);

    //Next Day 2 Tempreature
    document.querySelector(`.temp-day-2`).innerHTML = data.list[16].main.temp + ` °C`;
    document.querySelector(`.humidity-day-2`).innerHTML =data.list[16].main.humidity + ` %`;
    document.querySelector(`.wind-day-2`).innerHTML = data.list[16].wind.speed+ ` km/h`;
    document.querySelector(`.preassure-day-2`).innerHTML = data.list[16].main.pressure;
    document.querySelector(`.weather-status-day-2`).innerHTML = data.list[16].weather[0].description;

        //Next Day 2 image changing using if else
  if (data.list[16].weather[0].main == "Clouds") {
    next_day_2_image.src = `images/clouds.png`;
  } else if (data.list[16].weather[0].main == "Clear") {
    next_day_2_image.src = `images/clear.png`;
  } else if (data.list[16].weather[0].main == "Rain") {
    next_day_2_image.src = `images/rain.png`;
  } else if (data.list[16].weather[0].main == "Drizzle") {
    next_day_2_image.src = `images/drizzle.png`;
  } else if (data.list[16].weather[0].main == "Mist") {
    next_day_2_image.src = `images/mist.png`;
  }

    //Next day 3 day name
    const raw_date_day_3 = data.list[24].dt_txt ;
    const raw_date_day_3_split = raw_date_day_3.split(' ') ;
    const raw_date_day_3_slice = raw_date_day_3_split[0] ;
    document.querySelector(`.day-3`).innerHTML = getDayName(raw_date_day_3_slice);

    //Next Day 3 Tempreature
    document.querySelector(`.temp-day-3`).innerHTML = data.list[24].main.temp + ` °C`;
    document.querySelector(`.humidity-day-3`).innerHTML =data.list[24].main.humidity + ` %`;
    document.querySelector(`.wind-day-3`).innerHTML = data.list[24].wind.speed+ ` km/h`;
    document.querySelector(`.preassure-day-3`).innerHTML = data.list[24].main.pressure;
    document.querySelector(`.weather-status-day-3`).innerHTML = data.list[24].weather[0].description;

        //Next Day 3 image changing using if else
  if (data.list[24].weather[0].main == "Clouds") {
    next_day_3_image.src = `images/clouds.png`;
  } else if (data.list[24].weather[0].main == "Clear") {
    next_day_3_image.src = `images/clear.png`;
  } else if (data.list[24].weather[0].main == "Rain") {
    next_day_3_image.src = `images/rain.png`;
  } else if (data.list[24].weather[0].main == "Drizzle") {
    next_day_3_image.src = `images/drizzle.png`;
  } else if (data.list[24].weather[0].main == "Mist") {
    next_day_3_image.src = `images/mist.png`;
  }

     //Next day 4 day name
     const raw_date_day_4 = data.list[32].dt_txt ;
     const raw_date_day_4_split = raw_date_day_4.split(' ') ;
     const raw_date_day_4_slice = raw_date_day_4_split[0] ;
     document.querySelector(`.day-4`).innerHTML = getDayName(raw_date_day_4_slice);
 
     //Next Day 4 Tempreature
     document.querySelector(`.temp-day-4`).innerHTML = data.list[32].main.temp + ` °C`;
     document.querySelector(`.humidity-day-4`).innerHTML =data.list[32].main.humidity + ` %`;
     document.querySelector(`.wind-day-4`).innerHTML = data.list[32].wind.speed+ ` km/h`;
     document.querySelector(`.preassure-day-4`).innerHTML = data.list[32].main.pressure;
     document.querySelector(`.weather-status-day-4`).innerHTML = data.list[32].weather[0].description;

         //Next Day 4 image changing using if else
  if (data.list[32].weather[0].main == "Clouds") {
    next_day_4_image.src = `images/clouds.png`;
  } else if (data.list[32].weather[0].main == "Clear") {
    next_day_4_image.src = `images/clear.png`;
  } else if (data.list[32].weather[0].main == "Rain") {
    next_day_4_image.src = `images/rain.png`;
  } else if (data.list[32].weather[0].main == "Drizzle") {
    next_day_4_image.src = `images/drizzle.png`;
  } else if (data.list[32].weather[0].main == "Mist") {
    next_day_4_image.src = `images/mist.png`;
  }


};


search_btn.addEventListener(`click`,()=>{
  checkWeather(input_box.value);
})








  
function unixTimestampToDate(unixTimestamp) {
  const milliseconds = unixTimestamp * 1000; // Convert to milliseconds
  const date = new Date(milliseconds);
  return date;
}


const unixTimestamp =  1691452800;
const unixTimestamp2 = 1691456400;
const unixTimestamp3 = 1691712000;

const convertedDate = unixTimestampToDate(unixTimestamp);
const convertedDate2 = unixTimestampToDate(unixTimestamp2);
const convertedDate3 = unixTimestampToDate(unixTimestamp3);

console.log(convertedDate.toString()); 
console.log(convertedDate2.toString()); 
console.log(convertedDate3.toString()); 





