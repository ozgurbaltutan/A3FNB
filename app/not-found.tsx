import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page" id="main-content">
      <div className="not-found-page__inner">
        <Image
          alt="A3 Food & Beverage"
          className="not-found-page__logo"
          height={74}
          priority
          src="/brand/a3logo_full.svg"
          width={230}
        />
        <p className="not-found-page__code">404</p>
        <h1>Page not found</h1>
        <p>The page may have moved or the address may be incorrect.</p>
        <Link className="a3-button a3-button--primary" href="/en">
          Return to homepage
        </Link>
      </div>
    </main>
  );
}
