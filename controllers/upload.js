/**
 * Created by matheus on 04/07/17.
 */
var fs = require('fs');
var multer  = require('multer')
var upload = multer({ dest: './uploads/' })

module.exports = function(req, res){
    console.log(req.files);
    var arquivo = req.files.files;
    var temporario = req.files.files.path;
    var novo = './uploads/' + req.files.files.name;
    console.log(req.files.files.name)

    fs.rename(temporario, novo, function(err){
        if(err){
            res.status(500).json({error: err})
        }
        res.send(novo);
    })
}