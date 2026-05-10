# Restaurant Management RESTful API - Portfolio

## 📌 Project Overview

A comprehensive RESTful API backend system for managing restaurants, menus, and orders. The API enables customers to explore restaurant information, browse menus, place orders, and manage their transactions. Restaurant owners can manage their menus and order fulfillment, while administrators maintain system-wide operations.

**Key Achievement**: Built a production-ready API with role-based access control, automated testing, and comprehensive documentation.

---

## 🏗️ Architecture Design

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

**Design Benefits:**
- Clean separation of concerns
- Easy to test and maintain
- Scalable and modular
- Clear dependency flow

---

## 🔐 Role-Based Access Control (RBAC)

### Three User Roles

| Role | Permissions | Responsibilities |
|------|-------------|------------------|
| **Admin** | • Create/Update/Delete Restaurants • View all orders • System management | Oversee platform operations, manage restaurant registrations |
| **Owner** | • Manage own restaurant menu • Update order status • View customer orders | Manage inventory, process orders, update delivery status |
| **Customer** | • Browse restaurants • View menus • Place orders • Track orders | Browse, order food, track delivery |

### Authentication Flow
```
User Login → Firebase Authentication 
         → Token Generation
         → Role Extraction
         → Authorization Middleware
         → Route Access Control
```

---

## 📡 Complete API Endpoints

### Restaurants Management

```
GET    /api/v1/restaurants              - List all restaurants
GET    /api/v1/restaurants/:id          - Get specific restaurant details
POST   /api/v1/restaurants              - Create new restaurant (Admin only)
PUT    /api/v1/restaurants/:id          - Update restaurant (Owner only)
DELETE /api/v1/restaurants/:id          - Delete restaurant (Admin only)
```

**Example Request/Response:**

```json
// POST /api/v1/restaurants (Admin)
{
  "name": "Italian Kitchen",
  "description": "Authentic Italian cuisine",
  "address": "123 Main St",
  "phone": "555-0100",
  "owner_id": "user_123"
}

// Response: 201 Created
{
  "id": "rest_001",
  "name": "Italian Kitchen",
  "status": "active",
  "created_at": "2026-05-10T10:30:00Z"
}
```

### Menu Management

```
GET    /api/v1/restaurants/:id/menu              - List all menu items
POST   /api/v1/restaurants/:id/menu              - Add menu item (Owner only)
PUT    /api/v1/restaurants/:id/menu/:itemId      - Update menu item (Owner only)
DELETE /api/v1/restaurants/:id/menu/:itemId      - Delete menu item (Owner only)
```

**Example Request:**

```json
// POST /api/v1/restaurants/rest_001/menu (Owner)
{
  "name": "Pasta Carbonara",
  "description": "Classic Italian pasta",
  "price": 14.99,
  "category": "Pasta",
  "available": true,
  "preparation_time": 15
}

// Response: 201 Created
{
  "id": "item_001",
  "restaurant_id": "rest_001",
  "name": "Pasta Carbonara",
  "price": 14.99
}
```

### Order Management

```
POST   /api/v1/orders                   - Create new order (Customer)
GET    /api/v1/orders/:id               - Get order details (Customer/Owner)
PUT    /api/v1/orders/:id/status        - Update order status (Owner only)
GET    /api/v1/users/:id/orders         - Get user's orders (Customer)
```

**Example Request:**

```json
// POST /api/v1/orders (Customer)
{
  "restaurant_id": "rest_001",
  "items": [
    {
      "menu_item_id": "item_001",
      "quantity": 2,
      "special_instructions": "Extra sauce"
    }
  ],
  "delivery_type": "delivery",
  "delivery_address": "456 Oak St",
  "total_price": 29.98
}

// Response: 201 Created
{
  "id": "order_001",
  "status": "pending",
  "created_at": "2026-05-10T11:00:00Z",
  "estimated_delivery": "2026-05-10T11:30:00Z"
}
```

---

## 🛠️ Technology Stack

### Backend Framework
- **Express.js** (v5.2.1) - Lightweight HTTP server framework
- **TypeScript** - Type-safe JavaScript for production code
- **Node.js** - Runtime environment

