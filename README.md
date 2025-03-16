# Food Delivery App
## Overview
The **Food Delivery App** is a web-based application designed to provide users with a seamless food ordering experience. It allows customers to browse food menus, place orders, track deliveries, and make secure payments. The app is designed with user-friendliness and scalability in mind.

## Tech Stack
The app is built using the following technologies:

### Frontend :
**React.js** : 
  - A JavaScript library for building user interfaces, allowing the creation of a dynamic and interactive front-end.
1. **Redux toolkit** :
  - A state management tool to handle complex state logic across the application, providing a predictable state container.
2. **CSS3/Sass/teilwin css/shadcn ui** :
  - For styling the components with responsive layouts, animations, and custom themes.
3. **Axios** :
  - For making HTTP requests to the backend API to fetch data, such as menus, orders, and user details.
### Backend:
1. Node.js: A JavaScript runtime used for building the server-side application, handling requests, and processing data.
2. Express.js: A minimal and flexible Node.js web application framework used for building APIs and routing.
3. MongoDB: A NoSQL database used for storing user data, order details, menus, and other app-related information.
4. Mongoose: An ODM (Object Data Modeling) library for MongoDB and Node.js that provides a schema-based solution to model the app's data.
5. JWT (JSON Web Tokens): Used for authentication and authorization, securing API endpoints and protecting routes for logged-in users.
6. Bcrypt.js: Used for hashing user passwords for secure authentication.
7. Additional Tools:
8. Docker: To containerize the application, ensuring consistency across different environments and easier deployment.
9. Nginx: Used as a reverse proxy to handle requests and optimize app performance in production.
### Features
The Food Delivery App supports the following features:

1. User Registration and Login:
Users can create an account or log in using their email and password.
Secure authentication using JWT for session management.
Passwords are hashed using Bcrypt.js for added security.
2. Browse Menu:
Users can browse through a variety of food categories.
Menus are dynamically loaded from the backend and displayed in an organized way (using React components).
3. Place Orders:
Users can add food items to their cart and proceed to checkout.
During checkout, users can select their payment method (e.g., credit card or COD).
4. Order Tracking:
After placing an order, users can track their orders in real-time.
The app shows the order status (e.g., "Preparing", "Out for delivery", "Delivered").
5. Secure Payment Integration:
Payment methods like credit cards or wallets can be integrated.
Secure payments are processed via third-party payment gateways (Stripe, PayPal, etc.).
6. Admin Dashboard:
Admins can manage the app’s content, including menu items, user data, and order history.
Admins can view all orders placed by users and update order status.
What's Working
The following features are fully functional in the current version of the app:

**User Authentication**: Users can register, log in, and authenticate via JWT. Passwords are securely hashed.
1. Menu Display: Menus are fetched from the database and displayed to users.
2. Add to Cart & Checkout: Users can add items to their cart, proceed to checkout, and place orders.
3. Order Status Updates: Orders are tracked from placement to delivery, with real-time updates on the status.
4. Admin Features: Admin users can view orders, manage the menu, and monitor app activity.
5. Future Improvements
6. Mobile Application: A mobile version of the app for both iOS and Android.
7. Push Notifications: For real-time updates on order status.
8. Recommendation System: Personalized food recommendations based on user preferences and past orders.
9. Payment Gateway Integration: Adding more payment methods such as Apple Pay, Google Pay, and local payment options.

*Installation Instructions*
1. Clone the Repository:
bash
Copy
git clone https://github.com/Adityakbr01/Food-app-2025.git
2. Navigate to the project folder:
bash
Copy
cd Food-app-2025
3. Install Backend Dependencies:
bash
Copy
npm install
4. Set up Environment Variables:
Create a .env file in the root directory with the following keys:

ini
Copy
JWT_SECRET=your_secret_key
MONGODB_URI=your_mongodb_connection_string
5. Run the Application:
For Development:
bash
Copy
npm run dev
For Production:
bash
Copy
npm run start
Contributing
We welcome contributions to the project. If you'd like to contribute, please follow the steps below:

Fork the repository
Create a new branch (git checkout -b feature/your-feature-name)
Commit your changes (git commit -am 'Add new feature')
Push to the branch (git push origin feature/your-feature-name)
Open a Pull Request
License
This project is licensed under the MIT License - see the LICENSE file for details.
