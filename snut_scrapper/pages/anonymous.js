import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Head from "../components/head";
import clientPromise from "../middleware/mongodb";

export default function Anonymous(props) {
  const router = useRouter();
  const reload = () => {
    router.reload(window.location.pathname);
  };
  const [query, setQuery] = useState("");
  const [disabled, setDisabled] = useState(false);
  const add = (e) => {
    e.preventDefault();
    setDisabled(true);
    axios.post("/api/query", { query: query }).then((e) => reload());
  };
  return (
    <div>
      <Head
        title={`Dope - Anonymous`}
        description={`Overthinker ? Just post whatever you want completely anonymously here.`}
        keword={`, anonymous`}
        url={`anonymous`}
        image={"https://www.itsdope.in/logo.png"}
      ></Head>
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
            Append
          </button>
        </form>
        <br></br>
        <b>
          <p style={{ fontSize: 18 }}>Posts</p>
        </b>

        {props.data.map((e) => (
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
    </div>
  );
}
export async function getServerSideProps(id) {
  id = id.query.id;
  const client = await clientPromise;
  const db = client.db("nsut");
  let data = await db.collection("queries").find({}).toArray();
  data = JSON.parse(JSON.stringify(data));
  return {
    props: { data: data.reverse() },
  };
}
