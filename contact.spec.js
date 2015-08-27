var capture = require('./screenshot');

describe('Contact page', function () {

    var contactForm = element(by.name('contactForm'));
    var fieldName = contactForm.element(by.css('input[type=text]'));
    var fieldEmail = contactForm.$('input[type=email]');
    var fieldMsg = contactForm.$('textarea');
    var errors = contactForm.$$('.text-danger.ng-active');
    var btnSend = contactForm.element(by.css('button[ng-click="sendForm()"]'));
    var alertSuccess = element(by.css('.alert-success'));

    beforeEach(function () {
        browser.get(browser.baseUrl + 'contact');
    });

    afterEach(function () {
        var spec = jasmine.getEnv().currentSpec;
        capture.takeScreenshotOnFailure(spec);
    });

    it('should get page contact', function () {
        expect(browser.getLocationAbsUrl()).toBe('/contact');
    });

    it('should fill name field', function () {
        fieldName.sendKeys('John');
        expect(fieldName.getAttribute('value')).toBe('John');
    });

    it('should display 2 errors', function () {
        fieldName.sendKeys('John');
        btnSend.click();
        expect(errors.count()).toBe(2);
    });

    it('should display success alert and 0 errors', function () {
        fieldName.sendKeys('John');
        fieldEmail.sendKeys('john@doe.pl');
        fieldMsg.sendKeys('a message');
        btnSend.click();
        expect(alertSuccess.isDisplayed()).toBe(true);
        expect(errors.count()).toBe(0);
    });

});