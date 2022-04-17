var API_KEY = "4464099b9d397e08b4e431c23e1f5cab";

//GRAB the html elements
var inputEL = document.getElementById("searchText");
var searchBtn = document.getElementById("searchBtn");
var cityListEl = document.getElementById("city-list");

function getLanLat() {
  //fetch request for the geocoding api based on the city name
  var geoCodingURL =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    inputEL.value +
    "&limit=1&appid=" +
    API_KEY;

    //APi for getting LAt and Lon for the city searched 
  fetch(geoCodingURL)
    .then((response) => {
      return response.json();
    })
    .then(function (data) {
      console.log("Api response", data[0]);
      //showing the cityname on the HTML page
      document.getElementById("current-city").textContent = data[0].name;

      var lat = data[0].lat;
      var lon = data[0].lon;

      var OneCallURL =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat +
        "&lon=" +
        lat +
        "&exclude=hourly,minutely,alerts&appid=" +
        API_KEY +"&units=imperial";

        //Getting the current and 5-day forecast for the searched city using Lat and Lon 
      fetch(OneCallURL)
        .then((response) => {
          return response.json();
        })
        .then(function (oneCallData) {
          console.log("Api response", oneCallData);
          console.log("Current", oneCallData.current.temp);
          console.log("Current", oneCallData.current.humidity);
          console.log("Current", oneCallData.current.uvi);
          console.log("Current", oneCallData.current.wind_speed);

          document.getElementById("temp").textContent ="Temperature : "+ oneCallData.current.temp + " F";
          document.getElementById("humidity").textContent ="Humidity : "+ oneCallData.current.humidity + " %";
          document.getElementById("UV Index").textContent = "Uv Index : "+ oneCallData.current.uvi;
          document.getElementById("wind").textContent = "Wind : "+ oneCallData.current.wind_speed;

       
          console.log(oneCallData.daily[2])
          for( var i =0; i < 5; i++){
              console.log(oneCallData.daily[i] , "Day" , i); 
              console.log();
            document.getElementById("0").textContent = "Temperature : "+ oneCallData.daily ,[];
            // document.getElementById("Humidity").textContent = "Humidity : "+ oneCallData.current.humidity + "%";
            // document.getElementById("0").textContent = "Uv Index : "+ oneCallData.current.uvi ;
            // document.getElementById("0").textContent = "Wind : "+ oneCallData.current.wind_speed ;
          }
        })
       
        .catch(function (error) {
          console.log("Api Error", error);
        });
    })
    .catch(function (error) {
      console.log("Api Error", error);
    });
}

searchBtn.addEventListener("click", getLanLat);
  