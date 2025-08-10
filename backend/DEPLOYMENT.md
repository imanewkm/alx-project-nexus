# SocialCrafters API Deployment Guide

## 🚀 Deployment Options

### Option 1: Railway (Recommended - Easy & Free)

**Railway** is perfect for Django deployment with automatic database provisioning.

#### Step 1: Prepare for Deployment
```bash
cd backend

# Install additional production dependencies
pip install dj-database-url whitenoise
pip freeze > requirements.txt
```

#### Step 2: Create Railway Configuration
```bash
# Create Procfile for Railway
echo "web: gunicorn social_backend.wsgi --bind 0.0.0.0:\$PORT" > Procfile

# Create railway.json for configuration
cat > railway.json << EOF
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
EOF
```

#### Step 3: Deploy to Railway
1. Visit [railway.app](https://railway.app) and sign up
2. Connect your GitHub repository
3. Select the backend folder
4. Add environment variables:
   ```
   SECRET_KEY=your-super-secret-key-here
   DEBUG=False
   ALLOWED_HOSTS=*.railway.app,your-custom-domain.com
   DB_NAME=railway-provided-db-name
   DB_USER=railway-provided-user
   DB_PASSWORD=railway-provided-password
   DB_HOST=railway-provided-host
   DB_PORT=5432
   ```
5. Deploy! 🚀

**Your API will be available at**: `https://your-app-name.railway.app/graphql`

---

### Option 2: Heroku (Classic Choice)

#### Step 1: Install Heroku CLI
```bash
# Download from https://devcenter.heroku.com/articles/heroku-cli
heroku login
```

#### Step 2: Prepare Django for Heroku
```bash
cd backend

# Install Heroku-specific packages
pip install dj-database-url whitenoise gunicorn
pip freeze > requirements.txt

# Create Procfile
echo "web: gunicorn social_backend.wsgi" > Procfile

# Create runtime.txt
echo "python-3.11.7" > runtime.txt
```

#### Step 3: Deploy
```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit"

# Create Heroku app
heroku create your-socialcrafters-api

# Add PostgreSQL database
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set SECRET_KEY=your-secret-key
heroku config:set DEBUG=False

# Deploy
git push heroku main

# Run migrations
heroku run python manage.py migrate
heroku run python manage.py createsuperuser
```

**Your API will be available at**: `https://your-socialcrafters-api.herokuapp.com/graphql`

---

### Option 3: DigitalOcean App Platform

#### Step 1: Prepare App Spec
Create `.do/app.yaml`:
```yaml
name: socialcrafters-api
services:
- name: api
  source_dir: /backend
  github:
    repo: your-username/alx-project-nexus
    branch: main
  run_command: gunicorn social_backend.wsgi
  environment_slug: python
  instance_count: 1
  instance_size_slug: basic-xxs
  env:
  - key: SECRET_KEY
    value: your-secret-key
  - key: DEBUG
    value: "False"
databases:
- name: socialcrafters-db
  engine: PG
  num_nodes: 1
  size: db-s-dev-database
```

#### Step 2: Deploy
1. Push code to GitHub
2. Visit [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)
3. Connect GitHub repository
4. Configure with the app spec above
5. Deploy!

---

### Option 4: Docker + Any Cloud Provider

#### Step 1: Create Dockerfile
```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . .

# Collect static files
RUN python manage.py collectstatic --noinput

EXPOSE 8000

CMD ["gunicorn", "social_backend.wsgi:application", "--bind", "0.0.0.0:8000"]
```

#### Step 2: Create docker-compose.yml
```yaml
version: '3.8'
services:
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: socialcrafters
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  web:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DEBUG=False
      - DB_NAME=socialcrafters
      - DB_USER=postgres
      - DB_PASSWORD=password
      - DB_HOST=db
      - DB_PORT=5432
    depends_on:
      - db

volumes:
  postgres_data:
```

---

## 🌐 Making Your API Public

### 1. CORS Configuration
Your API is already configured with CORS headers for cross-origin requests.

### 2. API Documentation
Your GraphQL API provides:
- **GraphQL Playground**: `https://your-domain.com/graphql` (interactive query interface)
- **Schema Introspection**: Automatic API documentation
- **Type-safe queries**: Client code generation support

### 3. Authentication
The API supports:
- JWT token authentication
- User registration and login
- Protected endpoints for authenticated users

### 4. Rate Limiting (Recommended Addition)
Add rate limiting for production:
```python
# In requirements.txt
django-ratelimit==4.1.0

# In settings.py
INSTALLED_APPS += ['django_ratelimit']

# In your GraphQL resolvers
from django_ratelimit.decorators import ratelimit

@ratelimit(key='ip', rate='100/h', method='POST')
def resolve_posts(self, info):
    # Your resolver logic
```

## 📊 API Endpoints

### GraphQL Endpoint
- **URL**: `https://your-domain.com/graphql`
- **Method**: POST
- **Content-Type**: application/json

### Sample Queries
```graphql
# Get all posts
query {
  posts {
    id
    content
    author {
      username
      firstName
    }
    createdAt
  }
}

# Create a new post
mutation {
  createPost(input: {
    content: "Check out my latest pottery work!"
    image: "https://example.com/image.jpg"
  }) {
    post {
      id
      content
    }
  }
}
```

## 🔒 Security Checklist

- ✅ **Secret Key**: Use strong, unique secret key
- ✅ **Debug Mode**: Set DEBUG=False in production
- ✅ **Allowed Hosts**: Configure proper domain restrictions
- ✅ **Database**: Use PostgreSQL in production
- ✅ **HTTPS**: Enable SSL/TLS encryption
- ✅ **CORS**: Configure allowed origins
- ✅ **Rate Limiting**: Implement API rate limits

## 📈 Monitoring & Analytics

### Add Monitoring (Optional)
```python
# Install Sentry for error tracking
pip install sentry-sdk[django]

# In settings.py
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

sentry_sdk.init(
    dsn="YOUR_SENTRY_DSN",
    integrations=[DjangoIntegration()],
    traces_sample_rate=1.0,
)
```

## 🎯 API Usage Examples

### Frontend Integration
```typescript
// Apollo Client setup for React Native
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'https://your-socialcrafters-api.herokuapp.com/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
```

### cURL Examples
```bash
# Get posts
curl -X POST https://your-domain.com/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ posts { id content author { username } } }"}'

# Create user
curl -X POST https://your-domain.com/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation { createUser(input: { username: \"artist1\", email: \"artist@example.com\" }) { user { id username } } }"
  }'
```

---

## 🏆 Your API is Ready!

Once deployed, your SocialCrafters API will be publicly accessible and ready to power:
- ✅ Mobile apps (React Native, Flutter, Swift, Kotlin)
- ✅ Web applications (React, Vue, Angular)
- ✅ Desktop applications (Electron, Tauri)
- ✅ Third-party integrations
- ✅ Webhook consumers

**Congratulations!** You now have a production-ready, publicly accessible API! 🎉
