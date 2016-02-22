var Bundle = require('../libs/BemBund');

var index = new Bundle('desktop','index');

console.log(index);
index.BEMTREE.apply({block:'page'}).then(function(bemjson){
    console.log(index.BEMHTML.apply(bemjson));
});
