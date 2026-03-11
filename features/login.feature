Feature: SauceDemo Login

  Scenario: Successful login with valid credentials
    Given I am on the SauceDemo login page
    When I login with username "standard_user" and password "secret_sauce"
    Then I should be redirected to the inventory page

  Scenario: Login fails with invalid username
    Given I am on the SauceDemo login page
    When I login with username "invalid_user" and password "secret_sauce"
    Then I should see an error message "Username and password do not match"

  Scenario: Login fails with invalid password
    Given I am on the SauceDemo login page
    When I login with username "standard_user" and password "wrong_password"
    Then I should see an error message "Username and password do not match"

  Scenario: Login fails with empty username
    Given I am on the SauceDemo login page
    When I login with username "" and password "secret_sauce"
    Then I should see an error message "Username is required"

  Scenario:
 Login fails with empty password
    Given I am on the SauceDemo login page
    When I login with username "standard_user" and password ""
    Then I should see an error message "Password is required"
