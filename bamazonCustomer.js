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
      .prompt({
        name: "itemID",
        type: "input",
        message: "What is the ID of the item you would like to purchase?"
      },
      {
        name: "numUnits",
        type: "input",
        message: "How many units would you like?"
      })
      .then(function(answer) {
        console.log(answer.itemID);
        console.log(answer.numUnits);
        connection.end();
      });
  }



async function readAll() {
    connection.query('SELECT * FROM bamazon.products;', function (err, results, fields) {
        console.table(results);
    });
};