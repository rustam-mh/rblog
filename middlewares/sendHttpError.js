module.exports = function(req, res, next){

  res.sendHttpError = function(err){
    var status = (typeof err.status == 'number') ? err.status : 500;
    res.status(status);
    if(res.req.headers['x-requested-with'] == 'XMLHttpRequest'){
      res.json(error);
    } else {
      res.render("error", {error: err})
    }
  };

  next();

};
