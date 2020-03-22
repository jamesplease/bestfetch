export default function FAQ() {
  return (
    <div className="page">
      <h1>FAQ</h1>
      <h2>
        Sometimes <code>res.data</code> set to <code>null</code>, why is that?
      </h2>
      <p>
        If the response cannot be parsed as the <code>responseType</code>, then{' '}
        <code>res.data</code> will be <code>null</code>.
      </p>
      <p>There are two common situations for this:</p>
      <ul>
        <li>
          The response body is an empty string when you specify{' '}
          <code>responseType: 'json'</code>. Empty strings are not valid JSON.
        </li>
        <li>
          The response body is an invalid JSON string when you specify{' '}
          <code>responseType: 'json'</code> For example, some APIs will return
          plain text messages in the response body when there are errors, like
          the word "Error", rather than valid JSON.
        </li>
      </ul>
      <p>
        To resolve this, you can use the <code>responseType</code> option to
        have greater control over the parsing of the response body from the
        server.
      </p>

      <h2>
        Why is <code>responseType</code> even an option?
      </h2>
      <p>
        This option exists because of the inner workings of the{' '}
        <code>fetch</code> API.
      </p>
      <p>
        The argument that is passed to the <code>.then()</code> callback of a{' '}
        <code>fetch()</code> call is a{' '}
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/Response">
          Response object
        </a>
        . The body of a Response object can only be read a single time, because
        it is a{' '}
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream">
          ReadableStream
        </a>
        .
      </p>
      <p>
        For bestfetch to reuse a response, it must pass the result of a single
        request to many "consumers," which are each of the individual calls to
        bestfetch.
      </p>
      <p>
        If more than one "consumer" tried to read the body, then an error would
        be thrown. To get around this problem, bestfetch reads the body for you
        – one time – and passes that result to each consumer.
      </p>

      <h2>Is the data duplicated?</h2>
      <p>
        Although you receive a new <code>Response</code> object with every call
        to <code>bestfetch</code>, the body will be read, so the response's body
        stream will be empty. In addition, the `data` property between every{' '}
        <code>response</code> is shared. Accordingly, the data returned by the
        server is never duplicated.
      </p>
      <p>
        This is an optimization that allows <code>bestfetch</code> to be used in
        applications that fetch large payloads.
      </p>
    </div>
  );
}
