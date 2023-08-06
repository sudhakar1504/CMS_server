var fs = require('fs'),
    http = require('http'),
    https = require('https');

var Stream = require('stream').Transform;
var client = http;
var downloadImageFromURL = (url, filename, callback) => {

    var client = http;
    if (url.toString().indexOf("https") === 0) {
        client = https;
    }

    client.request(url, function (response) {
        var data = new Stream();

        response.on('data', function (chunk) {
            data.push(chunk);
        });

        response.on('end', function () {
            fs.writeFileSync(filename, data.read());
        });
    }).end();
};

// downloadImageFromURL('https://www.itsolutionstuff.com/assets/images/logo-it.png', 'assest/it.png');
// var fileUrl = "assest";
// var output = "bootstrap.zip";
// client.request({ url: fileUrl, encoding: null }, function (err, resp, body) {
//     if (err) throw err;
//     fs.writeFile(output, body, function (err) {
//         console.log("file written!");
//     });
// });