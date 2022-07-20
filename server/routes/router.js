const express = require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller');

/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/', services.homeRoutes);

/**
 *  @description add users
 *  @method GET /add-user
 */
route.get('/add-user', services.add_user)

/**
 *  @description for update user
 *  @method GET /update-user
 */
route.get('/update-user', services.update_user)

// PAGE ROUTES
route.get('/menu',function(req,res){
    res.render('menu');
  });
route.get('/restaurant',function(req,res){
    res.render('restaurant');
  });
route.get('/login',function(req,res){
    res.render('login');
  });
route.get('/contact',function(req,res){
    res.render('contact');
  });



// API
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);


module.exports = route