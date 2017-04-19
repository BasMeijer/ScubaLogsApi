var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var DiveLocationSchema   = new Schema({
    name : String,
    description : String,
    location: {
        lat: Number,
        lng: Number
    }
});

module.exports = mongoose.model('DiveLocation', DiveLocationSchema);