import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "../components/head";
import Image from "next/image";

export default function Find({ username_given }) {
  function reload() {
    router.reload();
  }
  useEffect(() => {
    if (username_given == false) {
      router.push("/login");
    }
    const fetcher = async () => {
      fetch(
        Capacitor.isNativePlatform()
          ? "https://www.itsdope.in/api/find"
          : "/api/find",
        {
          method: "GET",

          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
            "Content-Type": "application/json",
          },
        }
      )
        .then((e) => e.json())
        .then((e) => {
          setData(e);
          setLoading(false);
        });
    };
    fetcher();
  }, [username_given]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const router = useRouter();
  return (
    <>
      <Head
        title="Dope - Discover"
        description="Find new people on Dope whome you can connect with."
        keword=", discover"
        url="find"
        image="/social.jpg"
      ></Head>
      {username_given != null && username_given != false ? (
        <>
          <button className="find-people" onClick={reload}>
            Find New People
          </button>
          <div className="grid" style={{ minHeight: 800 }}>
            {data.map((e) => (
              <a className="card" href={`/profile/${e.email}`}>
                <center>
                  <Image
                    width={100}
                    height={100}
                    src={e.image || "/profile.webp"}
                  ></Image>
                  <div className="name">
                    {e.name.toUpperCase() || "Not Provided"}
                  </div>
                  <div className="email">{e.roll_no}</div>
                  <hr></hr>
                </center>
                <b>
                  <div className="title">
                    {!e.instagram_id ? "Prediction" : "Instrgram ID"}
                  </div>
                </b>
                {!e.instagram_id ? (
                  e.insta_predicted.split("*")[0] ? (
                    <div className="instagram_id">
                      {e.insta_predicted.split("*")[0].split("$")[0]}
                    </div>
                  ) : (
                    <div class="instagram_id" disabled>
                      No Prediction
                    </div>
                  )
                ) : (
                  <div className="instagram_id">{e.instagram_id}</div>
                )}
                {!e.instagram_id ? (
                  e.insta_predicted.split("*")[0] ? (
                    <div className="instagram_name">
                      {e.insta_predicted.split("*")[0].split("$")[1]}
                    </div>
                  ) : (
                    <div className="instagram_name"></div>
                  )
                ) : (
                  <div className="instagram_name"></div>
                )}
              </a>
            ))}
          </div>
        </>
      ) : (
        <div className="empty"></div>
      )}
    </>
  );
}
