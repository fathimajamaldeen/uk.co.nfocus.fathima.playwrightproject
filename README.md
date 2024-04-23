# Playwright Testing Project

The overall objectives was to develop two end-to-end test that uses Playwright.

## Test Case Details 

Test Case 1 - This test will login to an e-commerce site as a registered user, purchase an item of clothing, apply a discount code and check that the total is correct after the discount & shipping is applied. 

Test Case 2 -This test will login to an e-commerce site as a registered user, purchase an item of clothing and go through checkout. It will capture the order number and check the order is also present in the ‘My Orders’ section of the site.

## SetUp

## Prerequisites

### Installation

To get started

1. Clone the repositry to your local machine using Git:
     ```powershell
   git clone https://github.com/fathimajamaldeen/uk.co.nfocus.fathima.playwrightproject.git
2. Create an account on the nfocus shop website https://www.edgewordstraining.co.uk/demo-site/ and record your username and password used    
3. Open the cloned repositry in Visual Studio Code
4. Buil the solectuion to ensure all dependencies are resolved

## .env file

Create a '.env' file with the following format, fill in the email and password to your one:

  ```xml
    EMAIL= 
    PASSWORD= 
  ```

### Running from Visual Studio Code
Ensure you have Playwright Test for VSCode made by Microsoft installed
To execute within VSCode:
1. CLick on the clonical flask on the left hand side
2. Navigate to the test you want to execute
3. Click the 'Run Tests' button (play button)

### Running from terminal

1. Open a new terminal and navigate to `.\uk.co.nfocus.fathima.playwrightproject`
2. Run the command
   ```powershell
   npx playwright test
   ```

### View Testing Report

* A test should be automatically generated and open or you can also see the report using the command in the terminal
  ```powershell
  npx playwright show-report
  ```
