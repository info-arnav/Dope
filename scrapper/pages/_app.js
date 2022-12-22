import "../styles/globals.css";
import Image from "next/image";
import Link from "next/link";

function MyApp({ Component, pageProps }) {
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
        <div class="columns">
          <div class="column col-1">
            <h2>Dope</h2>
            <br></br>
            <p>
              A social platform for people of NSUT to meet each other online and
              get to know each other more.
              <br></br>
              <br></br>
              Copyright @ 2022 Dope
            </p>
          </div>
          <div class="column">
            <h2>About</h2>
            <br></br>
            <p>
              A social platform for people of NSUT to meet each other online and
              get to know each other more.
            </p>
          </div>
          <div class="column">
            <h2>Get Started</h2>
            <br></br>
            <p>
              A social platform for people of NSUT to meet each other online and
              get to know each other more.
            </p>
          </div>
          <div class="column col-4">
            <h2>Legal</h2>
            <br></br>
            <p>
              A social platform for people of NSUT to meet each other online and
              get to know each other more.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default MyApp;
