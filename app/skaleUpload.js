const fs = require("fs");

const fileStorage = require("@skalenetwork/filestorage-js/src/index.js");

const skaleFS = new fileStorage(host="http://104.248.242.242:8003");

async function uploadIndex(file) {
    fs.readFile(__dirname + "/" + file , async function read(err, data) {
        if (err) {
            throw err;
        }
        let link = await skaleFS.uploadFile(
            "0xE1C12463ce9152a33fA758571595fF7fe2f047B6",
            file,
            data.length,
            data,
            true,
            "0x621dfda93a9fd94a76a20e79cc736d3316ca7aaa75b688bdd151fe8ee2384d6e"
        );
        console.log(link);
    });
}

module.exports = {
    uploadIndex:uploadIndex
};
