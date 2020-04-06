const keysToCopy = [
  'headers',
  'ok',
  'redirected',
  'status',
  'statusText',
  'type',
  'url',
  'data',
];

export interface BestFetchResponse<FetchData>
  extends Pick<
    Response,
    'headers' | 'ok' | 'redirected' | 'status' | 'statusText' | 'type' | 'url'
  > {
  data: FetchData | null;
}

// This is used to "clone" response objects so that different requests
// receive different responses. Note that they are shallowly-cloned, so `data`
// is the same across all requests.
export default function generateResponse<FetchData>(
  res: BestFetchResponse<FetchData> | Response
): BestFetchResponse<FetchData> {
  const response: any = {};

  keysToCopy.map(key => {
    response[key] = (res as any)[key];
  });

  return response as BestFetchResponse<FetchData>;
}
