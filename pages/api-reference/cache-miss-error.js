import Lowlight from 'react-lowlight';
import Link from '../../components/link';

export default () => {
  return (
    <div className="page">
      <h1>
        <code>CacheMissError</code>
      </h1>
      <p>An Error that represents a cache miss.</p>
      <Lowlight
        language="js"
        inline={false}
        value={`import { CacheMissError } from 'bestfetch';`}
      />
      <h2>Usage</h2>
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
        The error that you are passed will be an instance of{' '}
        <code>CacheMissError</code>. You can use this export to determine if
        this is the cause of the rejection.
      </p>
      <Lowlight
        language="js"
        inline={false}
        value={`bestfetch('https://jsonplaceholder.typicode.com/todos/1', {
  cachePolicy: 'cache-only'
})
  .catch(err => {
    if (typeof err === CacheMissError) {
      console.log('This request did not having a response in the cache.');
    }
  });`}
      />
    </div>
  );
};
