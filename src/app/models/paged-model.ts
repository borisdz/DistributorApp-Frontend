export interface PagedModel<T> {
  _embedded: { [collectionName: string]: T[] };
  _links: any;
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
