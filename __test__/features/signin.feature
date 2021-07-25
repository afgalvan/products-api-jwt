Feature: SignIn Feature
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

    And I send a POST request to "/auth/signin" with body:
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
        "userId": 1,
        "username": "Bob",
        "email": "bob@bobmail.bob"
      }
      """

  Scenario: A non existing username
    And I send a POST request to "/auth/signin" with body:
      """
      {
        "usernameOrEmail": "Bob",
        "password": "passbob"
      }
      """
    Then the response status code should be 400

    And I send a GET request to "/profile"
    Then the response status code should be 302
