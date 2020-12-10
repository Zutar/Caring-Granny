const express = require('express');
const config = require('./config');
const {Pool} = require('pg');

const conectionString= `postgressql://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.database}?sslmode=disable`
const client= new Pool({
    connectionString:conectionString
})

client.connect((err) => {
    if (err) {
        return console.error("Error: " + err.message);
    }
    else{   
        console.log("Connection to MySQL server successfully established");
        
        const index = require('./routes/index')(client);
        const app = express();
    
        app.use('/', index);
        app.set('view engine', 'ejs');
    
        app.listen(config.port, () => {
            console.log(`App listening at http://localhost:${config.port}`);
        });
    }
});