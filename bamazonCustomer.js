var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function(err) {
if (err) throw err;
console.log("connected as id " + connection.threadId);
readAll();

});



function readAll() {
    connection.query('SELECT * FROM bamazon.products;', function (err, results, fields) {
        console.table(results);
        prompt();
    });
};

// The app should then prompt users with two messages.
function prompt() {
    inquirer
      .prompt([
        {
            // The first should ask them the ID of the product they would like to buy.
            name: "itemID",
            type: "input",
            message: "What is the ID of the item you would like to purchase?"
        },
        {
            //The second message should ask how many units of the product they would like to buy.
            name: "numUnits",
            type: "input",
            message: "How many units would you like?"
        }
      ])
      .then(function(answer) {
        // console.log(answer.itemID);
        // console.log(answer.numUnits);
        checkItem(answer.itemID, answer.numUnits);
      });
  }



//Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
function checkItem(itemID, numUnits) {
    // console.log("Running checkItem! Looking for item #: "+ itemID);
    connection.query('SELECT * FROM bamazon.products;', function (err, results, fields) {
        // get the information of the chosen item
        var itemIdInt = parseInt(itemID);
        var numUnitsInt = parseInt(numUnits);
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
            // console.log(results[i].item_id);
            // console.log(itemIdInt);
          if (results[i].item_id === itemIdInt) {
            chosenItem = results[i];
            // console.table(chosenItem);
          }
        }

        if (chosenItem.stock_quantity < numUnitsInt) {
            console.log("Insufficient quantity in stock!")
            prompt();
        } else {
            fulfillOrder(chosenItem, numUnitsInt);
        }   

    });
};



//fulfill the customer's order.
//This means updating the SQL database to reflect the remaining quantity.
//Once the update goes through, show the customer the total cost of their purchase.
function fulfillOrder(chosenItem, numUnitsInt) {
    let newStock = chosenItem.stock_quantity - numUnitsInt;
    let totalPrice = chosenItem.price * numUnitsInt;
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: newStock
          },
          {
            item_id: chosenItem.item_id
          }
        ],
        function(error) {
          if (error) throw err;
          console.log(`You bought ${numUnitsInt} units of the ${chosenItem.product_name}. You spent a total of $${totalPrice}.`);
          connection.end();
        }
      );
};