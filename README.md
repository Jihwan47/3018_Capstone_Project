# Restaurant Management RESTful API

## Overview

A comprehensive RESTful API backend system for managing restaurants, menus, and orders. This API enables customers to explore restaurant information, browse menus, place orders, and manage their transactions. Restaurant owners can manage their menus and order fulfillment, while administrators maintain system-wide operations.

**Technology**: TypeScript, Express.js, Firebase, Joi, Jest

---

## Features

### Core Functionality
- 🍽️ **Restaurant Management** - Create, read, update, and delete restaurant profiles
- 📋 **Menu Management** - Manage menu items with descriptions, prices, and availability
- 🛒 **Order Management** - Place orders, track status, and manage fulfillment
- 👥 **Role-Based Access Control** - Three user roles (Admin, Owner, Customer) with specific permissions
- 🔐 **Authentication & Authorization** - Firebase Authentication with JWT tokens
- ✅ **Request Validation** - Joi schema validation for all incoming data
- 📚 **API Documentation** - Auto-generated OpenAPI/Swagger documentation

### Security Features
- 🛡️ HTTP Security Headers (Helmet.js)
- 🔒 CORS Configuration
- ⏱️ Rate Limiting (3 orders/hour, 10 orders/day per user)
- 🔑 Firebase-based Authentication
- 📝 Request Logging (Morgan)
- 🚫 XSS & CSRF Protection

---

## Quick Start

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Firebase project setup
- Environment variables configured

### Installation

```bash
# Clone the repository
git clone https://github.com/Jihwan47/3018_Capstone_Project.git
cd 3018_Capstone_Project

# Install dependencies
npm install

# Configure environment variables
cp config/.env.example .env
# Edit .env with your Firebase credentials and API keys

# Start development server
npm start

# Server runs at http://localhost:3000
```

---

## Project Structure

```
src/
├── api/v1/
│   ├── routes/              # API endpoints
│   │   ├── restaurantRoutes.ts
│   │   ├── menuRoutes.ts
│   │   └── orderRoutes.ts
│   ├── controllers/         # Request handlers
│   │   ├── restaurantController.ts
│   │   ├── menuController.ts
│   │   └── orderController.ts
│   ├── services/            # Business logic
│   │   ├── restaurantService.ts
│   │   ├── menuService.ts
│   │   └── orderService.ts
│   ├── repositories/        # Data access layer
│   │   ├── restaurantRepository.ts
│   │   ├── menuRepository.ts
│   │   └── orderRepository.ts
│   ├── middleware/          # Express middleware
│   │   ├── authMiddleware.ts
│   │   ├── errorHandler.ts
│   │   └── validationMiddleware.ts
│   ├── types/               # TypeScript interfaces
│   │   ├── restaurant.ts
│   │   ├── menu.ts
│   │   └── order.ts
│   └── models/              # Data models
├── constants/               # Application constants
├── config/                  # Configuration files
├── tests/                   # Test files
└── server.ts                # Entry point
```

---

## Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| **Runtime** | Node.js | 18+ |
| **Language** | TypeScript | 5.9.3 |
| **Framework** | Express.js | 5.2.1 |
| **Database** | Firebase Firestore | - |
| **Authentication** | Firebase Admin SDK | 13.7.0 |
| **Validation** | Joi | 18.1.2 |
| **Security** | Helmet.js | 8.1.0 |
| **CORS** | cors | 2.8.6 |
| **Logging** | Morgan | 1.10.1 |
| **Testing** | Jest | 30.3.0 |
| **Testing HTTP** | Supertest | 7.2.2 |
| **API Docs** | Swagger/OpenAPI | - |
| **Linting** | ESLint | 9.39.2 |

---

## API Endpoints

### Restaurants

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/restaurants` | List all restaurants | Public |
| GET | `/api/v1/restaurants/:id` | Get restaurant details | Public |
| POST | `/api/v1/restaurants` | Create restaurant | Admin |
| PUT | `/api/v1/restaurants/:id` | Update restaurant | Owner |
| DELETE | `/api/v1/restaurants/:id` | Delete restaurant | Admin |

### Menus

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/restaurants/:id/menu` | List menu items | Public |
| POST | `/api/v1/restaurants/:id/menu` | Add menu item | Owner |
| PUT | `/api/v1/restaurants/:id/menu/:itemId` | Update menu item | Owner |
| DELETE | `/api/v1/restaurants/:id/menu/:itemId` | Delete menu item | Owner |

### Orders

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/orders` | Create order | Customer |
| GET | `/api/v1/orders/:id` | Get order details | Customer/Owner |
| PUT | `/api/v1/orders/:id/status` | Update order status | Owner |
| GET | `/api/v1/users/:id/orders` | Get user orders | Customer |

---

## Installation

### Step 1: Clone Repository
```bash
git clone https://github.com/Jihwan47/3018_Capstone_Project.git
cd 3018_Capstone_Project
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Setup Environment Variables
```bash
cp config/.env.example .env
```

