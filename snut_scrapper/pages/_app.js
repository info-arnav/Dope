import "../styles/globals.css";
import Image from "next/image";
import Link from "next/link";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, Hits, SearchBox } from "react-instantsearch-dom";
import { useEffect, useState } from "react";
export default function Home({ Component, pageProps }) {
  const [show, setShow] = useState("");
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setShow("");
    setLoaded(true);
  }, []);
  const searchClient = algoliasearch(
    "LO5V83KRK7",
    "97fbfd0f84701d77ad4589c5bf53adbc"
  );
  const Hit = (e) => {
    return (
      <div style={{ marginBottom: 80 }}>
        <p>{e.hit.name}</p>
        <p>{e.hit.roll_no}</p>
        <p>{e.hit.email}@nsut.ac.in</p>
        <>
          <h2>Predicted</h2>
          {e.hit.insta_predicted.split("*").map((e) => {
            let array = e.split("$");
            return (
              <p>
                {array[0]} {array[1]}
              </p>
            );
          })}
        </>
        <>
          <h2>Possibilities</h2>
          {e.hit.insta_posibilities.split("*").map((e) => {
            let array = e.split("$");
            return (
              <p>
                {array[0]} {array[1]}
              </p>
            );
          })}
        </>
      </div>
    );
  };
  return (
    <>
      <InstantSearch searchClient={searchClient} indexName="dev_NSUT">
        <nav>
          <Link href="/" className="image-nav">
            <Image
              src="/logo.png"
              width={40}
              height={40}
              alt="Logo of Dope"
            ></Image>
          </Link>
          <Link href="/" className="home">
            HOME
          </Link>
          {loaded ? (
            <SearchBox
              onChange={(e) => {
                setShow(e.target.value);
              }}
              showLoadingIndicator={false}
            />
          ) : (
            <input placeholder="Search" disabled></input>
          )}
          <button className="register" disabled>
            <Link href="/register">REGISTER</Link>
          </button>
          <button className="login" disabled>
            <Link href="/login">LOGIN</Link>
          </button>
        </nav>
        <main>
          {show.length > 0 ? (
            <Hits hitComponent={Hit} />
          ) : (
            <Component {...pageProps} />
          )}
        </main>
        <footer>
          <div className="columns">
            <div className="column col-1">
              <Image src="/logo.png" height={100} width={100}></Image>
              <h2 className="footer-title">Dope</h2>
              <br></br>
              <p className="footer-content">
                A social platform for people of NSUT to meet each other online
                and get to know each other more.
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
      </InstantSearch>
    </>
  );
}
