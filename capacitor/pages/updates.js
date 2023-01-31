import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "../components/head";

export default function Update({ username_given }) {
  const [notices, setNotices] = useState(false);
  useEffect(() => {
    if (username_given == false) {
      router.push("/login");
    }
    if (username_given) {
      fetch(
        Capacitor.isNativePlatform()
          ? "https://www.itsdope.in/api/notices"
          : "/api/notices",
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
        .then((e) => setNotices(e));
    }
  }, [username_given]);
  const router = useRouter();
  return (
    <>
      <Head
        title="Dope - Chat"
        description="You can chat with your friends here."
        keword=", chat"
        url="chat"
        image="/social.jpg"
      ></Head>
      {username_given != null && username_given != false ? (
        notices ? (
          <div style={{ marginTop: 80 }}>
            {" "}
            <p style={{ margin: 10 }}>
              These updates are posted by admin of itsdope.in or the society
              members.
            </p>
            <div className="grid" style={{ marginTop: 10 }}>
              {notices.reverse().map((e) => (
                <Link className="card" id="soc" href={`/post/${e._id}`}>
                  <div className="soc-name">{e.societies.toUpperCase()}</div>
                  <div className="soc-title">{e.title}</div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="empty">
            <Image src="/loading.gif" width={300} height={300}></Image>
          </div>
        )
      ) : (
        <div className="empty"></div>
      )}
    </>
  );
}