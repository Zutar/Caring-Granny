class CaringMilf{

    // Получение CLO на основе температуры
    clo_calc(temperture) {
        let clo = 0.9;

        for(let i = 21; i > temperture; i--) {
            clo += 0.0737;
        }
        return Math.round(clo * 100) / 100;
    }

    debug() {
        console.log(this.clo_calc(10))
    } 
}

module.exports = CaringMilf