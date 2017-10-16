## Readme

##  What the app does and how it works

Nozama.com is an e-commerce app that allows users to create an account and browse and select items to add to their shopping cart, and can then purchase utilizing Stripe, an external api.

## Link to Front end repositories

[Nozama.com front end](https://github.com/GA-Brogrammers/project-3-ecommerce-client)

## Link to both deployed sites

Client: https://ga-brogrammers.github.io/project-3-ecommerce-client/

API:
https://whispering-tor-36273.herokuapp.com/



## List of technologies used

HTML, CSS, Bootstrap, Javascript, jQuery, handlebars, Stripe

## List unsolved problems which would be fixed in future iterations

We reached our planned goals for the API.


## Planning, process and problem-solving strategy
We started with team meetings to plan our stategies. We then created wireframes, ERD, and user stories to guide our development process. We started pair programming to setup the initial file structures and features. Once we were past the initial stage, we broke off and worked both in pairs or individually on selected features. Our group routinely regrouped to discuss our progress or troubleshoot issues.




## Entity Relationship Diagram (ERD)

Products -< Shopping list >- Users

* products_id  * user_id foreign key       * user_id
* name         * products_id foreign key   * email
* price        * purchased boolean         * password

![Sketch](https://i.imgur.com/TswQtm1.jpg)

## API end-points

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| DELETE | `/sign-out/:id`        | `users#signout`   |
| PATCH  | `/change-password/:id` | `users#changepw`  |
| POST   | `/products`            | `products#create` |
| PATCH  | `/products/:id`        | `products#update` |
| GET    | `/products`            | `products#index`  |
| GET    | `/products/:id`        | `products#show`   |
| DELETE | `/products/:id`        | `products#destroy`|
| POST   | `/orders`              | `orders#create`   |
| PATCH  | `/orders/:id`          | `orders#update`   |
| GET    | `/orders`              | `orders#index`    |
| GET    | `/orders/:id`          | `orders#show`     |
| DELETE | `/orders/:id`          | `orders#destroy`  |
| POST   | `/charges`             | `charges#create`  |
| PATCH  | `/charges/:id`         | `charges#update`  |
| GET    | `/charges`             | `charges#index`   |
| GET    | `/charges/:id`         | `charges#show`    |
| DELETE | `/charges/:id`         | `charges#destroy` |

All data returned from API actions is formatted as JSON.
