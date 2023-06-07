const assert = require('assert')

Feature('homepage');

Scenario('test something', async ({ I }) => {
  const expectedNavButtons = ['Services', 'Industries', 'Insights', 'About', 'Careers'];

  I.amOnPage('https://www.epam.com/');
  I.seeElement("//a[contains(@class, 'desktop-logo')]/img[contains(@class, 'header__logo-dark')]");
  I.scrollTo(".copyright");
  I.seeElement(".copyright");

  const navBarButtons = await I.grabTextFromAll(".top-navigation__item-link");
  assert.strictEqual(areStringArraysEqual(expectedNavButtons, navBarButtons), true)

  I.click(".header__content > [data-gtm-category='header-contact-cta']");
  
  const phoneNumbers =  await I.grabTextFromAll(".text + .text p:last-child a");
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
