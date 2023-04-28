# Shop on node.js & react.js

This is a full-stack web application built with Node.js, Express, and React. It allows users to browse and purchase products from a fictional online store.

## Installation
1. Clone this repository to your local machine.
2. Install dependencies by running \`npm install\` in both the client and server directories.
3. Create a .env file in the server directory with the following environment variables:

   <pre>
   PORT: The port on which the application will run
         
   DB_USER: database username.
         
   DB_PASSWORD: The password to access the database.
        
   DB_HOST: The address of the database host.
         
   DB_NAME: the name of the database.
        
   DB_PORT: Port to connect to the database.
         
   DEFAULT_ORDER_STATUS: Default order status id in the db.
         
   SECRET_JWT: The secret key for generating and validating JSON Web Tokens (JWTs).
         
   ADMIN_ROLE: The id of the administrator role in the db.
         
   MAX_PRODUCTS_PER_ORDER: The maximum number of products that can be added to one order. 
   </pre>
4. Start the development server by running `npm run dev` in both the client and server directories.

## Features
- Browse products by category and search for specific products.
- View product details, including description, price, and availability.
- Add products to the shopping cart and checkout securely.
- Login and register to save your shopping cart and view your order history.
- Admin users can add, update, and delete products, categories, and orders.


### User authentication
Users can create an account, register, and login.  <br>
User passwords are encrypted using the `bcrypt` library, and `JSON Web Tokens (JWTs)` are used to authenticate users.

### Product browsing
The application allows users to browse products by category or brand Users can view product details such as the product image, description, price, and availability.

### Shopping cart
Users can add products to the shopping cart. The shopping cart is saved for logged-in users, so they can return later to complete their purchase.


### Admin functionality
Admin users have access to additional features, such as the ability to add, and delete products, categories, and orders.

## Technologies
- Node.js
- Express
- Sequelize
- JWT

- React

## License
This project is licensed under the MIT License - see the `LICENSE` file for details.
