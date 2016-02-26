var path = require('path'),
    fs = require('fs'),
    vow = require('vow'),
    vm =  require('vm');

var Bundle = function(devise,name){
    this.devise = devise;
    this.name = name;
    this.path = path.join(devise + '.bundles', name, name);
    this.BEMTREE = this._getbemtree();
    this.BEMHTML = require(path.join('../..', this.path) + '.bemhtml.js').BEMHTML;
    this.BEMDEPS = require(path.join('../..', this.path) + '.deps.js');
};

Bundle.prototype._getbemtree = function(){
    var path = './' + this.path + '.bemtree.js';
    var file = fs.readFileSync(path,'utf8');
    var context = vm.createContext({
        Vow: vow,
        console: console,
        setImmediate: setImmediate,
        require: require
    });
    vm.runInContext(file,context);
    return context.BEMTREE;
};

module.exports = Bundle;
