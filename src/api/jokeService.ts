import { API_URL } from "@/constants";
import type { Joke } from "@/models";

export async function fetchRandomJoke(): Promise<Joke | null> {
  try {
    const response = await fetch(`${API_URL}/random_joke`);
    if (!response.ok) throw new Error("Failed to fetch joke");
    return await response.json();
  } catch (error) {
    console.error("Error fetching joke:", error);
    return null;
  }
}

export async function fetchProgrammingJoke(): Promise<Joke | null> {
  try {
    const response = await fetch(`${API_URL}/jokes/programming/random`);
    if (!response.ok) throw new Error("Failed to fetch programming joke");
    const jokes = await response.json();
    return jokes.length ? jokes[0] : null;
  } catch (error) {
    console.error("Error fetching programming joke:", error);
    return null;
  }
}

export async function fetchMultipleJokes(count: number = 5): Promise<Joke[]> {
  try {
    const responses = await Promise.all(
      Array.from({ length: count }, () =>
        fetch(`${API_URL}/random_joke`).then((res) => res.json()),
      ),
    );
    return responses.filter((joke): joke is Joke => joke !== null);
  } catch (error) {
    console.error("Failed to fetch jokes:", error);
    return [];
  }
}
