import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "../components/head";

export default function Anonymous() {
  const router = useRouter();
  const reload = () => {
    router.push(window.location.pathname);
  };
  const [query, setQuery] = useState("");
  const [disabled, setDisabled] = useState(false);
  const add = (e) => {
    e.preventDefault();
    setDisabled(true);
    fetch(
      Capacitor.isNativePlatform()
        ? "https://www.itsdope.in/api/query"
        : "/api/query",
      {
        method: "POST",

        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({
          query: query,
        }),
      }
    ).then((e) => reload());
  };
  const { pid } = router.query;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetcher = async () => {
      fetch(
        Capacitor.isNativePlatform()
          ? "https://www.itsdope.in/api/query-get"
          : "/api/query-get",
        {
          method: "GET",

          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
        }
      )
        .then((e) => e.json())
        .then((e) => {
          setData(e.reverse());
          setLoading(false);
        });
    };
    fetcher();
  }, []);
  return (
    <div>
      <Head
        title={`Dope - Anonymous`}
        description={`Overthinker ? Just post whatever you want completely anonymously here.`}
        keword={`, anonymous`}
        url={`anonymous`}
        image={"/logo.png"}
      ></Head>
      {loading ? (
        <div className="empty">
          <Image src="/loading.gif" width={300} height={300}></Image>
        </div>
      ) : (
        <center>
          <form onSubmit={add} style={{ marginTop: 80 }}>
            <input
              style={{
                borderRadius: "20px",
                width: "calc(98% - 40px)",
                fontWeight: "bold",
                border: "solid black",
                margin: 10,
                padding: 10,
              }}
              placeholder="Your Thoughts"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            ></input>
            <br></br>
            <button
              className="width-anonymous"
              style={{
                borderRadius: "20px",
                fontWeight: "bold",
                color: "white",
                backgroundColor: "black",
                marginLeft: 10,
                marginRight: 10,
                padding: 15,
              }}
              disabled={disabled}
            >
              {disabled ? "Loading...." : "Append"}
            </button>
          </form>
          <br></br>
          <b>
            <p style={{ fontSize: 18 }}>Posts</p>
          </b>

          {data.map((e) => (
            <div
              className="queries"
              style={{
                borderRadius: "20px",
                width: "calc(98% - 40px)",
                border: "solid black",
                margin: 10,
                marginBottom: 15,
                padding: 5,
                paddingTop: 10,
                paddingBottom: 10,
              }}
            >
              <div>{e.query}</div>
            </div>
          ))}
          <br></br>
          <br></br>
        </center>
      )}
    </div>
  );
}
