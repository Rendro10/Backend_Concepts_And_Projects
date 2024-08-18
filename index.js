const http = require('http');
const fs = require('fs');
const path = require('path');
const { exit } = require('process');

const hostname = "localhost";
const port = 3000;



const server = http.createServer((req,res)=>{
    // console.log(req.headers);
    console.log('request for '+res.url+'by method '+req.method);

    if(req.method == 'GET'){
        var fileURL;
        if(req.url=='/'){
            fileURL = "/index.html"
        }
        else{
            fileURL = req.url;
        }
        var filePath = path.resolve('./public'+fileURL);

        const fileExt = path.extname();

        if(fileExt=='.html'){
            fs.exists(filePath,(exists)=>{
                if(!exists){
                    res.statusCode=404;
                    res.setHeader('content-type','text/html');
                    res.end('<html><body><h1>error 404'+fileURL+'does not exists</h1></body></html>')
                }
                res.statusCode=404;
                res.setHeader('content-type','text/html');
                fs.createReadStream(filePath).pipe(res);
            });
        }else{
            res.statusCode=404;
            res.setHeader('content-type','text/html');
            res.end('<html><body><h1>error 404:'+fileURL+'not a html file</h1></body></html>')
        }
    }else{
        res.statusCode=404;
        res.setHeader('content-type','text/html');
        res.end('<html><body><h1>error 404:'+fileURL+'not supported</h1></body></html>')
    }

    // res.statusCode=200;
    // res.setHeader('content-type','text/html');
    // res.end('<html><body><h1>Server connection succesfully done by arka :): </h1></body></html>')


});

server.listen(port,hostname,()=>{
    console.log(`Our server is running on http://${hostname}:${port}`);
})