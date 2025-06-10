import type { Pokemon } from "./pokemon";

export type ApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
};
