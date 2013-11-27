var fs = require('fs'),
    request = require('request'),
    cheerio = require('cheerio'),
    tseUrl = 'http://siede.tse.hn/app_dev.php/divulgacionmonitoreo/reporte-acta/{num-acta}/1',
    pathActas = 'actas/{num-acta}/',
    startNumActas = parseInt(process.env.START_ACTA, 10) || 1,
    endNumActas =  parseInt(process.env.END_ACTA, 10) || 16135,
    pollInterval = parseInt(process.env.POLL, 10) * 1000 || 2000;

/**
 * Start verifications
 */

if (startNumActas < 1) {
    startNumActas = 1;
    console.log("Invalid START_ACTA, setting to 1");
}

//16135 max actas
if (endNumActas > 16135) {
    endNumActas = 16135;
    console.log("Invalid END_ACTA, setting to 16135");
}

if (pollInterval < 0) {
    pollInterval = 2000;
    console.log("Invalid POLL, setting to 2 seconds");
}

/**
 * End verifications
 */

function download(uri, filename){
    request.head(uri, function(err, res, body){
        //console.log('content-type:', res.headers['content-type']);
        //console.log('content-length:', res.headers['content-length']);
        request(uri).pipe(fs.createWriteStream(filename));
    });
}

function padToFive(num) {
    if (num<=99999) {
        return ('0000'+num).slice(-5);
    }
    return num;
}

fs.exists('actas', function (exists) {
    if (!exists) {
        fs.mkdir('actas', function(){
            console.log('actas dir created.');
        })
    }
});

var counter = startNumActas;

var intervalId = setInterval(function(){
    if (counter <= endNumActas) {
        var numActa = padToFive(counter),
            url = tseUrl.replace('{num-acta}', numActa),
            DIR = pathActas.replace('{num-acta}', numActa);

        console.log('fetching : ' + url);
        request(url, function (error, response, html) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html);
                var imgUrl = $('img.image-acta').attr('src');

                console.log('image url ' + imgUrl);
                fs.mkdir(DIR, function(){
                    /*we only download image if the path leads somewhere,
                    * fixes bug where it creates garbage images.
                     */
                    if (~imgUrl.indexOf('.jpg')){
                        download(imgUrl, DIR+numActa+'.jpg');
                        // complete html file for historical purposes ;)
                        download(url, DIR+numActa+'.html');
                    }
                });

            }
        });
        counter++;
    } else {
        clearInterval(intervalId);
    }
},pollInterval);



