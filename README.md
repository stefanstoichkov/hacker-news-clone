# Hacker News Vue 3 Application

## Overview

This is a Hacker News clone Vue 3 application.

---

## Project Structure

### Components

1. **`Home.vue`**: Displays a list of posts with pagination and integrates search functionality.
2. **`PostDetails.vue`**: Shows detailed information about a selected post along with its comments.
3. **`Comment.vue`**: A recursive component for rendering nested comments.
4. **`Navbar.vue`**: Contains the navigation bar with a search input and offline notification.

### Utilities

- **Router (`index.ts`)**: Manages application routing.

---

#### Routes

- **`/Home`**: The home page showing a list of posts.
- **`/Post/:id`**: The detailed view for a selected post.

---

## Key Dependencies

- **Vue 3**: Core framework for building the application.
- **Vuetify**: UI framework for material design components.
- **Vue Router**: For navigating between views.
- **Axios**: For making HTTP requests to the Hacker News Algolia API.
- **Lodash.debounce**: For optimizing search input.

---

## Styling

- Vuetify's material design components.
- Custom CSS.

---

## Future Improvements and Features

#### 1. Content Loader

#### 2. Offline Availability

#### 3. Refactor API Calls into a Service

---

## Setup

To run the project locally:

1. Clone the repository:
    ```
    git clone https://github.com/stefanstoichkov/hacker-news-clone.git 
    cd hackernews-clone
    ```
2. Install dependencies:
    ```
    npm install
    ```
3. Run the development server:
    ```
    npm run dev
    ```

The app should be available at `localhost:5173`