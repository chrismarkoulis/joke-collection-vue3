// Joke struct
export interface Joke {
  id: number;
  type: string;
  setup: string;
  punchline: string;
}

// Joke rating struct
export type JokeRating = 0 | 1 | 2 | 3 | 4 | 5 | number | undefined;

export interface RatedJoke extends Joke {
  rating?: JokeRating;
}
