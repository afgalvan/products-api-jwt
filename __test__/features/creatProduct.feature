Feature: Create a product
  In order to register products to the API
  As a registered user
  I want to save a product

  Scenario: A valid registerd user
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

    When I send a POST request to "/products" with body:
      """
      {
        "name": "Nike Air Zoom Vomero 15",
        "description": "Vomero 5, combining a classic design with the innovation you want for a durable shoe.",
        "imageUrl": "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/9095d410-7e74-40cc-8181-92e8bc413b7b/air-zoom-vomero-15-running-shoe-wqDgSG.png",
        "price": 260
      }
      """
    Then the response status code should be 201
    And the response should be:
      """
      {
        "name": "Nike Air Zoom Vomero 15",
        "description": "Vomero 5, combining a classic design with the innovation you want for a durable shoe.",
        "imageUrl": "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/9095d410-7e74-40cc-8181-92e8bc413b7b/air-zoom-vomero-15-running-shoe-wqDgSG.png",
        "price": 260
      }
      """

    When I send a GET request to "/products"
    Then the response status code should be 200
    And the response should be:
      """
      {
        "0": {
          "_id": "{id}",
          "name": "Nike Air Zoom Vomero 15",
          "description": "Vomero 5, combining a classic design with the innovation you want for a durable shoe.",
          "imageUrl": "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/9095d410-7e74-40cc-8181-92e8bc413b7b/air-zoom-vomero-15-running-shoe-wqDgSG.png",
          "price": 260
        }
      }
      """



