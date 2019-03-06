DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30),
    price DECIMAL(10,2),
    stock_quantity INTEGER (10),

    PRIMARY KEY (item_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ("shirt", "clothing", 15, 8), 
        ("pants", "clothing", 25, 10),
        ("tent", "outdoors", 75.05, 1),
        ("backpack", "outdoors", 44, 5),
        ("bottle", "accessories", 20.12, 3),
        ("spatula", "kitchenware", 7, 2), 
        ("phone", "electronics", 245.99, 8),
        ("watch", "electronics", 145, 10),
        ("pencils", "accessories", 10, 4),
        ("pens", "accessories", 8, 3);

SELECT * FROM products;
