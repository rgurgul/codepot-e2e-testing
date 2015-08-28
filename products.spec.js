var Helpers = require('./helpers'),
    capture = require('./screenshot');

describe('products page', function () {

    var helpers = new Helpers();
    var path = require('path');
    var productTitle = 'title' + Date.now();

    beforeEach(function () {
        helpers.get('product-list');
    });

    afterEach(function () {
        var spec = jasmine.getEnv().currentSpec;
        capture.takeScreenshotOnFailure(spec);
    });

    function getProductsCount() {
        return element.all(by.repeater('item in productsInterface.items'))
            .then(function (products) {
                return products.length;
            })
    }

    it('should get page products', function () {
        expect(browser.getLocationAbsUrl()).toBe('/product-list');
    });

    it('should add new product', function () {
        // adding a new product
        var btnAddProduct = element(by.css('a[ng-click="productsInterface.add()"]'));
        btnAddProduct.click();

        var productForm = element(by.name('productForm'));
        var modalTitle = productForm.element(by.css('input[type=text]'));
        var modalDesc = productForm.element(by.css('textarea'));
        var modalPrice = productForm.element(by.css('input[type=number]'));
        var modalFile = productForm.element(by.css('input[type=file]'));
        var modalBtnOk = productForm.element(by.buttonText("OK"));

        modalTitle.sendKeys(productTitle);
        modalDesc.sendKeys('a description');
        modalPrice.sendKeys(123);
        var fileToUpload = 'image.jpg';
        var absolutePath = path.resolve(__dirname + '/assets/', fileToUpload);
        modalFile.sendKeys(absolutePath);
        modalBtnOk.click();

        // product searching
        var search = element(by.model('itemsControl.search'));
        search.sendKeys(productTitle);
        expect(getProductsCount()).toBe(1);
    });

    it('should find product and remove it', function () {
        // product searching
        var search = element(by.model('itemsControl.search'));
        search.sendKeys(productTitle);
        expect(getProductsCount()).toBe(1);

        // product removing
        var btnDelete = element(by.css("button.btn-danger"));
        btnDelete.click();
        var deleteForm = element(by.name('deleteForm'));
        var modalDeleteBtnOk = deleteForm.element(by.buttonText("OK"));
        var modalReason = deleteForm.element(by.css('textarea'));
        modalReason.sendKeys('a reason');
        modalDeleteBtnOk.click();
        helpers.waitForAlert();
        expect(getProductsCount()).toBe(0);
    });

});