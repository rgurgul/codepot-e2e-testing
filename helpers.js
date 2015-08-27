function Helpers() {

    browser.driver.manage().window().maximize();

    this.timeOut = 1000;

    this.config = {
        login: 'admin',
        pass: 'admin'
    };

    this.get = function (name) {
        browser.get(browser.baseUrl + name);
        this.signIn();
    };

    this.signIn = function () {
        var self = this;
        var signInBtn = element(by.css('a[ng-click="userInterface.signIn()"]'));
        var loginForm = element(by.name('loginForm'));
        browser.isElementPresent(signInBtn)
            .then(function (present) {
                if (present) {
                    signInBtn.click();
                    var login = loginForm.$('input[type=text]');
                    var pass = loginForm.$('input[type=password]');
                    var loginBtn = loginForm.$('.btn-primary');
                    login.clear();
                    pass.clear();
                    login.sendKeys(self.config.login);
                    pass.sendKeys(self.config.pass);
                    loginBtn.click();
                    self.waitForAlert();
                }
            })
    };

    this.waitForAlert = function () {
        browser.wait(function () {
            return browser.switchTo().alert().then(
                function (alert) {
                    alert.accept();
                    return true;
                },
                function () {
                    return false;
                }
            );
        }, this.timeOut);
    };
}

module.exports = Helpers;