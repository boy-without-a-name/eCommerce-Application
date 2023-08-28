import { ResultInterface } from './result.interfce';

export interface CatalogInterface {
  count?: number;
  limit?: number;
  offset?: number;
  results?: ResultInterface[];
  total?: number;
}
