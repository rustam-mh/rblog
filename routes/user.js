var express = require('express');
var User = require('models/User');
var HttpError = require('error').HttpError;
var AuthError = require('error').AuthError;

var router = express.Router();

router
  .get('/', function(req, res, next) {
    res.render('index', {title: "User", ident: req.session.user });
    console.log(req.cookies)
  })
  .get('/auth', function(req, res, next){
    res.render('auth', {title: 'Авторизация'})
  })
  .post('/auth', function(req, res, next){
    var username = req.body.username;
    var password = req.body.password;

    User.authorize( username, password, function(err, user){
      if(err) return next(err);

      if(user){
        req.session.user = user._id;
        req.user = res.locals.user = user;
        res.redirect('/');
      } else {
        res.render('auth', {title: 'Авторизация', username: username })
      }
    });
  })
  .get('/add',function(req,res,next){
    res.render('addUser',{title:'Регистрация'});
  })
  .post('/add', function(req,res,next){
    var username = req.body.username;
    var password = req.body.password;

    User.add(username, password, function(err, user){
      if(err) return next(err);
      if (user) {
        if(typeof user == 'string'){
          res.render('addUser', {title:'Регистрация', username: user });
        }else{
          req.session.user = user._id;
          res.locals.user = user;
          res.redirect('/');
        }
      }

    });
  })
  .get('/out', function(req,res,next){
    req.session.destroy();
    res.redirect('/');
  });

module.exports = router;
