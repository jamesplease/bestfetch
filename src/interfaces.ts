export interface ResponseWithData<FetchData> extends Response {
  data?: FetchData | null;
}
