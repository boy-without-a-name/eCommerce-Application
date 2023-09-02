import { CardFilterInterface } from "./results.filter.intreface";

export interface AnswerFilterInterface {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: CardFilterInterface[];
  facets: {q?: string};
}
