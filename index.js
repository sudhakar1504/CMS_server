// express is a node framework that is helps in creating
// 2 or more web-pages application
const express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser');
const fs = require('fs');
// filesystem is a node module that allows us to work with
// the files that are stored on our pc
const file_system = require('fs')

// it is an npm package.this is to be required in our JS
// file for the conversion of data to a zip file!
const admz = require('adm-zip');
const path = require('path');

// stores the express module into the app variable!
const app = express()
app.use(cors())
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// this is the name of specific folder which is to be
// changed into zip file1


// this is used to request the specific file and then print
// the data in it!
var to_zip = file_system.readdirSync(__dirname + '/' + 'export')
app.get('/zip', function (req, res) {
    res.sendFile(__dirname + '/' + 'export')
    // zp is created as an object of class admz() which
    // contains functionalities
    const zp = new admz();


    // this is the main part of our work!
    // here for loop check counts and passes each and every
    // file of our folder "upload_data"
    // and convert each of them to a zip!
    for (let k = 0; k < to_zip.length; k++) {
        if(to_zip[k]?.includes('.')){
            zp.addLocalFile(__dirname + '/' + 'export' + '/' + to_zip[k])
        }else{
            // zp.addLocalFolder(__dirname + '/' + 'export' + '/' + to_zip[k],'./Hi')
        }
    }
 

    // here we assigned the name to our downloaded file!
    const file_after_download = `${Date.now()}.zip`;

    // toBuffer() is used to read the data and save it
    // for downloading process!
    const data = zp.toBuffer();


    // this is the code for downloading!
    // here we have to specify 3 things:
    // 1. type of content that we are downloading
    // 2. name of file to be downloaded
    // 3. length or size of the downloaded file!

    res.set('Content-Type', 'application/octet-stream');
    res.set('Content-Disposition', `attachment; filename=${file_after_download}`);
    res.set('Content-Length', data.length);
    res.send(data);

})
app.post("/", function (req, res) {
    var filename = req.body.file_name;
    var codes = req.body.codes;
    // res.json(req.body);
    res.setHeader('Content-Type', 'application/json');
    fs.writeFileSync('./export/'+filename, codes);
    res.end(JSON.stringify({ success:'DONE' }));
});
// this is used to listen a specific port!
app.listen(7777, function () {
    console.log('port is active at 7777');
})
