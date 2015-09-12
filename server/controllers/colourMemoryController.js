/**
 * Created by bilal on 7/5/2015.
 */

var COLOURMEMORIES = require('../models/colourMemoryModel.js');
var _ = require('underscore');

var colourMemory = {
    saveUserScore: saveUserScore
}

function saveUserScore(req,res) {

    try {
        console.log('Received Request Data | %s : ', JSON.stringify(req.body));
if(global.databaseConnection) {
    COLOURMEMORIES.findOne({email: req.body.email}, function (err, scoreCardDoc) {
        if (err) {
            res.send({status: 500, err: err, message: "" });
            console.error(err);
            return;
        }

        if (scoreCardDoc) {
            console.log('already exists Score card of player | %s : ', scoreCardDoc);
            scoreCardDoc.points = req.body.points;
            scoreCardDoc.playedTime = req.body.playedTime;

            scoreCardDoc.save(function (err, scoreCardSaved) {
                if (err) {
                    res.send({status: 500, err: err, message: "new Score not saved" });
                    console.error(err);
                    return;
                }
                COLOURMEMORIES.find({}, function (err, allScoreCard) {
                    if (err) {
                        console.error(err);
                        res.send({status: 500, err: err, message: "Not calculated Rank" });
                        return;
                    }
                    if (allScoreCard.length > 0) {
                        var arr = allScoreCard.sort(function (a, b) {
                            return b.points - a.points
                        });
                        var filteredRecord = _.findIndex(arr, {email: scoreCardSaved.email});
                        scoreCardSaved.rank = filteredRecord + 1;
                        scoreCardSaved.heighestScore = arr[0].points;
                        console.log('updated Score card of player | %s : ', scoreCardSaved);
                        res.send({status: 200, scoreCard: scoreCardSaved, message: "updated score card " })
                    }
                    return;
                });

            });
        } else {
            var scoreCard = new COLOURMEMORIES(req.body);
            scoreCard.save(function (err, savedScoreCard) {
                if (err) {
                    res.send({status: 500, err: err, message: "new Score not saved" });
                    console.error(err);
                    return;
                }

                COLOURMEMORIES.find({}, function (err, allScoreCard) {
                    if (err) {
                        console.error(err);
                        res.send({status: 500, err: err, message: "Not calculated Rank" });
                        return;
                    }
                    if (allScoreCard.length > 0) {
                        var arr = allScoreCard.sort(function (a, b) {
                            return b.points - a.points
                        });
                        var filteredRecord = _.findIndex(arr, {email: savedScoreCard.email});
                        savedScoreCard.rank = filteredRecord + 1;
                        savedScoreCard.heighestScore = arr[0].points;
                        console.log('added new Score card of player | %s : ', savedScoreCard);
                        res.send({status: 200, scoreCard: savedScoreCard, message: "added new score card " })
                    }
                    return;
                });

            })
        }
    });
}else{
    console.log('Your Score Not Saved, Connection Problem');
    res.send({status: 500, err: "Your Score Not Saved, Connection Problem", message: "Database Connection Problem." });
}
    }catch(e){
        console.log('someThing went wrong on server');
        res.send({status: 500, err: "someThing went wrong on server", message: "someThing went wrong on server" });
    }

}

module.exports = colourMemory;