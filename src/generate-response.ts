const keysToCopy = [
  'headers',
  'ok',
  'redirected',
  'status',
  'statusText',
  'trailers',
  'type',
  'url',
  'useFinalURL',
  'data',
];

enum responseType {
  basic,
  cors,
  error,
  opaque,
  opaqueredirect,
}

export interface Response {
  headers: any;
  ok: boolean;
  redirected: boolean;
  status: number;
  statusText: string;
  trailers: any;
  type: responseType;
  url: string;
  useFinalURL: boolean;
  data: any;
}

// This is used to "clone" response objects so that different requests
// receive different responses. Note that they are shallowly-cloned, so `data`
// is the same across all requests.
export default function generateResponse(res: Response): Response {
  const response: any = {};

  keysToCopy.map(key => {
    response[key] = res[key];
  });

  return response as Response;
}
