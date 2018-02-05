export function successfulResponse() {
  return new Response('hi', {
    status: 200,
    statusText: 'OK'
  });
}

export function jsonResponse() {
  return new Response('{"a": true}', {
    status: 200,
    statusText: 'OK'
  });
}

export function emptyResponse() {
  return new Response('', {
    status: 204,
    statusText: 'OK'
  });
}
