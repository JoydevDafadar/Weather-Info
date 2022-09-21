const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');

const city_name = document.getElementById('city_name');

const temp = document.getElementById('temp');
const temp_status = document.getElementById('temp_status');

const datahide = document.querySelector('.middle_layer');

const day = document.getElementById('day');
const today_date = document.getElementById('today_date');

// For date and time ... 
const date = new Date();
let days = ["Sunday", "Monday","Tuesday","Wednesday","Thrusday","Friday","Saturday"];
day.innerText = days[date.getDay()];

let months = [
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
]
today_date.innerText = `${date.getDate()} ${months[date.getMonth()]}`;

const getInfo = async(event) =>{
    event.preventDefault();
    const city_val = cityName.value;
    if ( city_val === "" ) {
        datahide.classList.add('data_hide');
        city_name.innerText = "Please write the city name before search";
    }
    else{
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${city_val}&units=metric&appid=98368c951b82fe41cc5f3c6725cdc8af`;
            const response = await fetch(url);
            const data = await response.json();
            const arrdata = [data];

            city_name.innerText = `${arrdata[0].name},  ${arrdata[0].sys.country}`;

            temp.innerHTML = `<span>${arrdata[0].main.temp}</span> <sup>o</sup> C`;
            const tempMood = arrdata[0].weather[0].main;

            // tempcondition maintain
            if( tempMood == "Clear"){
                temp_status.innerHTML = "<i class='fas fa-sun' style='color: #eccc68'></i>"
            }
            else if ( tempMood == "Clouds" ){
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color: #f1f2f6'></i>"
            }
            else if( tempMood == "Rain" ){
                temp_status.innerHTML = "<i class='fas fa-cloud-rain' style='color: #a4b0be'></i>"
            }
            else{
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color: #eccc68'></i>"
            }

            datahide.classList.remove('data_hide');

        }catch{
            datahide.classList.add('data_hide');
            city_name.innerText = "Please enter the cityname properly !! ";
        }
    }
}

submitBtn.addEventListener( 'click', getInfo );
