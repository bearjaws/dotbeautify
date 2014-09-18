var dotBeautify = require('../index.js');
var fs = require('fs');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;

var setup = 'function start  (resp)\
{\
    resp.writeHead(200, {"Content-Type": "text/html"\
    });\
    fs.readFile(filename, "utf8", function(err, data) {\
        if (err) throw err;\
        resp.write(data);resp.end  ();});\
}';
describe('dotbeautify', function() {
    before(function() {
        fs.writeFileSync(__dirname + '/data/badFormat.js', setup, 'utf8');
    });

    it('Beautify the horribly formatted code without a config', function() {
        dotBeautify.beautify([__dirname + '/data/']);
        var properFormat = fs.readFileSync(__dirname + '/data/goodFormat.js', 'utf8');
        var badFormat = fs.readFileSync(__dirname + '/data/badFormat.js', 'utf8');
        if(properFormat == badFormat) {
            return true;
        }
    });
    it('Beautify the horribly formatted code with a given config', function() {
        dotBeautify.beautify([__dirname + '/data/'], { indent_size: 8 });
        var properFormat = fs.readFileSync(__dirname + '/data/goodFormat.js', 'utf8');
        var badFormat = fs.readFileSync(__dirname + '/data/badFormat.js', 'utf8');
        if(properFormat == badFormat) {
            return true;
        }
    });

    it('Should throw an error upon not passing any directories in', function() {
        expect(function() {
            dotBeautify.beautify([],{});
        }).to.throw(Error);
    });
});
