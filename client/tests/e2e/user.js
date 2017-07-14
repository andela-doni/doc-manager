const faker = require('faker');

const name = faker.name.findName();
const userEmail = faker.internet.email();
const userPassword = faker.internet.password();
const wrongPassword = faker.internet.password();
const updatedName = faker.name.findName();

module.exports = {
  'User sign up without credentials': (browser) => {
    browser
      .url('http://localhost:8000/signup')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', '')
      .setValue('input[name=password]', '')
      .setValue('input[name=userName]', '')
      .setValue('input[name=name]', '')
      .setValue('input[name=confirmPassword]', '')
      .waitForElementVisible('#submit-btn', 5000)
      .click('#submit-btn')
      .waitForElementVisible('h3#landing-text', 5000)
      .pause(1000)
      .assert
      .containsText('h3#landing-text', 'Doc Manager');
  },
  'User sign up with wrong email': (browser) => {
    browser
      .url('http://localhost:8000/signup')
      .waitForElementVisible('body', 3000)
      .setValue('input[name=email]', 'adminEmail')
      .setValue('input[name=password]', 'password')
      .setValue('input[name=userName]', userEmail)
      .setValue('input[name=name]', name)
      .setValue('input[name=confirmPassword]', 'password')
      .click('#submit-btn')
      .waitForElementVisible('h3#landing-text', 5000)
      .pause(1000)
      .assert
      .containsText('h3#landing-text', 'Doc Manager');
  },
  'User sign up with wrong password': (browser) => {
    browser
      .url('http://localhost:8000/signup')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', userEmail)
      .setValue('input[name=confirmPassword]', wrongPassword)
      .setValue('input[name=name]', name)
      .setValue('input[name=userName]', updatedName)
      .setValue('input[name=password]', 'a very wrong password')
      .click('#submit-btn')
      .waitForElementVisible('h3#landing-text', 5000)
      .pause(1000)
      .assert
      .containsText('h3#landing-text', 'Doc Manager');
  },
  'Successful sign up': (browser) => {
    browser
      .url('http://localhost:8000/signup')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', userEmail)
      .setValue('input[name=confirmPassword]', userPassword)
      .setValue('input[name=name]', name)
      .setValue('input[name=userName]', name)
      .setValue('input[name=password]', userPassword)
      .click('#submit-btn')
      .waitForElementVisible('.nav-wrapper', 5000)
      .assert.containsText('h5', 'Documents')
      .assert.urlEquals(`${'http://localhost:8000/home'}`)
      .pause(1000);
  },
  'User should be able to update his profile': (browser) => {
    browser
      .url('http://localhost:8000/home')
      .waitForElementVisible('body', 5000)
      .waitForElementVisible('div[id="manage-documents"]', 5000)
      .assert.visible('div[id="manage-documents"]')
      .assert.urlEquals(`${'http://localhost:8000/home'}`)
      .waitForElementVisible('a#profile', 5000)
      .assert.visible('a#profile')
      .click('a#profile')
      .assert.urlEquals(`${'http://localhost:8000/profile'}`)
      .assert.elementPresent('h5', 'Edit Profile')
      .pause(1000)
      .waitForElementVisible('input[name=name]', 10000)
      .clearValue('input[name=name]')
      .pause(1000)
      .setValue('input[name=name]', updatedName)
      .pause(1000)
      .waitForElementVisible('#editProfile', 5000)
      .assert.visible('#editProfile')
      .click('#editProfile')
      .waitForElementVisible('.nav-wrapper', 5000)
      .assert.urlEquals(`${'http://localhost:8000/profile'}`)
      .pause(1000);
  },
  'User should be able to create new document': (browser) => {
    browser
      .url('http://localhost:8000/home')
      .waitForElementVisible('body', 5000)
      .waitForElementVisible('div[id="manage-documents"]', 5000)
      .assert.visible('div[id="manage-documents"]')
      .assert.urlEquals(`${'http://localhost:8000/home'}`)
      .waitForElementVisible('a#newDocument', 5000)
      .assert.visible('a#newDocument')
      .click('a#newDocument')
      .assert.urlEquals(`${'http://localhost:8000/documents/create'}`)
      .assert.elementPresent('h5', 'New Document')
      .pause(1000)
      .waitForElementVisible('input[name=title]', 10000)
      .pause(1000)
      .setValue('input[name=title]', updatedName)
      .pause(1000)
      .waitForElementVisible('input[name=title]', 10000)
      .pause(1000)
      .click('#Private')
      .pause(1000);
  },
  'User sign out of application': (browser) => {
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
