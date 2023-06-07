const homePageSelectors = require('./selectors/home-page.json');
const contactUsSelectors = require("./selectors/contact-us-page.json")

const assert = require('assert')

Feature('homepage');

Scenario('test something', async ({ I }) => {
  const expectedNavButtons = ['Services', 'Industries', 'Insights', 'About', 'Careers'];

  I.amOnPage('/');
  I.seeElement(homePageSelectors.desktopDarkLogo);
  I.scrollTo(homePageSelectors.copyright);
  I.seeElement(homePageSelectors.copyright);

  const navBarButtons = await I.grabTextFromAll(homePageSelectors.headerNavBar);
  assert.strictEqual(areStringArraysEqual(expectedNavButtons, navBarButtons), true)

  I.click(homePageSelectors.contactUsBtn);
  
  const phoneNumbers =  await I.grabTextFromAll(contactUsSelectors.phoneNumbers);
  assert.strictEqual(phoneNumbers.length !== 0, true);
  
  phoneNumbers.forEach(phoneNumber => {
    assert.strictEqual(verifyFormat(phoneNumber), true);
  })
});

function areStringArraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

function verifyFormat(inputString) {
  const pattern = /^\+\d-\d{3}-\d{3}-\d{4}$/;
  return pattern.test(inputString);
}
