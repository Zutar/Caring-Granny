class CaringMilf{
    get(weather){
        return new Promise((resolve, reject) => {
            //const t = weather.temperature;
            //const precipitation = weather.precipitation;
            resolve(this.calcClo(15));
        });
    }
    calcClo(t){
        let clo = 0.9;

        for(let i = 21; i > t; i--){
            clo += 0.0737;
        }

        return Math.round(clo * 100) / 100;
    }
    
}

module.exports = CaringMilf