var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var DiveLocationSchema   = new Schema({
    name : String,
    description : String
});

module.exports = mongoose.model('DiveLocation', DiveLocationSchema);