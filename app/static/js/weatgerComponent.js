class WeatherComponent {
    constructor() {
        this.time;     // Время
        this.time;     // Температура
        this.downfall; // Осадки
        this.winter;   // Ветер
        this.pressure; // Давление
        this.humidity; // Влажность
        this.img_src; // ссылка на картинку

        this.cardColors = [
            'card-green',
            'card-violet',
            'card-orange'
        ]
    }

    initializeData() {
        this.time = "12:00";
        this.downfall = 6;
        this.winter =  9;
        this.pressure = 761;
        this.humidity = 94;
        this.img_src = "https://s1.iconbird.com/ico/2013/6/281/w256h25613715677480013PartlyCloudy.png";
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
							<div class="col-2 col-2-padding">${this.winter}км/час</div>
							
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


let debug = () => {
    weatherComponent = new WeatherComponent();
    weatherComponent.initializeData();
    let wrapper = document.getElementById("weather");
    for(let i = 0; i < 3; i++) {
        wrapper.innerHTML += weatherComponent.component(weatherComponent.cardColors[i]);
    }
}


debug();