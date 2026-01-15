
export type PageMetaDto = {
  page: number;
  take: number;
  totalItemCount: number;
  totalPageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export type PageDto<T> = {
  readonly items: T[];
  readonly meta: PageMetaDto;
}
