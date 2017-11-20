var express = require('express');
var multer = require('multer');
var fs = require('fs');
var app = express();
var router = express.Router();

var multer  = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      let ext = file.originalname.substr(file.originalname.lastIndexOf('.') + 1);  
      cb(null, file.fieldname + '-' + Date.now() + '.' + ext );
    }
  })
var upload = multer({ storage: storage })

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", 'http://localhost:4200');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json,enctype');
  next();
});


 app.get('/api', function (req, res) {
  res.end('file catcher example');
 });

app.use(express.static('uploads'));
app.use('/api', router);
//insira as rotas aqui 
router.post('/upload', upload.single('file'), function(req, res, next){
  
    res.send(req.file);
});

var PORT = process.env.PORT || 8003;

app.listen(PORT, function () {
 console.log('Working on port ' + PORT);
});

/*var express = require('express')
    , app = express()
    , bodyParser = require('body-parser')
    , multiparty = require('connect-multiparty');

    var multer  = require('multer')
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './uploads')
        },
        filename: function (req, file, cb) {
          let ext = file.originalname.substr(file.originalname.lastIndexOf('.') + 1);  
          cb(null, file.fieldname + '-' + Date.now() + '.' + ext );
        }
      })
    var upload = multer({ storage: storage })

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", 'http://localhost:4200');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});    
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

var port = process.env.PORT || 8003;
var router = express.Router();

app.use(express.static('uploads'));
app.use('/api', router);
//insira as rotas aqui 
router.post('/upload', upload.single('files'), function(req, res, next){
  
    res.send(req.file);
});


app.listen(port);

console.log('conectado a porta ' + port);*/