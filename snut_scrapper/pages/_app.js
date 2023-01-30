import "../styles/globals.css";
import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import * as jose from "jose";
import { Analytics } from "@vercel/analytics/react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, Hits, SearchBox } from "react-instantsearch-dom";
import { useEffect, useState } from "react";
export default function Home({ Component, pageProps }) {
  const [username, setUsername] = useState(null);
  const router = useRouter();
  const [show, setShow] = useState("");
  const verifier = async (userStorage) => {
    try {
      const secret = new TextEncoder().encode(
        "D7AAD3B1A3EDC206FEF25F5DC1578A4A1D347A3A2299FB9E70DECFA68CC692D1"
      );
      const data = await jose.jwtVerify(userStorage, secret);
      if (data.payload.data) {
        setUsername(data.payload.data);
      } else {
        setUsername(false);
        localStorage.removeItem("user");
      }
    } catch {
      setUsername(false);
      localStorage.removeItem("user");
    }
  };
  useEffect(() => {
    let userStorage = localStorage.getItem("user");
    if (userStorage) {
      verifier(userStorage);
    } else {
      setUsername(false);
    }
  }, [username]);
  const algoliaClient = algoliasearch(
    "8PCXEU15SU",
    "7b08d93fde9eb5eebb3d081f764b2ec4"
  );
  const searchClient = {
    ...algoliaClient,
    search(requests) {
      if (requests.every(({ params }) => !params.query)) {
        return Promise.resolve({
          results: requests.map(() => ({
            hits: [],
            nbHits: 0,
            nbPages: 0,
            page: 0,
            processingTimeMS: 0,
            hitsPerPage: 0,
            exhaustiveNbHits: false,
            query: "",
            params: "",
          })),
        });
      }

      return algoliaClient.search(requests);
    },
  };
  const Hit = (e) => {
    return (
      <div
        className="card"
        onClick={() => {
          window.location.replace(`/profile/${e.hit.objectID}`);
        }}
      >
        <center>
          <Image width={100} height={100} src="/profile.webp"></Image>
          <div className="name">
            {e.hit.name.toUpperCase() || "Not Provided"}
          </div>
          <div className="email">{e.hit.roll_no}</div>
          <hr></hr>
        </center>
        <b>
          <div className="title">
            {!e.hit.instagram_id ? "Prediction" : "Instrgram ID"}
          </div>
        </b>
        {!e.hit.instagram_id ? (
          e.hit.insta_predicted.split("*")[0] ? (
            <div className="instagram_id">
              {e.hit.insta_predicted.split("*")[0].split("$")[0]}
            </div>
          ) : (
            <div class="instagram_id" disabled>
              No Prediction
            </div>
          )
        ) : (
          <div className="instagram_id">{e.hit.instagram_id}</div>
        )}
        {!e.hit.instagram_id ? (
          e.hit.insta_predicted.split("*")[0] ? (
            <div className="instagram_name">
              {e.hit.insta_predicted.split("*")[0].split("$")[1]}
            </div>
          ) : (
            <div className="instagram_name"></div>
          )
        ) : (
          <div className="instagram_name"></div>
        )}
      </div>
    );
  };
  return (
    <>
      <Analytics />
      <InstantSearch searchClient={searchClient} indexName="dev_NSUT">
        <nav>
          <Link
            href="/"
            className="image-nav"
            onClick={() => {
              setShow("");
            }}
          >
            <Image
              src="/logo.png"
              width={40}
              height={40}
              alt="Logo of Dope"
            ></Image>
          </Link>
          <Link
            href="/"
            className="home"
            onClick={() => {
              setShow("");
            }}
          >
            {username == null
              ? "     "
              : username == false
              ? "HOME"
              : "PROFILE"}
          </Link>

          <SearchBox
            onChange={(e) => {
              setShow(e.target.value);
              window.scrollTo(0, 0);
            }}
            showLoadingIndicator={false}
          />

          {username == null ? (
            <a disabled className="nav-image-right extra">
              <Image
                src="/white.jpg"
                width={35}
                height={35}
                alt="white image"
              ></Image>
            </a>
          ) : username == false ? (
            <Link
              href="/register"
              className="nav-image-right extra"
              onClick={() => {
                setShow("");
              }}
            >
              <Image
                src="/register.png"
                width={35}
                height={35}
                alt="Register icon"
              ></Image>
            </Link>
          ) : (
            <>
              <Link
                href="/find"
                className="nav-image-right extra"
                onClick={() => {
                  setShow("");
                }}
              >
                <Image
                  src="/discover.png"
                  width={35}
                  height={35}
                  alt="discover icon"
                ></Image>
              </Link>
            </>
          )}
          {username == null ? (
            <a disabled className="nav-image-right">
              <Image
                src="/white.jpg"
                width={35}
                height={35}
                alt="white image"
              ></Image>
            </a>
          ) : username == false ? (
            <Link
              href="/login"
              className="nav-image-right"
              onClick={() => {
                setShow("");
              }}
            >
              {" "}
              <Image
                src="/login.png"
                width={35}
                height={35}
                alt="login icon"
              ></Image>
            </Link>
          ) : (
            <Link
              href="/updates"
              className="nav-image-right"
              onClick={() => {
                setShow("");
              }}
            >
              <Image
                src="/chat.png"
                width={35}
                height={35}
                alt="update icon"
              ></Image>
            </Link>
          )}
        </nav>
        {show.length > 0 && (
          <main>
            <Hits hitComponent={Hit} />
          </main>
        )}
      </InstantSearch>
      {
        <main>
          {show.length <= 0 && (
            <Component
              username_given={username}
              {...pageProps}
              onClick={() => {
                setShow("");
              }}
            />
          )}
        </main>
      }
      <footer>
        <div className="columns">
          <div className="column col-1">
            <Image
              src="/logo.png"
              height={100}
              width={100}
              alt="logo of dope"
            ></Image>
            <h2 className="footer-title">Dope</h2>
            <br></br>
            <p className="footer-content">
              Dope assists NSUT students in making the transition to college,
              which is a major adjustment in their lives.
              <br></br>
              <br></br>
              Copyright @ 2022 Dope
            </p>
          </div>
          <div className="column">
            <h2>About</h2>
            <br></br>
            <p className="links">
              <Link
                onClick={() => {
                  setShow("");
                }}
                href="/about"
              >
                About
              </Link>
            </p>
          </div>
          <div className="column">
            <h2>Get Started</h2>
            <br></br>

            <p className="links">
              <Link
                onClick={() => {
                  setShow("");
                }}
                href="/register"
              >
                Register
              </Link>
              <br></br>
              <Link
                onClick={() => {
                  setShow("");
                }}
                href="/login"
              >
                Login
              </Link>
              <br></br>
              <Link
                onClick={() => {
                  setShow("");
                }}
                href="/find"
              >
                Discover
              </Link>
              <br></br>
              <Link
                onClick={() => {
                  setShow("");
                }}
                href="/updates"
              >
                Society Updates
              </Link>
              <br></br>
              <Link
                onClick={() => {
                  setShow("");
                }}
                href="/anonymous"
              >
                Anonymous
              </Link>
            </p>
          </div>
          <div className="column col-4">
            <h2>Legal</h2>
            <br></br>
            <p className="links">
              <Link
                onClick={() => {
                  setShow("");
                }}
                href="/privacy"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