### Database & Authentication
- **Firebase Firestore** - NoSQL database for real-time data synchronization
- **Firebase Admin SDK** (v13.7.0) - Backend authentication and authorization
- **Firebase Authentication** - User management and JWT token generation

### Data Validation & Security
- **Joi** (v18.1.2) - Schema validation for API requests
- **Helmet.js** (v8.1.0) - HTTP security headers (XSS, CSRF protection)
- **CORS** (v2.8.6) - Cross-Origin Resource Sharing configuration
- **dotenv** (v17.4.0) - Environment variable management

### Testing & Code Quality
- **Jest** (v30.3.0) - Unit testing framework
- **Supertest** (v7.2.2) - HTTP assertion library
- **ts-jest** - TypeScript support for Jest
- **ESLint** - Code quality and consistency
- **TypeScript ESLint** - TypeScript-specific linting

### API Documentation
- **Swagger/OpenAPI** - API specification and documentation
- **Redocly CLI** - Generate interactive API documentation

### Development Tools
- **ts-node** - Direct TypeScript execution
- **Morgan** (v1.10.1) - HTTP request logging

---

## 📁 Project Structure

```
3018_Capstone_Project/
├── src/
│   ├── api/                          # API layer
│   │   ├── routes/
│   │   │   ├── restaurants.ts
│   │   │   ├── menus.ts
│   │   │   └── orders.ts
│   │   ├── controllers/
│   │   │   ├── restaurantController.ts
│   │   │   ├── menuController.ts
│   │   │   └── orderController.ts
│   │   ├── services/
│   │   │   ├── restaurantService.ts
│   │   │   ├── menuService.ts
│   │   │   └── orderService.ts
│   │   └── repositories/
│   │       ├── restaurantRepository.ts
│   │       ├── menuRepository.ts
│   │       └── orderRepository.ts
│   ├── middleware/
│   │   ├── authMiddleware.ts         # Firebase auth & role validation
│   │   ├── errorHandler.ts           # Global error handling
│   │   └── validationMiddleware.ts   # Request validation
│   ├── constants/
│   │   ├── httpStatus.ts
│   │   ├── errorMessages.ts
│   │   └── userRoles.ts
│   ├── types/
│   │   ├── express.d.ts             # Express type extensions
│   │   ├── restaurant.ts
│   │   ├── menu.ts
│   │   └── order.ts
│   ├── config/
│   │   ├── firebase.ts              # Firebase configuration
│   │   └── constants.ts
│   ├── app.ts                        # Express app setup
│   └── server.ts                     # Server entry point
├── tests/
│   ├── unit/
│   │   ├── services/
│   │   ├── repositories/
│   │   └── controllers/
│   └── integration/
│       └── api.test.ts
├── config/
│   └── .env.example
├── docs/
│   └── index.html                   # Generated API documentation
├── scripts/
│   └── generate-openapi.ts          # OpenAPI spec generator
├── package.json                      # Dependencies & scripts
├── tsconfig.json                     # TypeScript configuration
├── jest.config.js                    # Jest testing configuration
├── eslint.config.mjs                 # ESLint configuration
└── README.md
```

---

## 🔒 Security Implementation

### Authentication
- **Firebase Authentication**: Secure user registration and login
- **JWT Tokens**: Stateless authentication with token-based approach
- **Token Validation**: Middleware validates every protected endpoint

### Authorization
- **Role-Based Access Control**: Three-tier permission system
- **Request-Level Authorization**: Middleware checks user role before route access
- **Resource Ownership Validation**: Verify user owns resource before modification

### Data Protection
- **Request Validation**: Joi schemas validate all incoming data
- **SQL Injection Prevention**: Firestore provides inherent protection
- **XSS Protection**: Helmet.js sets security headers

### API Security Headers
```
Content-Security-Policy
X-Content-Type-Options
X-Frame-Options
X-XSS-Protection
Strict-Transport-Security
```

### Rate Limiting
- **Order Rate Limit**: 3 orders per hour, 10 orders per day per user
- **Block Duration**: 24-hour block if daily limit exceeded
- **Purpose**: Prevent fraud, abuse, and DDoS attacks

