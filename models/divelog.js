var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var DiveLogSchema   = new Schema({
    username: String,
    date: Date,
    divelogData: {
        location: String,
        maxDepth: Number,
        avgDepth: Number,
        surfaceTemperature: Number,
        depthTemperature: Number,
        diveTime: Number,
        buddy: String,
        description: String,
        rating: Number,
        flora: Number,
        fauna: Number,
    }
});

module.exports = mongoose.model('DiveLog', DiveLogSchema);