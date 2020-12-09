const axios = require('axios').default;

class Weather{
    constructor(api){
        this.api = api;
    }
    get(data){
        return new Promise((resolve, reject) => { 
            let url = null;
            if(!data){
                resolve({status: false, code: 404});
            }

            const type = data.type ? data.type : "weather";
            if(data.lat && data.lon){
                const lat = data.lat;
                const lon = data.lon;
                url = `http://api.openweathermap.org/data/2.5/${type}?lat=${lat}&lon=${lon}&appid=${this.api}&units=metric&lang=ru`;
            }else if(data.city){
                const city = data.city;
                url = `http://api.openweathermap.org/data/2.5/${type}?q=${city}&appid=${this.api}&units=metric&lang=ru`;
            }else{
                resolve({status: false, code: 404}); // if bad request
            }

            axios.get(url)
            .then(function (response) {
                let data = response.data;
                data = type === "weather" ? data : data.list.slice(0, 9);
                resolve({status: true, code: 200, data: data});
            })
            .catch(function (error) {
                resolve({status: false, code: 500, error: error});
            });
        });
    }
}

module.exports = Weather