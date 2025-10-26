import { test } from '@src/utils/fixtures/shopBasePage';
import { loginCredentials } from '@data/loginData';
import { shopData } from '@data/shopData';


test('Shop Happy Path End to End Test', 
  async ({ loginPage, shopPage, cartPage, checkoutPage, checkoutCompletePage, 
    createdOrdersPage, orderDetailsPage}) =>{
  const productName : string = shopData.products.productName;

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
  await checkoutPage.typeOnKeyboard("A");
  await checkoutPage.waitForCountryButtonToLoad(/afghanistan/i);
  await checkoutPage.selectCountry(/afghanistan/i);
  await checkoutPage.checkIfLabelIsVisible(loginCredentials.validUser.email);
  await checkoutPage.enterCvvCode("251");
  await checkoutPage.enterNameOnCard("Nemanja Stevanovic");
  await checkoutPage.placeOrder();

  await checkoutCompletePage.checkIfOrderConfirmationMessageIsVisible();
  let orderId : string = await checkoutCompletePage.getOrderId();
  await checkoutCompletePage.goToOrdersPage();
  
  await createdOrdersPage.waitForOrderInOrdersTable(orderId);
  await createdOrdersPage.goToOrderDetails(orderId);

  await orderDetailsPage.checkIfOrderIdIsVisible(orderId);
});