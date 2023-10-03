import { useEffect } from 'react';

import { useRouter } from 'next/router';

export default function Home() {

  const router = useRouter();

  useEffect(() => {
    // Redirect to /home after the component mounts
    router.push('/home');
  }, []);

  return (
    <div className="container">
      Loading...
    </div>
  )
}
