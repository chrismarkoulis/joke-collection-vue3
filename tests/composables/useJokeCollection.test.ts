import { describe, it, expect, beforeEach } from "vitest";
import { useJokeCollection } from "../../src/composables/useJokeCollection";
import { JOKE_COLLECTION_KEY } from "../../src/constants";

describe("useJokeCollection", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should add a joke to the collection", () => {
    const { jokes, addJoke } = useJokeCollection();

    const newJoke = {
      id: 1,
      setup: "Why did the chicken cross the road?",
      punchline: "To get to the other side.",
    };

    addJoke(newJoke);

    expect(jokes.value).toHaveLength(1);
    expect(jokes.value[0].id).toBe(newJoke.id);
    expect(jokes.value[0].rating).toBe(1);
    expect(localStorage.getItem(JOKE_COLLECTION_KEY)).toBeTruthy();
  });

  it("should not add the same joke twice", () => {
    const { jokes, addJoke } = useJokeCollection();

    const joke = {
      id: 1,
      setup: "Why did the chicken cross the road?",
      punchline: "To get to the other side.",
    };

    addJoke(joke);
    addJoke(joke);

    expect(jokes.value).toHaveLength(1);
  });

  it("should remove a joke from the collection", () => {
    const { jokes, removeJoke, addJoke } = useJokeCollection();

    const joke = {
      id: 1,
      setup: "Why did the chicken cross the road?",
      punchline: "To get to the other side.",
    };
    addJoke(joke);
    expect(jokes.value).toHaveLength(1);

    removeJoke(joke.id);
    expect(jokes.value).toHaveLength(0);
  });

  it("should update the rating of a joke", () => {
    const { jokes, rateJoke, addJoke } = useJokeCollection();

    const joke = {
      id: 1,
      setup: "Why did the chicken cross the road?",
      punchline: "To get to the other side.",
    };
    addJoke(joke);

    rateJoke(joke.id, 3);

    expect(jokes.value[0].rating).toBe(3);
    expect(localStorage.getItem(JOKE_COLLECTION_KEY)).toContain("3");
  });
});
