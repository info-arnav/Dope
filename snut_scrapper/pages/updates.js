import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "../components/head";

export default function Update({ username_given, type_given }) {
  const [active, setActive] = useState(1);
  const [notices, setNotices] = useState(false);
  const recruitment = async (e) => {
    e.preventDefault();
    setNotices(null);
    await axios.post("/api/notices").then((e) => {
      setNotices(e.data);
      setActive(2);
    });
  };
  const societies = async (e) => {
    e.preventDefault();
    setNotices(null);
    await axios.post("/api/notices").then((e) => {
      setNotices(e.data);
      setActive(1);
    });
  };
  useEffect(() => {
    if (username_given == false) {
      router.push("/login");
    }
    if (username_given && type_given == "alumini") {
      axios.post("/api/notices").then((e) => setNotices(e.data));
    } else {
      axios.post("/api/notices").then((e) => setNotices(e.data));
    }
  }, [username_given, type_given]);
  const router = useRouter();
  return (
    <>
      <Head
        title="Dope - Chat"
        description="You can chat with your friends here."
        keword=", chat"
        url="chat"
        image="https://www.itsdope.in/social.jpg"
      ></Head>
      <div style={{ marginTop: 70 }}>
        {username_given != null && username_given != false && (
          <div className="update-buttons">
            <button className={active == 1 && "active"} onClick={societies}>
              Societies
            </button>
            <button className={active == 2 && "active"} onClick={recruitment}>
              Recruitments
            </button>
          </div>
        )}
        {username_given != null && username_given != false ? (
          notices ? (
            type_given == "student" ? (
              active == 1 ? (
                <div>
                  <div className="masonry-container">
                    {notices.reverse().map((e) => (
                      <Link href={`/post/${e._id}`}>
                        <div className="card">
                          <div className="header">
                            <div className="header-image">
                              <Image
                                src={"/societies/" + e.societies + ".png"}
                                width={40}
                                height={40}
                              ></Image>
                            </div>
                            <div className="header-title">
                              {e.societies.toUpperCase()}
                            </div>
                          </div>
                          <div className="body">
                            <img src={e.image}></img>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <></>
              )
            ) : (
              <></>
            )
          ) : (
            <div
              className="empty"
              style={{
                height: "calc(80vh)",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <Image
                src="/loading.gif"
                style={{ borderRadius: "100%" }}
                width={50}
                height={50}
              ></Image>
            </div>
          )
        ) : (
          <div className="empty"></div>
        )}
      </div>
    </>
  );
}
