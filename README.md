## Readme

##  What the app does and how it works

Nozama.com is an e-commerce app that allows users to create an account and browse and select items to add to their shopping cart, and can then purchase utilizing Stripe, an external api.

## Link to Front end repositories

[Nozama.com front end](https://github.com/GA-Brogrammers/project-3-ecommerce-client)

## Link to both deployed sites



## List of technologies used

HTML, CSS, Bootstrap, Javascript, jQuery, handlebars, Stripe

## List unsolved problems which would be fixed in future iterations



## Planning, process and problem-solving strategy

[Workflow checklist] (https://github.com/GA-Brogrammers/project-3-ecommerce-client/blob/master/checklist.md)

## Enity Relationship Diagram (ERD)

Products -< Shopping list >- Users

* products_id  * user_id foreign key       * user_id
* name         * products_id foreign key   * email
* price        * purchased boolean         * password

![Sketch](https://i.imgur.com/TswQtm1.jpg)

## A catalog of routes (paths and methods) that the API expects

* products
* orders
* charges
