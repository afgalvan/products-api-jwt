Feature: LogIn Feature
  In order to have access to the api
  As a registered user
  I want to login in the server to see my profile

  Scenario: A valid registered user
    Given the following user already exists:
      """
      {
        "username": "Bob",
        "email": "bob@bobmail.bob",
        "password": "passbob"
      }
      """

    And I send a POST request to "/auth/login" with body:
      """
      {
        "usernameOrEmail": "Bob",
        "password": "passbob"
      }
      """
    Then the response status code should be 201

    And I send a GET request to "/profile"
    Then the response status code should be 200
    And the response should be:
      """
      {
        "username": "Bob",
        "email": "bob@bobmail.bob"
      }
      """

  Scenario: A non existing user
    And I send a POST request to "/auth/login" with body:
      """
      {
        "usernameOrEmail": "Rick",
        "password": "Morty"
      }
      """
    Then the response status code should be 401

    And I send a GET request to "/profile"
    Then the response status code should be 401
