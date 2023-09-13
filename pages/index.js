import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <p>
        Welcome! If your reading this, then our movie website is online!
      </p>
      <Link href="https://docs.google.com/document/d/18uxQ_v0aOvuiRRGqAzs10IgaSLn_MW_9hFxmBM6KpC4/edit?usp=sharing">
        <a target='_blank'>Click here to open the planning doc (it also has a quickstart guide)</a>
      </Link>

      <p>
      <Link href="/example">
        <a>[Go to example webpage]</a>
        </Link>
      </p>
    </div>
  )
}
