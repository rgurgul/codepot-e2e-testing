exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['spec.js'],
    baseUrl: 'http://js.edu.pl/cp/#/',
    /*multiCapabilities: [{
     browserName: 'firefox'
     }, {
     browserName: 'chrome'
     }]*/
};