import {test as base} from '@playwright/test';
import LoginPage from '@utils/pages/loginPage';
import ShopPage from '@utils/pages/shopPage';
import CartPage from '@utils/pages/cartPage';
import CheckoutPage from '@utils/pages/checkoutPage';
import CheckoutCompletePage from '@utils/pages/checkoutCompletePage';
import CreatedOrdersPage from '@utils/pages/createdOrdersPage';
import OrderDetailsPage from '@utils/pages/orderDetailsPage';

export const test = base.extend<{
    loginPage: LoginPage;
    shopPage: ShopPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    checkoutCompletePage: CheckoutCompletePage;
    createdOrdersPage: CreatedOrdersPage;
    orderDetailsPage: OrderDetailsPage;
}>
({
    loginPage: async ({page}, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    shopPage: async ({page}, use) => {
        const shopPage = new ShopPage(page);
        await use(shopPage);
    },
    cartPage: async ({page}, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },
    checkoutPage: async ({page}, use) => {
        const checkoutPage = new CheckoutPage(page);
        await use(checkoutPage);
    },
    checkoutCompletePage: async ({page}, use) => {
        const checkoutCompletePage = new CheckoutCompletePage(page);
        await use(checkoutCompletePage);
    },
    createdOrdersPage: async ({page}, use) => {
        const ordersPage = new CreatedOrdersPage(page);
        await use(ordersPage);
    },
    orderDetailsPage: async ({page}, use) => {
        const orderDetailsPage = new OrderDetailsPage(page);
        await use(orderDetailsPage);
    }
});
 