Edit `.env` with your configuration:
```env
NODE_ENV=development
PORT=3000
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_email
```

### Step 4: Start Server
```bash
npm start
```

---

## Usage

### Making API Requests

#### Example: Create Restaurant (Admin)
```bash
curl -X POST http://localhost:3000/api/v1/restaurants \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Italian Kitchen",
    "description": "Authentic Italian cuisine",
    "address": "123 Main St",
    "phone": "555-0100"
  }'
```

#### Example: Add Menu Item (Owner)
```bash
curl -X POST http://localhost:3000/api/v1/restaurants/rest_001/menu \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Pasta Carbonara",
    "description": "Classic Italian pasta",
    "price": 14.99,
    "category": "Pasta"
  }'
```

#### Example: Place Order (Customer)
```bash
curl -X POST http://localhost:3000/api/v1/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "restaurant_id": "rest_001",
    "items": [
      {
        "menu_item_id": "item_001",
        "quantity": 2
      }
    ],
    "delivery_type": "delivery",
    "delivery_address": "456 Oak St"
  }'
```

---

## Testing

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Generate Coverage Report
```bash
npm run test:coverage
```

### Test File Structure
```
tests/
├── unit/
│   ├── services/
│   ├── repositories/
│   └── controllers/
└── integration/
    └── api.test.ts
```

---

## Deployment

### Build Production
```bash
npm run build
```

### Firebase Deployment
```bash
firebase deploy
```

### Environment Setup for Production
```env
NODE_ENV=production
PORT=3000
FIREBASE_PROJECT_ID=your_prod_project_id
FIREBASE_PRIVATE_KEY=your_prod_private_key
```

### Deployment Platforms
- Google Cloud Run
- Firebase Cloud Functions
- Heroku
- AWS Lambda
- DigitalOcean

---

## Architecture

### Layered Architecture Pattern

```
┌─────────────────────────────────┐
│      Express Application        │
├─────────────────────────────────┤
│  Routes Layer                   │
│  (HTTP Request Handlers)        │
├─────────────────────────────────┤
│  Controllers Layer              │
│  (Business Logic Orchestration) │
├─────────────────────────────────┤
│  Services Layer                 │
│  (Business Rules & Logic)       │
├─────────────────────────────────┤
│  Repository Layer               │
│  (Data Access & Operations)     │
├─────────────────────────────────┤
│  Firebase Firestore             │
│  (Database)                     │
└─────────────────────────────────┘
```

### Role-Based Access Control

| Role | Permissions |
|------|------------|
| **Admin** | Create/Update/Delete Restaurants, View all orders, System management |
| **Owner** | Manage own restaurant menu, Update order status, View customer orders |
| **Customer** | Browse restaurants, View menus, Place orders, Track orders |

---

## Documentation

### API Documentation
- **Endpoint**: `/api/v1/docs`
- **Format**: OpenAPI/Swagger
- **Generated**: `npm run generate-docs`
- **Output**: `docs/index.html`

### Public Documentation
https://jihwan47.github.io/3018_Capstone_Project/

### Additional Resources
- See `PORTFOLIO.md` for detailed technical implementation
- See `README.md` for project specifications

---

## Scripts

```bash
npm start                    # Start development server
npm run build               # Build TypeScript to JavaScript
npm test                    # Run test suite
npm run test:watch         # Run tests in watch mode
npm run test:coverage      # Generate test coverage
npm run generate-docs      # Generate API documentation
npm run lint               # Check code quality
npm run lint:fix           # Fix linting issues
```

---

## Security Implementation

### Authentication
- Firebase Authentication for user management
- JWT token-based stateless authentication
- Middleware validation on protected routes

### Authorization
- Role-based access control (RBAC)
- Three-tier permission system
- Resource ownership validation

### Data Protection
- Request validation with Joi schemas
- Security headers via Helmet.js
- CORS configuration
- Environment variable management with dotenv

### Rate Limiting
- 3 orders per hour limit per user
- 10 orders per day limit per user
- 24-hour block on daily limit exceeded

---

## Development

### Code Quality
```bash
# Run ESLint
npm run lint

# Fix linting issues
npm run lint:fix
```

### TypeScript Compilation
```bash
# Compile TypeScript
npm run build

# Output: dist/ directory
```

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

ISC License - See repository for details

---

## Support

For issues, questions, or suggestions, please open an issue on GitHub:
https://github.com/Jihwan47/3018_Capstone_Project/issues

---

## Author

**Jihwan Hwang**  
- GitHub: [@Jihwan47](https://github.com/Jihwan47)
- Email: Jhwang47@academic.rrc.ca
- ID: 0334067
