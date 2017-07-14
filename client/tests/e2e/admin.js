const faker = require('faker');
const userEmail = faker.internet.email();
const adminEmail = 'admin@mail.com';
const adminPassword = 'admin';

module.exports = {

  'Admin sign in success': (browser) => {
    browser
      .url('http://localhost:8000/login')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', adminEmail)
      .setValue('input[name=password]', adminPassword)
      .click('#login-button')
      .waitForElementVisible('.nav-wrapper', 5000)
      .assert.containsText('h5', 'Documents')
      .assert.urlEquals(`${'http://localhost:8000/home'}`)
      .pause(1000);
  },
  'Admin should be able to view all users': (browser) => {
    browser
      .url('http://localhost:8000/users')
      .waitForElementVisible('body', 5000)
      .assert.urlEquals(`${'http://localhost:8000/users'}`)
      .waitForElementVisible('.nav-wrapper', 5000)
      .waitForElementVisible('.nav-wrapper', 5000)
      .pause(1000)
      .waitForElementVisible('div.manage-users', 5000)
      .assert.visible('div.manage-users')
      .pause(1000);
  },
  'Admin should be able to view all documents': (browser) => {
    browser
      .url('http://localhost:8000/documents')
      .waitForElementVisible('body', 5000)
      .assert.urlEquals(`${'http://localhost:8000/documents'}`)
      .waitForElementVisible('.nav-wrapper', 5000)
      .waitForElementVisible('.nav-wrapper', 5000)
      .pause(1000)
      .waitForElementVisible('div.manage-documents', 5000)
      .assert.visible('div.manage-documents')
      .pause(1000);
  },
  'Admin can search for created user': (browser) => {
    browser
      .url('http://localhost:8000/users')
      .waitForElementVisible('body', 5000)
      .waitForElementVisible('div[id="manage-users"]', 5000)
      .assert.urlEquals(`${'http://localhost:8000/users'}`)
      .waitForElementVisible('div.manage-users', 5000)
      .assert.visible('div.manage-users')
      .pause(1000)
      .waitForElementVisible('div.manage-users', 5000)
      .waitForElementVisible('#manage-users', 5000)
      .setValue('#search', userEmail)
      .pause(1000)
      .waitForElementVisible('#manage-users', 2000)
      .click('#manage-users')
      .waitForElementVisible('#manage-users', 5000)
      .pause(2000)
      .click('#manage-users')
      .clearValue('#manage-users')
      .pause(2000);
  },


  'Admin can delete created user': (browser) => {
    browser
      .url('http://localhost:8000/users')
      .waitForElementVisible('body', 5000)
      .waitForElementVisible('div[id="manage-users"]', 5000)
      .assert.urlEquals(`${'http://localhost:8000/users'}`)
      .waitForElementVisible('div.manage-users', 5000)
      .assert.visible('div.manage-users')
      .pause(1000)
      .waitForElementVisible('div.manage-users', 5000)
      .waitForElementVisible('#manage-users', 5000)
      .setValue('#search', userEmail)
      .pause(1000)
      .waitForElementVisible('#manage-users', 2000)
      .click('#manage-users')
      .waitForElementVisible('#manage-users', 5000)
      .pause(2000)
      .click('#manage-users')
      .clearValue('#manage-users')
      .pause(2000)
      .waitForElementVisible('#btn-delete-user', 5000)
      .pause(1000)
      .click('#btn-delete-user')
      .pause(1000)
      .waitForElementVisible('#manage-users', 5000)
      .pause(2000);
  },
  'Admin sign out of application': (browser) => {
    browser
      .url('http://localhost:8000/home')
      .waitForElementVisible('body', 5000)
      .waitForElementVisible('div[id="manage-documents"]', 5000)
      .assert.visible('div[id="manage-documents"]')
      .assert.urlEquals(`${'http://localhost:8000/home'}`)
      .waitForElementVisible('a#logout', 5000)
      .assert.visible('a#logout')
      .click('a#logout')
      .pause(2000)
      .waitForElementVisible('h3#landing-text', 5000)
      .assert.urlEquals(`${'http://localhost:8000/'}`)
      .end();
  },
};
