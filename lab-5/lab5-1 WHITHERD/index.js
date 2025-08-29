const apiKey = "0c357347a0f941f38c782612252908";

// Function to fetch weather
function fetchWeather(query) {
  fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}&aqi=no`)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("weather");
      container.innerHTML = `
            <h2>${data.location.name}, ${data.location.country}</h2>
            <div class="icon"><img src="https:${data.current.condition.icon}" alt="icon"></div>
            <div class="temp">${data.current.temp_c}°C</div>
            <p>${data.current.condition.text}</p>
          `;
    })
    .catch(err => {
      document.getElementById("weather").innerHTML = "<h2>Error fetching weather data</h2>";
      console.error(err);
    });
}

// Get user's location
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      fetchWeather(`${lat},${lon}`);
    },
    error => {
      console.warn("Geolocation failed, showing Cairo instead.");
      fetchWeather("Cairo");
    }
  );
} else {
  fetchWeather("Cairo");
}