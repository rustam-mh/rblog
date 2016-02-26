var fs = require('fs'),
    Bem = require('../BemBund');

var devices = fs.readdirSync('.').filter(function(i){
    if(i.search(/.bundles$/) > 0) return i.split('.')[0];
});

var bundles = {};

devices.forEach(function(d){
    var dvs = d.split('.')[0];
    bundles[dvs] = {};
    fs.readdirSync(d).forEach(function(b){
        bundles[dvs][b] = new Bem(dvs,b);
    });
});

module.exports = bundles;
