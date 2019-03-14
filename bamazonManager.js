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
prompt();
});


// List a set of menu options
function prompt() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "Would you like to do?",
      choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.action === "View Products for Sale") {
        readAll();
      }
      else if(answer.action === "View Low Inventory") {
        viewLow();
      } else if(answer.action === "Add to Inventory") {
        addMore();
      } else if(answer.action === "Add New Product") {
        addNew();
      } else{
        connection.end();
      }
    });
}

// list every available item: the item IDs, names, prices, and quantities.
function readAll() {
  connection.query('SELECT * FROM bamazon.products;', function (err, results, fields) {
      console.table(results);
      prompt();
  });
};

// list all items with an inventory count lower than five.
function viewLow() {
  connection.query('SELECT * FROM bamazon.products WHERE stock_quantity < 5', function (err, results, fields) {
      console.table(results);
      prompt();
  });
};


//display a prompt that will let the manager "add more" of any item currently in the store.
function addMore() {
  connection.query("SELECT * FROM bamazon.products", function(err, results) {
    if (err) throw err;
    // prompt the user for which they'd like to add more to
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function() {
            let choicesArray = [];
            for (let i=0; i<results.length; i++){
              choicesArray.push(results[i].product_name);
            }
            return choicesArray;
          },
          message: "What item would you like to add more inventory to?"
        },
        {
          name: "numStock",
          type: "input",
          message: "How much would you like to add?"
        }
      ])
      .then(function(answer) {
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].product_name === answer.choice) {
            chosenItem = results[i];
          }
        }
        let newStock = parseInt(answer.numStock) + chosenItem.stock_quantity;
        connection.query(
          "UPDATE products SET ? WHERE ?",
          [
            {
              stock_quantity: newStock
            },
            {
              product_name: answer.choice
            }
          ],
          function(error) {
            if (error) throw err;
            console.log("Stock updated successfully!");
            prompt();
          }
        );
      
    });
  });
}

//display a prompt that will let the manager "add more" of any item currently in the store.
function addNew() {
  connection.query("SELECT * FROM bamazon.products", function(err, results) {
    if (err) throw err;
    // prompt the user for which they'd like to add more to
    inquirer
      .prompt([
        {
          name: "prodName",
          type: "input",
          message: "Enter a product name:"
        },
        {
          name: "departmentName",
          type: "input",
          message: "Enter a department name:"
        },
        {
          name: "price",
          type: "input",
          message: "Enter a price:"
        },
        {
          name: "stockNum",
          type: "input",
          message: "Enter the stock quantity:"
        }
      ])
      .then(function(answer) {
        connection.query(
          "INSERT INTO products SET ?",
          {
            product_name: answer.prodName,
            department_name: answer.departmentName,
            price: answer.price,
            stock_quantity: answer.stockNum
          },
          function(error) {
            if (error) throw err;
            console.log("New product added successfully!");
            prompt();
          }
        );
      
    });
  });
}
