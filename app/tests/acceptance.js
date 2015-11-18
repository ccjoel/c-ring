/**
 * Will not write these today.
 */

var expect = require('chai').expect;
var webdriver = require('selenium-webdriver');
var driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.phantomjs()).build();

describe('Test ops-ring', function() {

  before(function(done) {
    driver.get('http://127.0.0.1:8080');
    done();
  });

  describe('Check homepage', function() {

    it('should see the correct title', function(done) {
      driver.getTitle().then(function(title) {
        console.log('title', title);
        expect(title).to.have.string('Ops Ring');
        done();
      });
    });

    it('should find the h2 app-name tag', function(done) {
      driver.findElement(webdriver.By.id('app-name')).getAttribute('innerHTML')
        .then(function(value) {
          expect(value).to.equal('Ops Ring');
          done();
        });
    });


  });

  describe('Check that svg is generated appropiately', function() {
    it('should have the right width/height compared to container');
    it('should have the right width/height when resizing browser');
    it('should have a node element with token 0 by default', function() {
      // This might blow upp if it cant find it
      expect(driver.findElement(webdriver.By.className('node0'))).to.exist;
    });
    it('should have a node element with token 2^126 by default', function(){
      // This might blow upp if it cant find it
      expect(driver.findElement(webdriver.By.className('node85070591730234615865843651857942052864'))).to.exist;
    });

    it('should find node element 2^125 only if I call redraw with that value')
  });

  after(function(done) {
    driver.quit();
    done();
  });
});
