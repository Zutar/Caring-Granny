class CaringMilf{
    constructor(client){
        this.client = client;
    }
    /* 
    Get suite array
    INPUT:
    - data (object) example input value: {weather: {temperature: 15, precipitation: false}, user: {gender: 1}}
    */
    get(data){
        return new Promise((resolve, reject) => {
            const t = data.weather.temperature;
            //const precipitation = data.weather.precipitation;
            const gender = data.user.gender ? data.user.gender : 3;
            const clo = this._calcClo(t);
            
            const sql = `select distinct
            cl.id,
            cl.description,
            cl.img_url,
            ts.descr,
            cs.clo,
            cs.description,
            set.clothes_id,
            set.set_id,
            sex.descreption
            from clothes as cl
            join type_cl as ts
            on cl.type_id = ts.id
            left join set
            on set.set_id = set.set_id
            join clo_set as cs
            on cs.id = set.set_id
            join sex
            on sex.id = cs.sex_id
            where cs.clo > ${parseFloat(clo - 0.1)} and cs.clo < ${parseFloat(clo + 0.1)}
            and cs.sex_id = ${gender}
            and cs.id = set.set_id
            and set.clothes_id = cl.id;`;

            this.client.query(sql).then(result => {
                resolve({status: true, code: 200, data: result.rows});
            }).catch(error => {
                console.log(error);
                resolve({status: false, code: 500, error: error});
            });
        });
    }
    /*
        Calc CLO coef using temperature
    */
    _calcClo(t){
        let clo = 0.9;

        for(let i = 21; i > t; i--){
            clo += 0.0737;
        }

        return Math.round(clo * 100) / 100;
    }
    
}

module.exports = CaringMilf