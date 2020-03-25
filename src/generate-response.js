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

// This is used to "clone" response objects so that different requests
// receive different responses. Note that they are shallowly-cloned, so `data`
// is the same across all requests.
export default function generateResponse(res) {
  const response = {};

  keysToCopy.map(key => {
    response[key] = res[key];
  });

  return response;
}
