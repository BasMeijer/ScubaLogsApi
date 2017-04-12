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
    }
});

module.exports = mongoose.model('DiveLog', DiveLogSchema);