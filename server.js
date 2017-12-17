var http = require('http');
var fs = require ('fs');
var formidable = require("formidable");
var util = require('util');
var express = require('express');
var app = express();


// Démarrer serveur MongoDB
// Dans le fichier bin de mongodb > mongod.exe --port 27017 --dbpath "path jusqu'au dossier data"
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/test";

//Internal Modules
UtilsModule = require('./includes/utils'); UtilsModule = new UtilsModule();
ConfigModule = require('./includes/config'); ConfigModule = new ConfigModule();

//Configure Express

app.set('views','./views');
app.set('view engine','pug');

app.use(UtilsModule.commonMiddleware);

app.use('/public', express.static('./public'));

app.get('/', function(req,res){
	res.redirect('/home')
})

app.get('/home', function(req,res){

	MongoClient.connect(url, function(err, db){
		if(err) throw err;
		db.collection("notices").find({}).toArray(function(err, result){
			if (err) throw err;
			res.render('home',{
				liste_notices:result,
				pagetitle:'Accueil'
			});
			db.close();
		});
	});
});

var server = http.createServer(app);
server.listen(8080);

/*function DisplayForm(res, result){
	fs.readFile('index.html', function(err, html){
		res.writeHead(200, {'Content-type' : 'text/html'});
		res.write(result[0].nom);
		res.write(html);
		res.end();
	});
}

function ProcessForm(req, res){
	var form = new formidable.IncomingForm();

	form.parse(req, function(err, fields, files){
		res.writeHead(200);
		res.write("Données formualaire :\n\n");
		res.end(util.inspect({
			fields : fields,
			files : files
		}));
	});
}*/