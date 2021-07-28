Feature: Get list of products
  In order to see all the saved products
  As any kind of person
  I want to get the product list

  Scenario: With a product added
    Given the following product already exists:
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
