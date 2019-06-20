const dox = require('dox');
const fs = require('fs');
const path = require('path');

var parse = function () {
    var text = fs.readFileSync(path.join(__dirname, './src/pulgins/datetimeselect/datetimeselect.js'));
    text = new String(text);
    var obj = dox.parseComments(text);
    console.log(obj);
}
parse();