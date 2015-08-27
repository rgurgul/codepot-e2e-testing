var fs = require('fs');

module.exports.takeScreenshotOnFailure = function (spec) {
    browser.takeScreenshot()
        .then(function (png) {
            if (spec.results().passed()) return;
            var name = spec.description.split(' ').join('_');
            var stream = fs.createWriteStream('screenshots/' + name + '.png');
            stream.write(new Buffer(png, 'base64'));
            stream.end();
        });
};