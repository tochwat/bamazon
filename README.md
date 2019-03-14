# bamazon
CLI storefront


### Overview
This is an Amazon-like storefront powered by node and using the CLI. 

### What Each View Does

#### Customer View

* Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

* The app should then prompt users with two messages:
    * The first should ask them the ID of the product they would like to buy.
    * The second message should ask how many units of the product they would like to buy.

* Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

#### Manager View

* Running this application will display the following options:
    * View Products for Sale
    * View Low Inventory
    * Add to Inventory
    * Add New Product

* If a manager selects View Products for Sale, the app lists every available item: the item IDs, names, prices, and quantities. 

* If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.

* If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.

* If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
