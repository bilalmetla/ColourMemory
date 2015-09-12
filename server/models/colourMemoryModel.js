/**
 * Created by bilal on 7/5/2015.
 */
var mongoose = require('mongoose');

var scoreCardScheme = new mongoose.Schema({
    name: { type:String, required:true },
    playedTime: { type:String, required:true },
    points: { type:String, required:true },
    email: { type: String, required: true, index: { unique: true } },
    rank: { type:Number, required:false },
    heighestScore: { type:Number, required:false },
    dateCreated: {type:Date}
});

var scoreCard = mongoose.model('scoreCard', scoreCardScheme);
module.exports = scoreCard;