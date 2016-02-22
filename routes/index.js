module.exports = function(app){

  app.use('/', require('./home'));
  app.use('/post', require('./post'));
  app.use('/user',require('./user'));

};
