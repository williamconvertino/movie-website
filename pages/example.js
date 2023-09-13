import Link from 'next/link';

export default function ExamplePage() {
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

        <Link href="/">
        <a>[Return home]</a>
        </Link>

    </div>
  )
}
