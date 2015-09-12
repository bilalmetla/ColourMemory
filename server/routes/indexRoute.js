/**
 * Created by bilal on 7/5/2015.
 */

module.exports.setRoutes = function(app)
{
    var indexController = require('../controllers/indexController.js');
    var colourMemoryController = require('../controllers/colourMemoryController.js');

    app.get('/index', indexController.index);


    app.post('/colourMemory/userScore', colourMemoryController.saveUserScore);
}