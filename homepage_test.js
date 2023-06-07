const homePageSelectors = require("./selectors/home-page.json");
const contactUsSelectors = require("./selectors/contact-us-page.json");
const StringUtils = require("./utils/StringUtils");
const assert = require("assert");

Feature("homepage");

Scenario("test something", async ({ I }) => {
  const expectedNavButtons = [
    "Services",
    "Industries",
    "Insights",
    "About",
    "Careers",
  ];

  I.amOnPage("/");
  I.seeElement(homePageSelectors.desktopDarkLogo);
  I.scrollTo(homePageSelectors.copyright);
  I.seeElement(homePageSelectors.copyright);

  // Verify header navigation buttons
  const navBarButtons = await I.grabTextFromAll(
    homePageSelectors.headerNavBarLinks
  );
  assert.strictEqual(
    StringUtils.areStringArraysEqual(expectedNavButtons, navBarButtons),
    true
  );

  // Verify navigation button in dropdown list
  I.click(homePageSelectors.hamburgerMenuBtn);
  const hamburgerNavBarButtons = await I.grabTextFromAll(
    homePageSelectors.hamburgerFirstLevelLink
  );
  assert.strictEqual(
    StringUtils.areStringArraysEqual(
      expectedNavButtons,
      hamburgerNavBarButtons
    ),
    true
  );

  I.click(homePageSelectors.contactUsBtn);

  const phoneNumbers = await I.grabTextFromAll(contactUsSelectors.phoneNumbers);
  assert.strictEqual(phoneNumbers.length !== 0, true);

  phoneNumbers.forEach((phoneNumber) => {
    assert.strictEqual(StringUtils.verifyFormat(phoneNumber), true);
  });
});
