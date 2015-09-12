/**
 * Created by bilal on 7/5/2015.
 */



exports.index = function(req,res){
    console.log('indexController...');
        res.render('index', { title: 'Testsite' });

}