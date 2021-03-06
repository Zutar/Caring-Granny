const { response } = require('express');

module.exports = (function(client) {
    'use strict';
    const express = require('express');
    const bodyParser = require('body-parser');
    const passport = require('passport')
    const LocalStrategy = require('passport-local').Strategy
    const session = require('express-session');
    const config = require('../config');
    const path = require('path');
    const axios = require('axios').default;
    const router = express.Router();
    const Weather = require('../bin/Weather');
    const CaringMilf = require('../bin/CaringMilf');
    const Location = require('../bin/Location');


    let cm = new CaringMilf(client);  // Clothes
    let weather = new Weather(config.weatherAPI); // Weather
    let location = new Location(); // Location
    
    router.use('/static', express.static(path.join(__dirname + '/../static'))); // Set default static files path
    router.use(bodyParser.json({limit:'5mb'}));
    router.use(bodyParser.urlencoded({
        extended: true,
        limit:'5mb'
    }));

// For authentication - start
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
    
    passport.use('signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback: true
      }, async (req, email, password, done) => {
        try {
          const name = req.body;
          console.log(name);
          return done(null, name);
        } catch (error) {
          done(error);
        }
    }));

    passport.use(new LocalStrategy(
        function(username, password, done) {
            if(username && password){
                username = username.trim();
                password = password.trim();
                connection.query(`SELECT password FROM users WHERE username="${username}";`, (error, result, fields) => {
                    let userPass = result[0];
                    if(userPass){
                        userPass = userPass.password;
                        return done(null, false);
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

// For authentication - end 

    router.get('/', (req, res) => {
        res.render('./pages/index.ejs', {root: '../' + __dirname});
    });

    /*Weather*/
    // /weather?lat=50&lon=100 // Текущая погода
    // /weather?lat=50&lon=100&type=forecast // Прогноз погоды
    router.get('/weather', (req, res) => {
        const data = req.query;
        weather.get(data).then((result) => {
            res.send(result);
        });
    });

    router.get('/clothes', (req, res) => {

    });
    // Finding the right set
    router.get('/clothes/findSet', (req, res) => {
        const data = req.query;
        const temperature = data.temperature,
        precipitation = data.precipitation,
        gender = data.gender;
        
        cm.get({weather: {temperature: temperature, precipitation: precipitation}, user: {gender: gender}}).then(result => {
            res.send(result);
        });
    });

    // Finding the right set
    router.get('/geo/findName', (req, res) => {
        const data = req.query;
        const lat = data.lat;
        const lon = data.lon;
        if(lat && lon){
            location.get({lat: lat, lon: lon}).then(result => {
                res.send(result);
            });
        }else{
            res.send({status: false, code: 404});
        }
    });
    
    router.post('/register',
      passport.authenticate('signup', { successRedirect: '/',
        failureRedirect: '/register',
        failureFlash: false })
    );

    router.post('/login',
      passport.authenticate('local', { successRedirect: '/',
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
        res.render('./error/404.ejs', {root: '../' + __dirname});
    });

    return router;
});