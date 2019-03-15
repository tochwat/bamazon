# bamazon
CLI storefront


### Overview
This is an Amazon-like storefront powered by node and using the CLI. 

### What Each View Does

#### Customer View

* Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

    ![display all items](/gifs/displayAll.gif)

* The app will then prompt the user to place an order. The application will check if there is enough of the product to meet the customer's request.
    * If not, the app will prevent the order from going through.
    * If the store does have enough of the product, you should fulfill the customer's order.
        * Once the update goes through, show the customer the total cost of their purchase.

    ![place order](/gifs/placeOrder.gif)


#### Manager View

* Running this application will display the following options:
    * View Products for Sale
    * View Low Inventory
    * Add to Inventory
    * Add New Product

* If a manager selects View Products for Sale, the app lists every available item: the item IDs, names, prices, and quantities. 

![view products](/gifs/view.gif)

* If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.

![view low inventory](/gifs/viewLow.gif)

* If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.

![add inventory](/gifs/add.gif)

* If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.

![add new](/gifs/addNew.gif)