---

## 🧪 Testing Strategy

### Test Coverage Approach

```
┌─────────────────────────────────┐
│   Integration Tests             │ ← Full API flow
│   (Supertest + Jest)            │
├─────────────────────────────────┤
│   Service Layer Tests           │ ← Business logic
│   (Unit tests)                  │
├─────────────────────────────────┤
│   Repository Layer Tests        │ ← Data access
│   (Mock Firestore)              │
├─────────────────────────────────┤
│   Middleware Tests              │ ← Auth & validation
│   (Unit tests)                  │
└─────────────────────────────────┘
```

### Jest Configuration
```javascript
// jest.config.js
{
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  collectCoverageFrom: ['src/**/*.ts']
}
```

### Running Tests
```bash
npm test              # Run all tests
npm run test:watch   # Watch mode for development
npm run test:coverage # Generate coverage report
```

---

## 📚 API Documentation

### Auto-Generated Documentation
- **OpenAPI/Swagger Specification**: Machine-readable API contract
- **Interactive Redocly UI**: Browse and test endpoints
- **Build Command**: `npm run generate-docs`
- **Output**: Hosted at `/docs` endpoint

### Documentation Contents
- All endpoint details
- Request/response schemas
- Authentication requirements
- Error responses
- Example payloads

---

## 🚀 Development Workflow

### Setup & Installation
```bash
# Clone repository
git clone https://github.com/Jihwan47/3018_Capstone_Project.git

# Install dependencies
npm install

# Setup environment variables
cp config/.env.example .env
# Configure Firebase credentials, API keys

# Start development server
npm start

# Access API at http://localhost:3000
```

### Development Commands
```bash
npm start                    # Start server (ts-node)
npm run build               # Compile TypeScript to JavaScript
npm test                    # Run test suite
npm run test:coverage       # Generate test coverage report
npm run generate-docs       # Generate API documentation
```

### Code Quality
```bash
npm run lint                # Check code quality with ESLint
npm run lint:fix            # Auto-fix linting issues
```

---

## 🌐 Deployment Options

### Firebase Deployment
```bash
# Deploy to Firebase Cloud Functions
firebase deploy
```

### Cloud Platform Options
- **Google Cloud Run**: Containerized deployment
- **Heroku**: Simple Node.js deployment
- **AWS Lambda**: Serverless architecture
- **DigitalOcean**: Virtual private server

### Environment Configuration
```env
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_email
NODE_ENV=production
API_PORT=3000
```

---

## 💡 Key Technical Achievements

### 1. **Clean Architecture**
- Implemented layered architecture with clear separation of concerns
- Easy to test, maintain, and extend each layer independently

### 2. **Role-Based Access Control**
- Three distinct user roles with specific permissions
- Middleware-based authorization for all endpoints
- Resource ownership validation

### 3. **Type Safety**
- Full TypeScript implementation for compile-time error detection
- Type-safe API contracts between layers

### 4. **Automated Testing**
- Comprehensive unit and integration tests
- Continuous integration with GitHub Actions
- Test coverage reporting

### 5. **Security First**
- Firebase authentication and authorization
- Request validation with Joi schemas
- Security headers with Helmet.js
- Rate limiting for fraud prevention
- CORS configuration

### 6. **Production-Ready**
- Error handling middleware for consistent error responses
- Request logging with Morgan
- Environment variable management
- OpenAPI documentation

### 7. **Developer Experience**
- TypeScript for better IDE support and error catching
- Comprehensive API documentation
- Clear project structure for onboarding
- Development and production configurations

---

## 📈 Performance Features

- **Firestore Indexing**: Optimized database queries
- **Request Logging**: Monitor API performance with Morgan
- **Rate Limiting**: Prevent abuse and protect infrastructure
- **Stateless Design**: Easy horizontal scaling
- **Asynchronous Operations**: Non-blocking I/O

---

## 🔄 Continuous Integration

### GitHub Actions Pipeline
- Automated tests on every push
- Automated tests on pull requests
- Code coverage reports
- Linting checks

---

A production-grade REST API suitable for real-world restaurant delivery platform scenarios.
