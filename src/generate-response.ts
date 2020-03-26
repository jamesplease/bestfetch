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

enum responseType {
  basic = 'basic',
  cors = 'cors',
  error = 'error',
  opaque = 'opaque',
  opaqueredirect = 'opaqueredirect',
}

export interface BestFetchResponse {
  headers: any;
  ok: boolean;
  redirected: boolean;
  status: number;
  statusText: string;
  type: responseType;
  url: string;
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
