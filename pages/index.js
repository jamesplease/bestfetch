import Link from 'next/link'

export default function Index() {
  return (
    <div>
      Hello World.{' '}
      <Link href="/about" as={process.env.BACKEND_URL + '/about'}>
        <a>About</a>
      </Link>
    </div>
  );
}
