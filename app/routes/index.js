const { response } = require('express');

module.exports = (function() {

    'use strict';
    const express = require('express');
    const bodyParser = require('body-parser');
    const passport = require('passport')
    const LocalStrategy = require('passport-local').Strategy
    const bcrypt = require('bcrypt');
    const session = require('express-session');
    const config = require('../config');
    const axios = require('axios').default;
    const router = express.Router();
    let CaringMilf = require('../bin/CaringMilf')


    let cm = new CaringMilf();


    router.use(express.static('../' + __dirname));
    router.use(bodyParser.json({limit:'5mb'}));
    router.use(bodyParser.urlencoded({
        extended: true,
        limit:'5mb'
    }));

    router.use(session({
        secret: config.session,
        resave: false,
        saveUninitialized: false
    }))
    router.use(passport.initialize())
    router.use(passport.session())

    passport.serializeUser(function(user, done) {
        done(null, user);
      });
      
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
    
    passport.use(new LocalStrategy(
        function(username, password, done) {
            if(username && password){
                username = username.trim();
                password = password.trim();
                connection.query(`SELECT password FROM users WHERE username="${username}";`, (error, result, fields) => {
                    let userPass = result[0];
                    if(userPass){
                        userPass = userPass.password;
                        bcrypt.compare(password, userPass, function(err, result){
                            if(result){
                                done(null, username);
                            }else{
                                return done(null, false);
                            }
                        });
                    }else{
                        return done(null, false);
                    }
                });
            }
        }
    ))
    
    passport.authenticationMiddleware = function authenticationMiddleware(){
        return function (req, res, next) {
            if (req.isAuthenticated()) {
                return next()
            }
            res.redirect('/login')
        }
    };


    router.get('/', (req, res) => {
        cm.sayHello();
        res.render('./pages/index.ejs', {root: '../' + __dirname});
    });

    /*weather*/

    router.get('/weather', (req, res) => {
        const data = req.query;
        let url = null;
        if(!data){
            res.send({status: 404});
            return;
        }

        const type = data.type ? data.type : "weather";

        if(data.lat && data.lon){
            const lat = data.lat;
            const lon = data.lon;
            url = `http://api.openweathermap.org/data/2.5/${type}?lat=${lat}&lon=${lon}&appid=${config.weatherAPI}&units=metric&lang=ru`;
        }else if(data.city){
            const city = data.city;
            url = `http://api.openweathermap.org/data/2.5/${type}?q=${city}&appid=${config.weatherAPI}&units=metric&lang=ru`;
        }else{
            res.send({status: 404});
            return;
        }
        console.log(url);
        axios.get(url)
        .then(function (response) {
            let data = response.data;
            data = type === "weather" ? data : data.list.slice(0, 9);
            res.send({status: 200, data: data})
        })
        .catch(function (error) {
            res.send({status: 505, error: error});
        });
    });
    
    router.post('/login',
      passport.authenticate('local', { successRedirect: '/admin',
        failureRedirect: '/login',
        failureFlash: false })
    );
    

    router.get('/logout', function (req, res){
        req.session.destroy(function (err) {
          res.redirect('/');
        });
    });


    router.use(function(req, res, next){
        res.status(404);
        res.render('../error/404.ejs', {root: '../' + __dirname});
    });

    return router;
})();