const axios = require('axios').default;

class Location{
    constructor(){

    }

    get(data){
        return new Promise((resolve, reject) => { 
            const lat = data.lat,
            lon = data.lon;
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
            axios.get(url)
            .then(function (response) {
                let data = response.data;
                resolve({status: true, code: 200, data: data.address});
            })
            .catch(function (error){
                resolve({status: false, code: 500, error: error});
            });
        });
    }
}

module.exports = Location;