# Crafters Social Feed – MVP

A minimalist **mobile social media app** designed specifically for **crafters and handmade product sellers**. It enables users to connect, engage, and market their work in real time through a dynamic and interactive feed.

This MVP includes a complete **frontend in React Native** and a **backend in Django with GraphQL**, following real-world practices for scalable, modern application development.

## Features

### Frontend (Mobile App)
- Dynamic post loading using GraphQL
- Like, comment, and share posts
- Infinite scrolling with smooth transitions
- Responsive and user-friendly UI (React Native + TypeScript)

### Backend (API)
- GraphQL API with queries & mutations for posts and interactions
- PostgreSQL for relational data storage
- Models for posts, comments, likes, and shares
- GraphQL Playground for API testing and debugging

## Project Goals

### Frontend
- Build a responsive mobile feed UI
- Integrate Apollo Client for GraphQL API interaction
- Enable post engagement features (like, comment, share)
- Implement infinite scrolling and transitions

### Backend
- Create scalable GraphQL APIs with Django + Graphene
- Design an optimized schema for posts and user interactions
- Support efficient querying and pagination
- Provide a hosted GraphQL Playground for testing

## Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Frontend    | React Native (Expo), TypeScript     |
| State Mgmt  | Apollo Client (GraphQL)             |
| Navigation  | React Navigation                    |
| Backend     | Django, Graphene (GraphQL)          |
| Database    | PostgreSQL                          |
| API Testing | GraphQL Playground                  |

## Setup Instructions

### Backend

1. **Navigate to the backend folder:**
    ```bash
    cd backend
    ```

2. **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

3. **Set up PostgreSQL:**
    Update `DATABASES` in `settings.py` with your credentials.

4. **Run migrations:**
    ```bash
    python manage.py migrate
    ```

5. **Start the server:**
    ```bash
    python manage.py runserver
    ```

6. **Access GraphQL Playground:**
    ```
    http://localhost:8000/graphql/
    ```

### Frontend

1. **Navigate to the frontend folder:**
    ```bash
    cd frontend
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Update GraphQL endpoint in Apollo Client setup.**

4. **Start the app with Expo:**
    ```bash
    npx expo start
    ```

## Project Structure

```
crafters-social-feed/
├── frontend/             # React Native App
│   ├── components/
│   ├── screens/
│   ├── graphql/
│   └── App.tsx
└── backend/              # Django + GraphQL API
     ├── social/
     │   ├── models.py
     │   ├── schema.py
     └── manage.py
```

## Sample GraphQL Queries

### Fetch Posts

```graphql
query {
  allPosts {
     id
     title
     content
     image
     author {
        username
     }
     likesCount
     comments {
        content
        user {
          username
        }
     }
  }
}
```

### Like a Post

```graphql
mutation {
  likePost(postId: 1) {
     success
     post {
        id
        likesCount
     }
  }
}
```

## Git Commit Workflow

| Type    | Example                                           |
| ------- | ------------------------------------------------- |
| Feature | `feat: implement like and comment mutations`      |
| Style   | `style: add animations for post card`             |
| Fix     | `fix: resolve pagination bug in feed`             |
| Docs    | `docs: update README with setup steps`            |
| Perf    | `perf: optimize DB queries with prefetch_related` |

## MVP Progress

### Frontend Tasks

* [x] Initialize React Native project
* [x] Add Apollo Client & configure GraphQL
* [x] Design post card and feed components
* [x] Implement like, comment, share
* [x] Add infinite scroll
* [x] Style with animations and loading indicators

### Backend Tasks

* [x] Set up Django project with PostgreSQL
* [x] Define models (Post, Comment, Like, Share)
* [x] Create GraphQL types, queries, and mutations
* [x] Optimize DB access with pagination
* [x] Publish GraphQL Playground

## Future Enhancements

* User authentication with JWT or Firebase
* Profiles and dashboards
* Craft category filters
* Saved/bookmarked posts
* Admin moderation panel
* Real-time notifications

## Inspiration

This MVP follows the **ProDev Real-World Case Study** on building scalable social feeds using modern frameworks and GraphQL APIs. Tailored for niche communities like **makers, crafters, and artists** to share their creativity.

## License

MIT License – free to use, fork, and build upon.

## Made For

> **Crafters. Creators. Makers. Artists.**
> By makers, for makers.
