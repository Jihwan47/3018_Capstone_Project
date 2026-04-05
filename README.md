Project Milestone 
    Jihwan Hwang 
    0334067 

Project Concept: 
    My project concept is a RESTful API for restaurant and menu management. 
    Profile, Menu Items, Orders and reviews. Customers can find information about the restaurant, explore 
    the menus, order menu or leave comments about the restaurant. 
    Scope and Functionality: 

Restaurants (2~3 restaurants) 
    GET - /api/v1/restaurants - List all restaurants (2~3) 
    GET - /api/v1/restaurants/:id - Get specific restaurant with unique identifier 
    POST - /api/v1/restaurants - Create restaurant (Admin can create restaurant) 
    PUT - /api/v1/restaurants/:id - Update restaurant (Owner can update restaurant) 
    DELETE - /api/v1/restaurants/:id - Delete restaurant (Admin can delete restaurant) 

Menu (mostly for the owner) 
    GET - /api/v1/restaurants/:id/menu - List all menus of the specific restaurant 
    POST - /api/v1/restaurants/:id/menu - Add menu item (Owner can add items to the menu) 
    PUT - /api/v1/restaurants/:id/menu/:itemId - Update menu item (Owner can update items) 
    DELETE - /api/v1/restaurants/:id/menu/:itemId - Delete menu item (Owner can delete items) 

Order 
    POST - /api/v1/orders - Customer place an order (Customer can order their food) 
    GET - /api/v1/orders/:id - Customer can review their order / Owner can review customer's order 
    (customer / Owner) 
    PUT - /api/v1/orders/:id/status - Update order status (Delivery or Pickup)(Owner can update the status 
    of orders) 
    Reviews 
    POST - /restaurants/:id/reviews - Customer can leave a review (Customer leave reviews to the specific 
    restaurant) 

Course Content Alignment: 
    All parts of this project align with the course content, as the program addresses the full scope of back
    end security. Securing sensitive data, authentication, authorization, HTTP headers, request validation 
    and the overall application architecture from the course. 
    In terms of architecture, the API follows the layers of structure covered in the course. Routes, 
    Controllers, Service and Repository with CRUD operations (create, read, update, delete) implemented. 
    For authentication and authorization, the project will use Firebase Authentication management for user 
    management and implementations role-based access with three roles as described in the Scope and 
    Functionality. Admin, Owner and Customer 
    On the data and validation part, Firebase firestore will be used as the database. All incoming requests 
    will be validated using Joi Schemas and error middleware will handle error responses across the 
    application. 
    For testing, Jest will be mainly used for unit tests and GitHub actions will be configured to run 
    automated tests on every push and pull request from the branch. 
    Security headers will be configured using Helmet.js, CORS will be set up for cross-origin request 
    management, and dotenv will be used for environment variable management. 
    For project management, Issues and Milestones will be configured to track tasks and progress the 
    project. 