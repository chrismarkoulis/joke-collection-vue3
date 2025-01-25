// Joke struct
export interface Joke {
  id: number;
  type: string;
  setup: string;
  punchline: string;
}

// Joke rating struct
export type JokeRating = 1 | 2 | 3 | 4 | 5 | number;

export interface RatedJoke extends Joke {
  rating?: JokeRating;
}
