import Link from 'next/link';

import ExampleComponent from '@components/ExampleComponent'; //Make sure to import any components you need

export default function ProfilePage() {
  return (
    <div className="container">
        <p>
            This is an example of making a new webpage. You just need to make a new .js file in the /pages directory, and then copy the code from this page.
        </p>
        <p>
            The URL will be [websitename]/[filename], where websitename is the name of the website (316-project.netlify.app or localhost:3000), and filename is the name of the file (in this case, its called example.js).
        </p>
        <p>
            Look at the URL for this page for reference.
        </p>

        <ExampleComponent />
        {/* You can use the component like an HTML tag, or in the form shown above */}
        
        <Link href="/">
        <a>[Return home]</a>
        </Link>

    </div>
  )
}