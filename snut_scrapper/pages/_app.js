import "../styles/globals.css";
import Image from "next/image";
import Link from "next/link";

export default function Home({ Component, pageProps }) {
  return (
    <>
      <nav>
        <Link href="/" className="image-nav">
          <Image src="/logo.png" width={40} height={40}></Image>
        </Link>
        <Link href="/" className="home">
          HOME
        </Link>
        <input placeholder="Search" className="search"></input>
        <button className="register" disabled>
          <Link href="/register">REGISTER</Link>
        </button>
        <button className="login" disabled>
          <Link href="/login">LOGIN</Link>
        </button>
      </nav>

      <Component {...pageProps} />
      <footer>
        <div className="columns">
          <div className="column col-1">
            <Image src="/logo.png" height={100} width={100}></Image>
            <h2 className="footer-title">Dope</h2>
            <br></br>
            <p className="footer-content">
              A social platform for people of NSUT to meet each other online and
              get to know each other more.
              <br></br>
              <br></br>
              Copyright @ 2022 Dope
            </p>
          </div>
          <div className="column">
            <h2>About</h2>
            <br></br>
            <p className="links">
              <Link href="/about">About</Link>
            </p>
          </div>
          <div className="column">
            <h2>Get Started</h2>
            <br></br>

            <p className="links">
              <Link href="/register">Register</Link>
              <br></br>
              <Link href="/login">Login</Link>
            </p>
          </div>
          <div className="column col-4">
            <h2>Legal</h2>
            <br></br>
            <p className="links">
              <Link href="/privacy">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
