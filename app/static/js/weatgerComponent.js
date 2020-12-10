class WeatherComponent {
    constructor(time = '12:00', 
                temp = 8, 
                downfall = 5, 
                winter = 9, 
                pressure = 750, 
                humidity = 46, 
                img_src = "https://s1.iconbird.com/ico/2013/6/281/w256h25613715677480013PartlyCloudy.png") 
    {
        this.time = time;     // Время
        this.temp = temp;     // Температура
        this.downfall = downfall; // Осадки
        this.winter = winter;   // Ветер
        this.pressure = pressure; // Давление
        this.humidity = humidity; // Влажность
        this.img_src = img_src; // ссылка на картинку

        this.cardColors = [
            'card-green',
            'card-violet',
            'card-orange'
        ]
    }

    _createElement(element) {
        return document.createElement(element);
    }

    component(cardColor) {
       return  `
			<div class="max-width-card">
				<div class="card ${cardColor}">
					<div class="card-body">
						<div class="row">
							<div class="col-2"><span class="time-weather">${this.time}</span></div>
							<div class="col-2 col-2-padding"><img src='${this.img_src}' class='img-weather'></div>
							
							<div class="col-2 col-2-border">Температура</div>
							<div class="col-2 col-2-padding">${this.temp}&deg; C</div>
							
							<div class="col-2 col-2-border">Осадки</div>
							<div class="col-2 col-2-padding">${this.downfall}%</div>
							
							<div class="col-2 col-2-border">Ветер</div>
							<div class="col-2 col-2-padding">${this.winter} км/час</div>
							
							<div class="col-2 col-2-border">Давление</div>
							<div class="col-2 col-2-padding">${this.pressure}мм рт.ст.</div>
							
							<div class="col-2 col-2-border">Влажность</div>
							<div class="col-2 col-2-padding">${this.humidity}%</div>
						
						</div>
					</div>
				</div>
            </div>
            `
    }
}
/**
 * Запрос местоположения
 * Отправка запоса на бэк с данными о местоположении
 * И вывод текущей погоды 
 */


// Тесты вывода погоды
let debug = () => {
    weatherComponent = new WeatherComponent();
    weatherComponent.initializeData();
    let wrapper = document.getElementById("weather");
    for(let i = 0; i < 3; i++) {
        wrapper.innerHTML += weatherComponent.component(weatherComponent.cardColors[i]);
    }
}

function getGeolocation(){
    fetch('https://geolocation-db.com/json/')
    .then((response) => {
        return response.json();
    }).then((data) => {
        const lat = data.latitude,
        lon = data.longitude;

        localStorage.setItem('lat', lat);
        localStorage.setItem('lon', lon);
        
        getWather(lat, lon);
    });
}

getGeolocation();

// Получение прогноза погоды
function getWather(lat, lan) {
    let promise = fetch(`/weather?lat=${lat}&lon=${lan}&type=forecast`)
    promise.then((response) => {

        return response.json();

    }).then((data) => {

        return data.data

    }).then((data) => {
        for(let i = 0; i < data.length && i < 3; i++)
        {
            let el = data[i];
            let date = {
                hours: '00',
                minutes: '00',
                getClocks: function() {
                    return `${this.hours}:${this.minutes}`
                }
            };
            const rain = parseRain(el)

            const datetime = el.dt_txt;
            date.hours = datetime.slice(11,13);
            date.minutes = datetime.slice(17,19);
            console.log(date.hours, date.minutes)


            weatherComponent = new WeatherComponent(
                date.getClocks(),
                el.main.temp,
                rain,
                el.wind.speed,
                el.main.pressure,
                el.main.humidity
            );
            let wrapper = document.getElementById("weather");
            wrapper.innerHTML += weatherComponent.component(weatherComponent.cardColors[i]);
            console.log(el)
        }

    });

    function parseRain(data) {
        if (data.rain) {
            return 10
        }
        else {
            return 0
        }
    }
}
