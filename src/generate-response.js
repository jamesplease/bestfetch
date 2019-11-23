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

// `res` is a Response object.
// This "clones" it into the response type returned from this lib.
export default function generateResponse(res) {
  const response = {};

  keysToCopy.map(key => {
    response[key] = res[key];
  });

  return response;
}
