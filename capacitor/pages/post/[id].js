import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "../../components/head";

export default function Profile() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetcher = async () => {
      await await fetch(
        Capacitor.isNativePlatform()
          ? "https://www.itsdope.in/api/notice"
          : "/api/notice",
        {
          method: "POST",

          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: JSON.stringify({ id: id }),
        }
      )
        .then((e) => e.json())
        .then((e) => {
          if (e.error) {
            router.push("/404");
          } else {
            setData(e);
            setLoading(false);
          }
        });
    };
    if (id != undefined) {
      fetcher();
    }
  }, [id]);
  return (
    <div style={{ padding: 10 }}>
      <Head
        title={`Dope - Notice`}
        description={`This is a notice published by a society of nsut.`}
        keword={`, notices`}
        url={`profile/${id}`}
        image={"/profile.webp"}
      ></Head>
      {loading ? (
        <div className="empty">
          <Image src="/loading.gif" width={300} height={300}></Image>
        </div>
      ) : (
        <>
          <center>
            <h1 style={{}}>{data.title}</h1>
            <p>By {data.societies.toUpperCase()}</p>
          </center>
          <br></br>
          <p
            dangerouslySetInnerHTML={{
              __html: data.description.replaceAll("\n", "<br>"),
            }}
          ></p>
        </>
      )}
    </div>
  );
}
