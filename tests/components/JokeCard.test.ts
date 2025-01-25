import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import { JokeCard } from "../../src/components/";
import { Button } from "../../src/components/";
import { RatingStars } from "../../src/components/";
import { useJokeCollection } from "../../src/composables/useJokeCollection";
import { ref } from "vue";
import type { Joke } from "../../src/models";

const mockJokes = ref<Joke[]>([]);
const mockAddJoke = vi.fn((joke) => mockJokes.value.push(joke));
const mockRemoveJoke = vi.fn((id) => {
  mockJokes.value = mockJokes.value.filter((j) => j.id !== id);
});
const mockRateJoke = vi.fn();

//-- Mock Joke Collection composable
vi.mock("../../src/composables/useJokeCollection", () => ({
  useJokeCollection: vi.fn(() => ({
    jokes: mockJokes,
    addJoke: mockAddJoke,
    removeJoke: mockRemoveJoke,
    rateJoke: mockRateJoke,
  })),
}));

describe("JokeCard.vue", () => {
  const mockJoke = {
    id: 1,
    setup: "Why don't programmers like nature?",
    punchline: "Because it has too many bugs!",
  };

  it("renders correctly with a joke", () => {
    const wrapper = mount(JokeCard, { props: { joke: mockJoke } });

    expect(wrapper.text()).toContain(mockJoke.setup);
    expect(wrapper.text()).not.toContain(mockJoke.punchline);
  });

  it("reveals punchline when 'Reveal Punchline' button is clicked", async () => {
    const wrapper = mount(JokeCard, { props: { joke: mockJoke } });

    const button = wrapper.findComponent(Button);
    await button.trigger("click");

    expect(wrapper.text()).toContain(mockJoke.punchline);
  });

  it("removes the joke from collection when clicking 'Remove from Collection'", async () => {
    const { jokes, removeJoke } = useJokeCollection();
    jokes.value = [{ ...mockJoke, rating: 1 }];

    const wrapper = mount(JokeCard, { props: { joke: mockJoke } });
    const removeButton = wrapper.findAllComponents(Button).at(1);

    await removeButton?.trigger("click");

    expect(removeJoke).toHaveBeenCalledWith(mockJoke.id);
  });

  it("updates rating when changed", async () => {
    const { jokes, rateJoke } = useJokeCollection();
    jokes.value = [{ ...mockJoke, rating: 3 }];

    const wrapper = mount(JokeCard, { props: { joke: mockJoke } });
    const ratingStars = wrapper.findComponent(RatingStars);

    await ratingStars.setValue(5);

    expect(rateJoke).toHaveBeenCalledWith(mockJoke.id, 5);
  });
});
