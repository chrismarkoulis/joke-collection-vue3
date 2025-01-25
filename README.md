# Joke Collection App

## 1. How to set up and run the project locally

To run the project locally, follow these steps:

1. **Clone the repository:**

```bash
git clone https://github.com/chrismarkoulis/joke-collection-vue3.git
```

2. **Navigate to the project directory:**

```bash
cd joke-collection-vue3
```

3. **Install dependencies:**
   Ensure that you have Node.js and npm installed. Then, run the following command to install all necessary dependencies:

```bash
npm install
```

4. **Start the development server:**

```bash
npm run dev
```

5. **Run tests:**

```bash
npm test
```

## 2. Libraries & Tools Used in the Project

- **Vue 3**: A progressive JavaScript framework used for building the user interface.
- **Vue Router**: A routing library for Vue.js used to manage page navigation.
- **Tailwind CSS**: A utility-first CSS framework for styling the app's components.
- **Vitest**: A testing framework used for writing unit tests for the app's components and composables.
- **Vite**: A build tool that provides fast development server and bundling for the app.
- **LocalStorage**: Used to persist jokes and their ratings across sessions.

## 3. Joke collection API

The app fetches jokes from the following public API:

- **API**: [Official Joke API](https://official-joke-api.appspot.com)
  - **Endpoint for random jokes**: `/jokes/random`
  - **Endpoint for programming jokes**: `/jokes/programming/random`

## 4. Technical Approach

The app follows a component-driven architecture with the following approach:

1. **Fetching Jokes**: Jokes are fetched using the **Official Joke API**. The two primary endpoints are:
   - **Random Joke**: A random joke can be retrieved using `/jokes/random`.
   - **Programming Joke**: A programming-specific joke can be fetched using `/jokes/programming/random`.
2. **State Management**: The jokes and their ratings are stored in a Vue composable (`useJokeCollection`) that interacts with the browser's `localStorage`. The state is reactive, so the UI automatically updates when a joke is added, removed, or rated.
3. **User Interaction**: Users can rate jokes using a custom star rating component, and jokes can be saved to or removed from a personal joke collection.

## 5. Data Display

The app displays jokes in a user-friendly card format. Each card shows the joke's setup and includes the following features:

- **Reveal Punchline**: A button that reveals the punchline of the joke with a smooth animation (using Vue transitions).
- **Rating Stars**: Users can rate jokes on a scale of 1 to 5 stars. The rating is persisted in the local storage.
