import { ObjectId } from "mongodb";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "../../components/head";
import clientPromise from "../../middleware/mongodb";

export default function Profile({
  username,
  societies,
  title,
  description,
  _id,
  image,
}) {
  function reload() {
    router.reload();
  }
  useEffect(() => {
    if (username == false) {
      router.push("/");
    }
  }, [username]);
  const router = useRouter();
  return (
    <div>
      <Head
        title={`Dope - Notice by ${societies}`}
        description={`This is a noticed published by "${societies}" titled "${title}"`}
        keword={`, notices, ${societies}`}
        url={`profile/${_id}`}
        image={image || "https://societies.itsdope.in/profile.webp"}
      ></Head>
      {username != null && username != false ? (
        <div className="profile-back">
          <nav>
            <Link href="/" className="soc-name">
              {username.toUpperCase()}
            </Link>
            <button
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                localStorage.removeItem("user");
                reload();
              }}
            >
              Logout
            </button>
          </nav>
          <div style={{ marginTop: 80, padding: 10 }}>
            <center>
              <h1 style={{}}>{title}</h1>
              <p>By {societies.toUpperCase()}</p>
            </center>
            <br></br>
            <p
              dangerouslySetInnerHTML={{
                __html: description.replaceAll("\n", "<br>"),
              }}
            ></p>
          </div>
        </div>
      ) : (
        <div className="empty"></div>
      )}
    </div>
  );
}
export async function getServerSideProps(id) {
  id = id.query.id;
  const client = await clientPromise;
  const db = client.db("nsut");
  let data = await db
    .collection("notices")
    .find({ _id: ObjectId(id) })
    .toArray();
  data = JSON.parse(JSON.stringify(data));
  if (data.length > 0) {
    return {
      props: data[0],
    };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
      props: {},
    };
  }
}
