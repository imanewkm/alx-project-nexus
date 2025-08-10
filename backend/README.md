# SocialCrafters Backend

This directory contains the Django backend API for the SocialCrafters social media platform, providing a robust GraphQL API for the mobile frontend application.

## � Security & Best Practices

### **Environment Configuration**
```bash
# Copy and configure environment variables
cp .env.example .env
# Edit .env with your actual values (this file is git-ignored)
```

### **Secure Development**
- ✅ **Environment variables** properly externalized
- ✅ **Database credentials** not in source code
- ✅ **Secret keys** managed through .env files
- ✅ **Debug mode** configurable for production
- ✅ **Sensitive files** excluded via comprehensive .gitignore

### **Production Security**
- ✅ **HTTPS enforcement** in production settings
- ✅ **CORS properly configured** for your domains
- ✅ **SQL injection protection** via Django ORM
- ✅ **XSS protection** enabled
- ✅ **CSRF protection** configured

See [SECURITY.md](../SECURITY.md) for complete security checklist.

## �🚀 Quick Start

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Start development server
python manage.py runserver
```

## 🏗️ Project Structure

```
backend/
├── manage.py              # Django management script
├── db.sqlite3            # SQLite database (development)
├── requirements.txt      # Python dependencies
├── ERD.png              # Entity Relationship Diagram
├── API_DOCUMENTATION.md # API documentation
├── social_backend/      # Main Django project
│   ├── __init__.py
│   ├── settings.py      # Django settings
│   ├── urls.py         # URL routing
│   ├── wsgi.py         # WSGI configuration
│   └── schema.py       # GraphQL schema
└── apps/               # Django applications
    ├── users/          # User management
    │   ├── models.py   # User model
    │   ├── schema.py   # User GraphQL schema
    │   ├── admin.py    # Admin interface
    │   └── migrations/ # Database migrations
    ├── posts/          # Posts management
    │   ├── models.py   # Post model
    │   ├── schema.py   # Post GraphQL schema
    │   ├── admin.py    # Admin interface
    │   └── migrations/ # Database migrations
    └── interactions/   # Social interactions
        ├── models.py   # Interaction models
        ├── schema.py   # Interaction GraphQL schema
        ├── admin.py    # Admin interface
        └── migrations/ # Database migrations
```

## 📊 Database Design

![Entity Relationship Diagram](ERD.png)

### Core Models

#### **User Model** (`apps/users/models.py`)
- **Purpose**: Manages crafter profiles and authentication
- **Key Fields**:
  - `username` - Unique identifier
  - `email` - Contact and authentication
  - `first_name`, `last_name` - Personal information
  - `bio` - Profile description
  - `avatar` - Profile image
  - `is_instructor` - Workshop instructor flag
  - `specializations` - Craft specialties
  - `location` - Geographic information

#### **Post Model** (`apps/posts/models.py`)
- **Purpose**: Handles craft posts and portfolio content
- **Key Fields**:
  - `author` - Foreign key to User
  - `content` - Post description
  - `image` - Craft image/artwork
  - `category` - Craft category
  - `tags` - Searchable tags
  - `created_at` - Publication timestamp
  - `updated_at` - Last modification

#### **Interaction Model** (`apps/interactions/models.py`)
- **Purpose**: Manages social engagement features
- **Types**:
  - **Like**: User appreciation for posts
  - **Comment**: User comments on posts
  - **Follow**: User-to-user relationships
  - **Share**: Post sharing functionality

### **Database Features**
- **Normalized Design**: Proper foreign key relationships
- **Optimized Indexing**: Fast queries for social features
- **Cascade Policies**: Data integrity maintenance
- **Many-to-Many Relations**: Flexible social connections

## 🛠️ Technology Stack

- **Django 4.2+** - Python web framework
- **GraphQL** - API query language with Graphene-Django
- **SQLite** - Development database (production-ready for PostgreSQL)
- **Django REST Framework** - API utilities and authentication
- **Pillow** - Image processing and handling
- **Django CORS Headers** - Cross-origin resource sharing

## 🔧 API Features

### **GraphQL Schema**
The backend provides a unified GraphQL endpoint at `/graphql/` with:

#### **Queries**
```graphql
# Get all users
users: [UserType]

# Get specific user by ID
user(id: ID!): UserType

# Get all posts
posts: [PostType]

