const express = require('express');
const index = require('./routes/index');
const config = require('./config');

const {Pool,Client} = require('pg')
const conectionString= `postgressql://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.database}?sslmode=disable`
const client= new Client({
    connectionString:conectionString
})

client.connect((err) => {
    if (err) {
        return console.error("Ошибка: " + err.message);
    }
    else{   
        console.log("Подключение к серверу MySQL успешно установлено");
           
        const app = express();
    
        app.use('/', index);
        app.set('view engine', 'ejs');
    
        app.listen(config.port, () => {
            console.log(`App listening at http://localhost:${config.port}`);
        });
    }
});