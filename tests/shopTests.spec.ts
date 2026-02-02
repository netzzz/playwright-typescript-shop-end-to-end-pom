import { test } from '@src/utils/fixtures/shopBasePage';
import { loginCredentials } from '@data/loginData';
import { shopData } from '@data/shopData';


test('Shop Happy Path End to End Test',
  async ({ loginPage, shopPage, cartPage, checkoutPage, checkoutCompletePage,
    createdOrdersPage, orderDetailsPage }) => {
  const productName = shopData.products.productName;

  await loginPage.goTo();
  await loginPage.enterEmail(loginCredentials.validUser.email);
  await loginPage.enterPassword(loginCredentials.validUser.password);
  await loginPage.clickLoginButton();

  await shopPage.waitForShopPageToLoad();
  await shopPage.waitForShopItemsToLoad();
  await shopPage.addProductToCart(productName);
  await shopPage.goToCart();

  await cartPage.waitForCartContentToLoad();
  await cartPage.checkIfProductIsInCart(productName);
  await cartPage.goToCheckout();

  await checkoutPage.selectCountryInput();
  await checkoutPage.typeOnKeyboard(shopData.checkout.country.searchText);
  await checkoutPage.waitForCountryButtonToLoad(shopData.checkout.country.name);
  await checkoutPage.selectCountry(shopData.checkout.country.name);
  await checkoutPage.checkIfLabelIsVisible(loginCredentials.validUser.email);
  await checkoutPage.enterCvvCode(shopData.checkout.payment.cvvCode);
  await checkoutPage.enterNameOnCard(shopData.checkout.payment.nameOnCard);
  await checkoutPage.placeOrder();

  await checkoutCompletePage.checkIfOrderConfirmationMessageIsVisible();
  const orderId = await checkoutCompletePage.getOrderId();
  await checkoutCompletePage.goToOrdersPage();

  await createdOrdersPage.waitForOrderInOrdersTable(orderId);
  await createdOrdersPage.goToOrderDetails(orderId);

  await orderDetailsPage.checkIfOrderIdIsVisible(orderId);
});