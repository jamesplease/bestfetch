import Lowlight from 'react-lowlight';
import Link from '../../components/link';

export default () => {
  return (
    <div className="page">
      <h1>
        <code>CacheMissError</code>
      </h1>
      <p>
        An{' '}
        <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error">
          Error
        </a>{' '}
        that represents a cache miss.
      </p>
      <Lowlight
        language="js"
        inline={false}
        value={`import { CacheMissError } from 'bestfetch';`}
      />
      <p>
        One of the options that you can pass to{' '}
        <Link href="/api-reference/bestfetch">
          <a>
            <code>bestfetch</code>
          </a>
        </Link>{' '}
        is <code>cachePolicy</code>. If you specify your policy to be{' '}
        <code>"cache-only"</code> and no response exists in the cache, then the
        Promise will reject.
      </p>
      <p>
        The error that is passed to the <code>.catch()</code> callback will be
        an instance of <code>CacheMissError</code>.
      </p>
      <h2>Example Usage</h2>
      <p>
        You can use the <code>CacheMissError</code> to determine if a cache miss
        is the cause of the Promise's rejection.
      </p>
      <div className="advanced">
        <span className="emoji">💁‍♀️</span> <b>Heads up!</b> You can copy and
        paste the following code snippet into your browser's developer tools to
        try it out!
      </div>
      <Lowlight
        language="js"
        inline={false}
        value={`bestfetch('https://jsonplaceholder.typicode.com/todos/1', {
  cachePolicy: 'cache-only'
})
  .catch(err => {
    if (err instanceof CacheMissError) {
      console.log('This request did not have a response in the cache.');
    }
  });`}
      />
    </div>
  );
};
