var x = require('casper').selectXPath;
var casper = require('casper').create({
    verbose: true,
    logLevel: "debug"
});

var id = casper.cli.get(0);
var usr = casper.cli.get(1);
var pass = casper.cli.get(2);
var img_path = casper.cli.get("img_path")

casper.options.pageSettings = {userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.10 (KHTML, like Gecko) Chrome/23.0.1262.0 Safari/537.10'};
casper.options.viewportSize = {width: 1319, height: 607};

//LOGIN
casper.start('https://www.amazon.de/ap/signin?_encoding=UTF8&openid.assoc_handle=deflex&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.de%2Fgp%2Fyourstore%2Fhome%3Fie%3DUTF8%26action%3Dsign-out%26path%3D%252Fgp%252Fyourstore%252Fhome%26ref_%3Dgno_signout%26signIn%3D1%26useRedirectOnSuccess%3D1');
casper.waitForSelector('form[name="signIn"]',
    function() {
			this.fill('form[name="signIn"]', {
        			'email': usr,
        			'password': pass
    		}, true);
});


//IN WARENKORB
casper.waitForUrl('https://www.amazon.de/gp/yourstore',
	function() {
		this.open("https://www.amazon.de/dp/"+id);
});
casper.waitForSelector(x('//*[@id="bb_atc_button"]'),
	function() {
		this.click(x('//*[@id="bb_atc_button"]'));
});
/**
if(casper.exists(x('//*[@id="siNoCoverage"]'))){
   casper.click(x('//*[@id="siNoCoverage"]'));
};
**/
casper.waitForSelector(x('//*[@id="siNoCoverage"]'),
	function success() {
		this.click(x('//*[@id="siNoCoverage"]'));
	 },
    function fail() {
    	this.test.assertExists(x('//*[@id="siNoCoverage"]'));
 },2000);
casper.waitForUrl('https://www.amazon.de/gp/product/handle-buy-box/',
	function() {
		this.open("https://www.amazon.de/gp/cart/view.html/ref=gno_cart");
});


//CHECKOUT
casper.waitForSelector('input[name="proceedToCheckout"]', 
	function() {
		this.click('input[name="proceedToCheckout"]');
});
casper.waitForSelector(x("//a[normalize-space(text())='An diese Adresse senden']"),
    function() {
        this.click(x("//a[normalize-space(text())='An diese Adresse senden']"));
});
casper.waitForSelector("form#shippingOptionFormId input[type=submit][value='Weiter']",
	function() {
		this.click("form#shippingOptionFormId input[type=submit][value='Weiter']");
});
casper.waitForSelector("input[type=submit][value='Weiter'][id='continue-top']",
	function() {
		this.click("input[type=submit][value='Weiter'][id='continue-top']");
});
casper.waitForSelector(x('//*[@id="confirmAgeCheckbox"]'),
	function success() {
		this.click(x('//*[@id="confirmAgeCheckbox"]'));
	 },
    function fail() {
    	this.test.assertExists(x('//*[@id="confirmAgeCheckbox"]'));
 },3000);
casper.waitForSelector("form[name=spc] input[type=submit][value='Jetzt kaufen']",
	function() {
		this.click("form[name=spc] input[type=submit][value='Jetzt kaufen']");
		//this.capture(img_path+'image/amazon.de.png');
});
casper.waitForUrl('https://www.amazon.de/gp/buy/thankyou/handlers/',
	function() {
		this.capture(img_path+'image/amazon.de.png');
});

casper.run();
