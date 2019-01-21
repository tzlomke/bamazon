# Bamazon

## Bamazon
Bamazon is a node.js-based CLI App utilizing a MySQL database, the mysql NPM package the inquirer NPM package to mimick a storefront. In this case, Bamazon is an outdoors store, but the database can bee seeded with whatever products you'd like.

## Motivation
The Bamazon project was an opportunity to gain a more intimate understanding of backend development, particularly database management.

## Getting Started
To get started, clone the repository at https://github.com/tzlomke/bamazon and install the required NPM packages (mysql and inquirer). Additionally, the schema.sql and seeds.sql files will be run to create and seed a database containing the products on offer. 

## Using Bamazon
Once installed, Bamazon can be run from your preferred CLI using the command **node bamazonCusomer.js**
![Start](images/start)

Once the command has been run, Inquirer takes over to present the user with the items available for sale. 
![Items](images/item_list)

Users can select an item and quantity at which point they will be given the total for their purchase.
![Selection](images/item_selection)
![Total](images/purchase_total)

Afterwards the user is given the opportunity to either continue shopping and return to the list of products, or to end shopping which will sever the connection with the database.
![Continue?](images/end)

### Author
Taylor Zlomke | https://github.com/tzlomke/