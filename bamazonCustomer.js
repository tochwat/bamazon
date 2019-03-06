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
// Temporary fix - delays prompt function for 1 second
setTimeout(prompt,1000);

});


function prompt() {
    inquirer
      .prompt([
        {
            name: "itemID",
            type: "input",
            message: "What is the ID of the item you would like to purchase?"
        },
        {
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



function readAll() {
    connection.query('SELECT * FROM bamazon.products;', function (err, results, fields) {
        console.table(results);
    });
};

//function to find the item in the DB and check if there's enough stock
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
            console.table(chosenItem);
          }
        }

        if (chosenItem.stock_quantity < numUnitsInt) {
            console.log("Insufficient quantity in stock!")
        } else {
            console.log("Great, we'll get this order processed next!")
        }

        connection.end();
    });
};