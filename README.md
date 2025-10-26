# Shop End-to-End Test (Playwright + TypeScript)

This automated test verifies a complete **user flow** for an e-commerce shop — from login to placing an order and verifying it in the order history.

---

## Tech Stack

- **Framework:** [Playwright](https://playwright.dev/)  
- **Language:** TypeScript  
- **Test Runner:** Playwright Test  
- **Design Pattern:** Page Object Model (POM)

---

## Project Structure

```
src/
 ┣ utils/
 ┃ ┗ fixtures/
 ┃   ┗ shopBasePage.ts     # Custom Playwright fixtures providing page objects
 ┣ data/
 ┃ ┣ loginData.ts          # Stores login credentials
 ┃ ┗ shopData.ts           # Contains product data
tests/
 ┗ shopTests.spec.ts    # The main test case
```

---

## Test Scenario: "Shop Happy Path End to End Test"

### **Goal**
To validate that a user can:
1. Log in successfully  
2. Add a product to the cart  
3. Complete checkout with valid payment info  
4. Verify the order appears in order history  
5. Open order details and confirm order ID

---

## Test Flow

### **1️⃣ Login**
- Navigate to the login page  
- Enter valid credentials (`loginCredentials.validUser`)  
- Click the login button  

### **2️⃣ Shop**
- Wait for the shop page and products to load  
- Add a selected product (`shopData.products.productName`) to the cart  
- Go to the cart page  

### **3️⃣ Cart**
- Wait for cart contents to load  
- Verify the selected product is in the cart  
- Proceed to checkout  

### **4️⃣ Checkout**
- Select the country (e.g., *Afghanistan*)  
- Verify that the user email is displayed  
- Enter payment details (CVV, name on card)  
- Place the order  

### **5️⃣ Order Confirmation**
- Check that the order confirmation message is visible  
- Capture the generated `orderId`  
- Navigate to the “My Orders” page  

### **6️⃣ Orders**
- Wait for the order to appear in the orders table  
- Open order details  

### **7️⃣ Order Details**
- Verify the correct order ID is visible  

---

## Running the Test

1) Clone this repository
2) Make sure you have node.js installed. If you don't, please visit official website for instructions
3) Run 'npm install' to install node modules
4) Run tests with 'npx playwright test --ui' - it will open UI mode so you can explore,
run and debug tests with a time travel experience complete with watch mode.

For other ways to run tests you can check Playwright Documentation - https://playwright.dev/docs/running-tests  

---

## Notes

- The test uses **custom fixtures** defined in `shopBasePage.ts`, which provides pre-initialized page objects.  
- Credentials and product data are stored in separate data files under `/data` for easier maintenance.  
- The test ensures **data reusability** and **readability** via modular Page Object methods.

---

## Expected Result

At the end of the test:
- The order is successfully placed.  
- The correct order ID appears in the **Order Details** page.  
- No errors or failed steps occur.
