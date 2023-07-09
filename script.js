const apikey="82fb101a0fb18a0e8045daa6948b8da2";
// site:go to open weather map website and create api key
const weatherData=document.getElementById("weather-data");
const cityInput=document.getElementById("city-name")
const  formElement=document.querySelector("form");


formElement.addEventListener("submit",(event)=>
{
    event.preventDefault();//to not make page refresh
    const cityValue=cityInput.value; 
    // console.log(cityValue)
    getWeatherData(cityValue);
})
async function getWeatherData(cityValue)
{
    try
    {
        // await=wait until response comes
        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`);
        // metric to get temperature in centigrade
        if(!response.ok)
        {
            throw new Error("Network response was  not okay")

        }
        const data=await response.json();
        const temperature=Math.round(data.main.temp)
        console.log(data);
        const description=data.weather[0].description;
        const icon=data.weather[0].icon;
        const details=[
            `Feels like: ${Math.round(data.main.feels_like)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed}m/s`
            ]
        weatherData.querySelector('.icon').innerHTML=` <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
        `
        weatherData.querySelector(".temperature").textContent=temperature+'°C';
        weatherData.querySelector(".description").textContent=description;
        weatherData.querySelector(".details").innerHTML=details.map((detail)=>`<div>${detail}</div>`).join("");

        // weatherData.querySelector(".details").innerHTML=`<div>${details[1]}</div>`
        // weatherData.querySelector(".details").innerHTML=`<div>${details[2]}</div>`
        
    }
    catch(err)
    {
        weatherData.querySelector('.icon').innerHTML="";
        weatherData.querySelector(".temperature").textContent="";
        weatherData.querySelector(".description").textContent="Data not Available";
        weatherData.querySelector(".details").innerHTML="";
        console.log(err," Data not available");
    }
}
