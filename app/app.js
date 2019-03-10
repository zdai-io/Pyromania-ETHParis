const express = require("express");

const fs = require("fs");

const fileStorage = require("@skalenetwork/filestorage-js/src/index.js");

const upload = require("./skaleUpload");

const dF = require('./skaleDelete');

const skaleFS = new fileStorage(host="http://104.248.242.242:8003");

const app = express();

app.use(express.static(__dirname + '/frontend'));


app.get("/delete/0x", async (req, res, next) => {
    let info = await dF.deleteFile("0x.html");
    console.log(info)
});

app.get("/delete/index2", async (req, res, next) => {
    let info = await dF.deleteFile("index2.html");
    console.log(info)
});


app.get("/delete/index", async (req, res, next) => {
    let info = await dF.deleteFile("index.html");
    console.log(info)
});


app.get("/upload/0x", async (req, res, next) => {
    let info = await upload.uploadIndex("0x.html");
    console.log(info)
});

app.get("/upload/index2", async (req, res, next) => {
    let info = await upload.uploadIndex("index2.html");
    console.log(info)
});


app.get("/upload/index", async (req, res, next) => {
    let info = await upload.uploadIndex("index.html");
    console.log(info)
});

app.get("/", async (req, res, next) => {

        let bf = await skaleFS.downloadFileIntoBuffer("E1C12463ce9152a33fA758571595fF7fe2f047B6/index.html", true);

    fs.writeFileSync(__dirname + "/skaleFiles/index.html", bf.toString(), 'utf8', function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("file from SKALE was saved!");
    });

    res.sendFile(__dirname + "/skaleFiles/index.html")
});

app.get("/0x.html", async (req, res, next) => {

    let bf = await skaleFS.downloadFileIntoBuffer("E1C12463ce9152a33fA758571595fF7fe2f047B6/0x.html", true);

    fs.writeFileSync(__dirname + "/skaleFiles/0.html", bf.toString(), 'utf8', function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("file from SKALE was saved!");
    });

    res.sendFile(__dirname + "/skaleFiles/0.html")
});

app.get("/index2.html", async (req, res, next) => {

    let bf = await skaleFS.downloadFileIntoBuffer("E1C12463ce9152a33fA758571595fF7fe2f047B6/index2.html", true);

    fs.writeFileSync(__dirname + "/skaleFiles/index2.html", bf.toString(), 'utf8', function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("file from SKALE was saved!");
    });

    res.sendFile(__dirname + "/skaleFiles/index2.html")
});

app.listen(80);