# Get specific post by ID
post(id: ID!): PostType

# Get user's posts
userPosts(userId: ID!): [PostType]

# Get interactions for a post
postInteractions(postId: ID!): [InteractionType]
```

#### **Mutations**
```graphql
# User management
createUser(input: CreateUserInput!): CreateUserMutation
updateUser(input: UpdateUserInput!): UpdateUserMutation

# Post management
createPost(input: CreatePostInput!): CreatePostMutation
updatePost(input: UpdatePostInput!): UpdatePostMutation
deletePost(postId: ID!): DeletePostMutation

# Social interactions
likePost(postId: ID!): LikeMutation
commentOnPost(input: CommentInput!): CommentMutation
followUser(userId: ID!): FollowMutation
```

### **REST Endpoints** (Alternative to GraphQL)
- `GET /api/users/` - List all users
- `POST /api/users/` - Create new user
- `GET /api/posts/` - List all posts
- `POST /api/posts/` - Create new post
- `GET /api/interactions/` - List interactions

## 🔐 Authentication & Security

- **JWT Authentication** - Secure token-based authentication
- **CORS Configuration** - Cross-origin request handling
- **Input Validation** - Data sanitization and validation
- **Permission Classes** - Role-based access control
- **Rate Limiting** - API abuse prevention

## 📚 API Documentation

Comprehensive API documentation is available in [`API_DOCUMENTATION.md`](API_DOCUMENTATION.md), including:
- GraphQL schema details
- Query and mutation examples
- Authentication flow
- Error handling
- Rate limiting policies

## 🔄 Development Workflow

### **Database Migrations**
```bash
# Create migration files
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Show migration status
python manage.py showmigrations
```

### **Admin Interface**
Access the Django admin at `http://localhost:8000/admin/` to:
- Manage users and posts
- View interaction data
- Monitor system activity
- Test data manipulation

### **GraphQL Playground**
Access GraphQL interface at `http://localhost:8000/graphql/` for:
- Schema exploration
- Query testing
- Mutation development
- Real-time API testing

## 🚀 Production Deployment

Your backend is **production-ready**! See the comprehensive **[Deployment Guide](DEPLOYMENT.md)** for step-by-step instructions.

### Quick Deploy Options:

#### 🚂 Railway (Recommended - Free & Easy)
1. Push code to GitHub
2. Connect to [Railway](https://railway.app)
3. Set environment variables
4. Deploy! Your API will be live at `https://your-app.railway.app/graphql`

#### 🌊 Heroku
```bash
heroku create your-socialcrafters-api
heroku addons:create heroku-postgresql:hobby-dev
git push heroku main
```

#### 🐳 Docker (Any Cloud)
```bash
docker build -t socialcrafters-api .
docker run -p 8000:8000 socialcrafters-api
```

**📖 Full deployment instructions**: [DEPLOYMENT.md](DEPLOYMENT.md)

## 🚀 Production Deployment

### **Environment Configuration**
```bash
# Production settings
DEBUG=False
ALLOWED_HOSTS=your-domain.com
DATABASE_URL=postgresql://user:pass@host:port/db
SECRET_KEY=your-secret-key
```

### **Database Migration**
```bash
# PostgreSQL setup
pip install psycopg2-binary
python manage.py migrate
python manage.py collectstatic
```

### **Docker Deployment**
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
```

## 🧪 Testing

```bash
# Run all tests
python manage.py test

# Run specific app tests
python manage.py test apps.users
python manage.py test apps.posts
python manage.py test apps.interactions

# Coverage report
coverage run manage.py test
coverage report
```

## 📊 Monitoring & Analytics

- **Error Logging**: Comprehensive error tracking
- **Performance Metrics**: Query optimization monitoring
- **User Analytics**: Engagement and usage statistics
- **Database Health**: Connection and query performance

## 🔗 Frontend Integration

This backend is designed to seamlessly integrate with the **SocialCrafters React Native frontend**:
- **Unified GraphQL API** for efficient data fetching
- **Real-time capabilities** for social interactions
- **Optimized queries** for mobile performance
- **Type-safe interfaces** for TypeScript frontend

---

**Built with 🐍 Django and ❤️ for the crafting community**

*This backend provides a robust, scalable foundation for the SocialCrafters social media platform, implementing modern API design patterns and industry best practices.*
