var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Ildhcmfam226!",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    start();
});

function start() {
    console.log("\n===================="
        + "\nFeel free to browse!"
        + "\n====================\n")

    connection.query("SELECT * FROM products", function(err, results) {

        for (var i = 0; i < results.length; i++) {
            console.log("Product Name: " + results[i].product_name 
            + "\nDepartment Name: " + results[i].department_name 
            + "\nPrice: $" + results[i].price 
            + "\nItem ID: " + results[i].item_id
            + "\n\n===============================================\n");
        };

        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function() {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].product_name);
                        };
                        return choiceArray;
                    },
                    message: "What would you like to buy?"
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many would you like to purchase?"
                }
            ])
            .then(function(answer) {
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].product_name === answer.choice) {
                        chosenItem = results[i];
                    };
                };
                if (chosenItem.stock_quantity >= answer.quantity) {
                    var newQuantity = parseInt(chosenItem.stock_quantity - answer.quantity);
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: newQuantity
                            },
                            {
                                item_id: chosenItem.item_id
                            }
                        ],
                        function(error) {
                            if (error) throw err;
                        },
                        console.log("\nThank you for your purchase! Your total is $" + chosenItem.price * answer.quantity + ".\n")
                    )
                    continueShopping();
                } else {
                    console.log("Sorry, we don't have that many in stock.")
                    continueShopping();
                };
            });
    });
};

function continueShopping() {
    inquirer
        .prompt({
            name: "continue",
            type: "rawlist",
            choices: [
                "Yes",
                "No"
            ],
            message: "Would you like to continue shopping?"
        })
        .then(function(answer) {
            console.log(answer)
            if (answer.continue === "Yes") {
                start();
            } else {
                console.log("\n====================================" + 
                "\nThank you for shopping with Bamazon!" +
                "\n====================================\n" +

                "\n '-||__/__________" +
                "\n |==/|_|_|_|_|_/" +
                "\n |=/_|_|_|_|_|/" +
                "\n |/|_|_|_|_|_/" +
                "\n |_|_|_|_|_|/" +
                "\n   )_____(_" +
                "\n  [--------|" +
                '\n  (o)""""(o) \n'

                );
                connection.end();
            }
        })
}