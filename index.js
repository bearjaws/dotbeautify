var fs = require('fs');
var beautify = require('js-beautify').js_beautify;
var _ = require('lodash');

/**
 * Get all files from given directories
 * @param directories
 * @returns {Array}
 */
function getFiles (directories) {
    var allFiles = [];
    _(directories).each(function(directory) {
        var dirFiles = fs.readdirSync(directory);
        _(dirFiles).each(function(file) {
            var curFile = directory + '/' + file;
            var stat = fs.statSync(curFile);
            if (stat && !stat.isDirectory()) {
                allFiles.push(curFile);
            }
        });
    });

    return allFiles;
}

module.exports = {
    beautify : function(directories, config) {
        if(typeof directories != "object" || directories.length == 0) {
            throw new Error("directories must be an array of directories to beautify");
        }
        if(typeof config != "object") {
            config = {};
        }
        var files = getFiles(directories);
        _(files).forEach(function(file) {
            var fileText = fs.readFileSync(file, 'utf8');
            var beautified = beautify(fileText, config);

            if(fileText.length != beautified.length) {
                if (process.argv[3] === "--pre-commit") {
                  throw new Error("Code requires beautification.")
                }
                fs.writeFileSync(file, beautified);
            }
        });
    }
}
