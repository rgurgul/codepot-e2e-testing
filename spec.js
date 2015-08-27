describe('Contact page', function () {

    var contactForm = element(by.name('contactForm'));
    var titleField = contactForm.element(by.css('input[type=text]'));
    var emailField = contactForm.element(by.css('input[type=email]'));
    var msgField = contactForm.$('textarea');
    var errors = contactForm.$$('.text-danger.ng-active');
    var btnSend = contactForm.element(by.css('button[ng-click="sendForm()"]'));
    var alertSuccess = element(by.css('.alert-success'));

    beforeEach(function () {
        browser.get(browser.baseUrl + 'contact');
    });

    it('should get page contact', function () {
        expect(browser.getLocationAbsUrl()).toBe('/contact');
    });

    it('should fill name field', function () {
        titleField.sendKeys('witam');
        expect(titleField.getAttribute('value')).toBe('witam');
    });

    it('should display 2 errors', function () {
        titleField.sendKeys('witam');
        btnSend.click();
        expect(errors.count()).toBe(2);
    });

    it('should display success alert and 0 errors', function () {
        titleField.sendKeys('witam');
        emailField.sendKeys('john@doe.pl');
        msgField.sendKeys('wiadomość');

        btnSend.click();
        expect(alertSuccess.isDisplayed()).toBe(true);
        expect(errors.count()).toBe(0);
    });

});