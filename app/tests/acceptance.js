/**
 * Will not write these today.
 */

var expect = require('chai').expect;
var webdriver = require('selenium-webdriver');
var By = require('selenium-webdriver').By;
var until = require('selenium-webdriver').until;


var driver = new webdriver
              .Builder()
              .usingServer('http://localhost:4444/wd/hub')
              // .forBrowser('phantomjs')
              .forBrowser('chrome')
              // .withCapabilities(webdriver.Capabilities.phantomjs())
              .build();

describe('Test ops-ring', function() {

  before(function(done) {
    driver.get('http://127.0.0.1:8080');
    done();
  });

  describe('Check that we got to homepage', function() {
    it('should see the correct title', function(done) {
      driver.getTitle().then(function(title) {
        console.log('title', title);
        expect(title).to.have.string('Ops Ring');
        done();
      });
    });
  });

  describe('Check that svg is generated appropiately', function() {

    it('should have a node element with token 0 by default', function(done) {
      // This might blow upp if it cant find it
      driver.isElementPresent(By.className('node0'))
        .then(function(isPresent){
          expect(isPresent).to.be.true;
          done();
        });
    });
    it('should have a node element with token 2^126 by default', function(done){
      // This might blow up if it cant find it
      driver.isElementPresent(By.className('node85070591730234615865843651857942052864'))
        .then(function(isPresent){
          expect(isPresent).to.be.true;
          done();
        });
    });

    it('should find node element 0 only if I call redraw from textarea with that value', function(done){
      // Get input box (text area) and update button elements
      var textInput = driver.findElement(By.id('node-list-text-area'));
      var submitBtn = driver.findElement(By.id('update-ring-btn'));
      // clear the textArea and only add "0" in it
      textInput.clear();
      textInput.sendKeys("0");

      // Go to submitBtn and click it
      new webdriver.ActionSequence(driver)
        .mouseMove(submitBtn)
        .click()
        .perform();
      // make sure the node0 is present in the browser
      driver.isElementPresent(By.className('node0'))
        .then(function(isPresent){
          expect(isPresent).to.be.true;
          done();
        });

    });


    it('should find node element 2^126 only if I call redraw from textarea with that value', function(done){
      // Get input box (text area) and update button elements
      var textInput = driver.findElement(By.id('node-list-text-area'));
      var submitBtn = driver.findElement(By.id('update-ring-btn'));
      // clear the textArea and only add "0" in it
      textInput.clear();
      textInput.sendKeys("85070591730234615865843651857942052864");

      // Go to submitBtn and click it
      new webdriver.ActionSequence(driver)
        .mouseMove(submitBtn)
        .click()
        .perform();
      // make sure the node for 2^126 is present in the browser
        driver.isElementPresent(By.className('node85070591730234615865843651857942052864'))
          .then(function(isPresent){
            expect(isPresent).to.be.true;
            done();
          });
    });


  });

  after(function(done) {
    driver.quit();
    done();
  });
});
