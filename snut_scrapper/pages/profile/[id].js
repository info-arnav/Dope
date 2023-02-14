import Image from "next/image";
import { ObjectId } from "mongodb";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "../../components/head";
import clientPromise from "../../middleware/mongodb";

export default function Profile(props) {
  const [loggedIn, setLoggedIn] = useState(null);
  useEffect(() => {
    if (props.username_given == false) {
      router.push("/login");
    }
  }, [props.username_given]);
  const router = useRouter();
  return (
    <div className="profile-back">
      <Head
        title={`Dope - ${props.name}`}
        description={`This is the profile of ${
          props.name || "No name"
        }. Login to view their information on Dope`}
        keword={`, ${props.name}, profile`}
        url={`profile/${props._id}`}
        image={props.image || "https://www.itsdope.in/profile.webp"}
      ></Head>
      {props.username_given != null ? (
        props.username_given ? (
          <div className="profile-front">
            <div className="row">
              <div className="col center">
                <img
                  alt="profile picture"
                  src={props.image || "/profile.webp"}
                  width={100}
                  style={{ borderRadius: 20 }}
                ></img>
              </div>
              <div className="col left">
                <p>
                  <b>Name :</b>
                  <br className="br-hidden"></br>
                  {" " + (props.name || "-")}
                </p>
                <p>
                  <b>Email :</b>
                  <br className="br-hidden"></br>
                  {" " + (props.email || "-")}
                </p>
              </div>
            </div>{" "}
            <br className="br-hidden"></br>
            <div className="left">
              {" "}
              <p>
                <b>Branch/Position :</b>
                {" " + (props.branch || "-")}
              </p>
              <p>
                <b>Company :</b>
                {" " + (props.company || "None")}
              </p>
              <p>
                <b>About : </b>
                <p
                  dangerouslySetInnerHTML={{
                    __html: props.bio
                      ? props.bio.replace("\n", "<br>")
                      : "Nothing here",
                  }}
                ></p>
              </p>
            </div>
          </div>
        ) : (
          <div className="empty"></div>
        )
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
  let data = await db.collection("users-new").find({ _id: ObjectId(id) }).toArray();
  data = JSON.parse(JSON.stringify(data));
  if (data[0]) {
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
