var express = require('express');
var app = module.exports = express();
var mongoo = require('mongoose');
app.set('views', __dirname + '/views');
var cookieSession = require('cookie-session');
app.use(cookieSession({name:"session",
    keys:["key1", "key2"]	 
}));
app.get('/selector', function(req, res){
        console.log(req.session.user_id);
        res.render('selector');
});

