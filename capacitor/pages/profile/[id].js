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
          ? "https://www.itsdope.in/api/profile"
          : "/api/profile",
        {
          method: "POST",

          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: JSON.stringify({ email: id }),
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
    <>
      <Head
        title={`Dope - Profile`}
        description={`This is a profile on Dope.`}
        keword={`, profile`}
        url={`profile/${id}`}
        image={"/profile.webp"}
      ></Head>
      {loading ? (
        <div className="empty">
          <Image src="/loading.gif" width={300} height={300}></Image>
        </div>
      ) : (
        <div className="profile-back">
          <div className="profile-front">
            <center>
              {data.image ? (
                <Image width={200} height={200} src={data.image}></Image>
              ) : (
                <Image width={200} height={200} src="/profile.webp"></Image>
              )}
              <div className="name">
                {data.name.toUpperCase() || "Not Provided"}
              </div>
              <div className="email">{data.roll_no}</div>
              <hr></hr>
              <br></br>
              {data.bio ? (
                <p
                  className="bio"
                  dangerouslySetInnerHTML={{
                    __html: data.bio.replaceAll("\n", "<br>"),
                  }}
                ></p>
              ) : (
                <p className="bio">No Bio Added</p>
              )}
            </center>
            <b>
              <div className="title" style={{ marginBottom: 0 }}>
                Email
              </div>
            </b>
            <p style={{ marginTop: 0 }}>{data.email}@nsut.ac.in</p>
            <b>
              <div className="title">
                {!data.instagram_id ? "Prediction" : "Instrgram ID"}
              </div>
            </b>
            {!data.instagram_id ? (
              data.insta_predicted.split("*")[0] ? (
                <a
                  className="instagram_id"
                  href={`https://www.instagram.com/${
                    data.insta_predicted.split("*")[0].split("$")[0]
                  }`}
                >
                  {data.insta_predicted.split("*")[0].split("$")[0]}
                </a>
              ) : (
                <div class="instagram_id" disabled>
                  No Prediction
                </div>
              )
            ) : (
              <a
                className="instagram_id"
                href={`https://www.instagram.com/${data.instagram_id}`}
              >
                {data.instagram_id}
              </a>
            )}
            {!data.instagram_id ? (
              data.insta_predicted.split("*")[0] ? (
                <div className="instagram_name">
                  {data.insta_predicted.split("*")[0].split("$")[1]}
                </div>
              ) : (
                <div className="instagram_name"></div>
              )
            ) : (
              <div className="instagram_name"></div>
            )}
            <b>
              <div className="title">
                {!data.instagram_id && "Possibilities"}
              </div>
            </b>
            <div className="possibilities">
              {!data.instagram_id &&
                data.insta_posibilities.split("*").map((e) => (
                  <div>
                    <a
                      className="instagram_id"
                      href={`https://www.instagram.com/${e.split("$")[0]}`}
                    >
                      {e.split("$")[0]}
                    </a>
                    <div className="instagram_name">{e.split("$")[1]}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
