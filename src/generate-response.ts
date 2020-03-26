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

export interface BestFetchResponse
  extends Pick<
    Response,
    'headers' | 'ok' | 'redirected' | 'status' | 'statusText' | 'type' | 'url'
  > {
  data: any;
}

// This is used to "clone" response objects so that different requests
// receive different responses. Note that they are shallowly-cloned, so `data`
// is the same across all requests.
export default function generateResponse(
  res: BestFetchResponse | Response
): BestFetchResponse {
  const response: any = {};

  keysToCopy.map(key => {
    response[key] = (res as any)[key];
  });

  return response as BestFetchResponse;
}
