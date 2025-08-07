# Crafters Social Feed - API Documentation

## Overview

This Django GraphQL API powers the Crafters Social Feed mobile application, providing a comprehensive backend for social media functionality tailored specifically for crafters and handmade product sellers.

## Architecture

### Technology Stack
- **Framework**: Django 5.0
- **API**: GraphQL with Graphene
- **Database**: SQLite (development) / PostgreSQL (production)
- **Authentication**: Django built-in with GraphQL integration
- **CORS**: django-cors-headers for frontend integration

### Database Schema

#### User Model (Custom)
- Extends Django's AbstractUser
- Additional fields for crafter profiles:
  - `craft_specialization`: Type of craft (e.g., Pottery, Jewelry)
  - `location`: Geographic location
  - `website`: Personal/business website
  - `is_verified_crafter`: Verification status
  - `avatar`: Profile picture
  - `bio`: User biography

#### Post Model
- **Core Fields**: title, content, author, timestamps
- **Craft-Specific Fields**:
  - `craft_category`: Foreign key to CraftCategory
  - `materials_used`: Materials description
  - `time_to_complete`: Project duration
  - `price_range`: Pricing information
  - `is_for_sale`: Sale availability
  - `is_featured`: Featured status

#### Interaction Models
- **Like**: User-Post relationship for likes
- **Comment**: Threaded comments on posts
- **Share**: Post sharing functionality
- **Follow**: User-User following relationships

## API Endpoints

### GraphQL Schema

#### Queries

```graphql
type Query {
  # User queries
  users: [UserType]
  user(id: ID!): UserType
  me: UserType
  
  # Post queries
  posts: [PostType]
  post(id: ID!): PostType
  postsByUser(userId: ID!): [PostType]
  postsByCategory(categoryId: ID!): [PostType]
  
  # Category queries
  craftCategories: [CraftCategoryType]
}
```

#### Mutations

```graphql
type Mutation {
  # Post mutations
  createPost(input: PostInput!): CreatePost
  updatePost(id: ID!, input: PostInput!): UpdatePost
  deletePost(id: ID!): DeletePost
  
  # Interaction mutations
  likePost(postId: ID!): LikePost
  unlikePost(postId: ID!): UnlikePost
  addComment(postId: ID!, content: String!): AddComment
  sharePost(postId: ID!): SharePost
  
  # Follow mutations
  followUser(userId: ID!): FollowUser
  unfollowUser(userId: ID!): UnfollowUser
}
```

## Security Features

### Authentication
- Django's built-in authentication system
- GraphQL context-based user authentication
- Permission checks on all mutations

### Data Validation
- Model-level validation for all fields
- GraphQL input type validation
- Custom validators for craft-specific fields

### CORS Configuration
- Configured for frontend integration
- Specific origins allowed for security

## Performance Optimizations

### Database Indexing
- Optimized indexes on frequently queried fields
- Composite indexes for common query patterns
- Timestamp-based indexing for chronological queries

### Query Optimization
- Prefetch related objects to prevent N+1 queries
- Optimized GraphQL resolvers
- Efficient database relationships

## Error Handling

### GraphQL Error Responses
- Standardized error messages
- Proper HTTP status codes
- User-friendly error descriptions

### Validation Errors
- Field-specific validation messages
- Model constraint error handling
- Custom validation for business rules

## Testing Strategy

### Model Tests
- Unit tests for all model methods
- Validation testing
- Relationship integrity tests

### API Tests
- GraphQL query and mutation testing
- Authentication flow testing
- Error condition testing

## Deployment Configuration

### Environment Variables
- `SECRET_KEY`: Django secret key
- `DEBUG`: Debug mode toggle
- `ALLOWED_HOSTS`: Allowed hostnames
- Database configuration variables

### Static Files
- Media file handling for avatars
- Static file serving configuration
- Production-ready file storage

## Development Workflow

### Setup Instructions
1. Install dependencies: `pip install -r requirements.txt`
2. Configure environment: Copy `.env.example` to `.env`
3. Run migrations: `python manage.py migrate`
4. Create superuser: `python manage.py createsuperuser`
5. Start server: `python manage.py runserver`

### API Testing
- GraphQL Playground available at `/graphql`
- Admin interface at `/admin`
- Comprehensive test suite

## Best Practices Implemented

### Code Quality
- PEP 8 compliant code formatting
- Comprehensive docstrings
- Type hints where applicable
- Modular app structure

### Security
- CSRF protection
- SQL injection prevention
- XSS protection
- Secure headers configuration

### Scalability
- Efficient database queries
- Proper indexing strategy
- Modular architecture for horizontal scaling
- Caching strategy preparation

## Future Enhancements

### Planned Features
- Real-time notifications with WebSockets
- File upload for craft images
- Search functionality with Elasticsearch
- API rate limiting
- Comprehensive logging system

### Performance Improvements
- Redis caching implementation
- Database query optimization
- CDN integration for media files
- API response caching

## Monitoring & Maintenance

### Health Checks
- Database connectivity checks
- API endpoint monitoring
- Error rate tracking

### Logging
- Structured logging configuration
- Error tracking and reporting
- Performance monitoring setup

---

**API Version**: 1.0  
**Last Updated**: August 2025  
**Maintainer**: Imane Wakrim
