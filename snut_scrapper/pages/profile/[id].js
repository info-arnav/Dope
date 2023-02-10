import Image from "next/image";
import { useEffect, useState } from "react";
import Head from "../../components/head";
import clientPromise from "../../middleware/mongodb";

export default function Profile(props) {
  const [loggedIn, setLoggedIn] = useState(null);
  useEffect(() => {
    if (props.username_given) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [props.username_given]);
  return (
    <div className="profile-back">
      <Head
        title={`Dope - ${props.email}@nsut.ac.in`}
        description={`This is the profile of ${
          props.name || "No name"
        }. About - ${props.bio || "No Bio"}`}
        keword={`, ${props.email}@nsut.ac.in, ${props.name}, profile`}
        url={`profile/${props.email}`}
        image={props.image || "https://www.itsdope.in/profile.webp"}
      ></Head>
      <div className="profile-front">
        <center>
          {props.image ? (
            <img width={200} height={200} src={props.image}></img>
          ) : (
            <img width={200} height={200} src="/profile.webp"></img>
          )}
          <div className="name">
            {props.name
              ? props.name.toUpperCase() || "Not Provided"
              : "Not Provided"}
          </div>
          <div className="email">{props.roll_no}</div>
          <hr></hr>
          <br></br>
          {props.bio ? (
            <p
              className="bio"
              dangerouslySetInnerHTML={{
                __html: props.bio.replaceAll("\n", "<br>"),
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
        <p style={{ marginTop: 0 }}>{props.email}@nsut.ac.in</p>
        <b>
          <div className="title">
            {!props.instagram_id ? "Prediction" : "Instrgram ID"}
          </div>
        </b>
        {!props.instagram_id ? (
          props.insta_predicted ? (
            props.insta_predicted.split("*")[0] ? (
              <a
                className="instagram_id"
                href={`https://www.instagram.com/${
                  props.insta_predicted.split("*")[0].split("$")[0]
                }`}
              >
                {props.insta_predicted.split("*")[0].split("$")[0]}
              </a>
            ) : (
              <div class="instagram_id" disabled>
                No Prediction
              </div>
            )
          ) : (
            <div class="instagram_id" disabled>
              No Prediction
            </div>
          )
        ) : (
          <a
            className="instagram_id"
            href={`https://www.instagram.com/${props.instagram_id}`}
          >
            {props.instagram_id}
          </a>
        )}
        {!props.instagram_id ? (
          props.insta_predicted ? (
            props.insta_predicted.split("*")[0] ? (
              <div className="instagram_name">
                {props.insta_predicted.split("*")[0].split("$")[1]}
              </div>
            ) : (
              <div className="instagram_name"></div>
            )
          ) : (
            <div className="instagram_name"></div>
          )
        ) : (
          <div className="instagram_name"></div>
        )}
        <b>
          <div className="title">{!props.instagram_id && "Possibilities"}</div>
        </b>
        {!props.instagram_id &&
        props.insta_posibilities &&
        props.insta_posibilities.split("*").length > 0 ? (
          <div className="possibilities">
            {props.insta_posibilities.split("*").map((e) => (
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
        ) : (
          !props.instagram_id && (
            <div class="instagram_id" disabled>
              -
            </div>
          )
        )}
        {props.linkedin && (
          <div>
            {" "}
            <b>
              <div className="title">LinkedIn URL</div>
            </b>{" "}
            <a className="instagram_id" href={props.linkedin}>
              {props.linkedin}
            </a>
          </div>
        )}
        <div style={{ marginTop: 10 }}></div>
        {props.github && (
          <div>
            {" "}
            <b>
              <div className="title">Github URL</div>
            </b>{" "}
            <a className="instagram_id" href={props.github}>
              {props.github}
            </a>
          </div>
        )}
        <div style={{ marginTop: 10 }}></div>
        {props.snapchat && (
          <div>
            {" "}
            <b>
              <div className="title">Snapchat</div>
            </b>{" "}
            <a
              className="instagram_id"
              href={`https://snapchat.com/add/${props.snapchat}`}
            >
              {props.snapchat}
            </a>
          </div>
        )}
        {loggedIn != null && loggedIn && (
          <>
            <div style={{ marginTop: 10 }}></div>
            {props.whatsapp && (
              <div>
                {" "}
                <b>
                  <div className="title">Whatsapp Number</div>
                </b>{" "}
                <a
                  className="instagram_id"
                  href={`https://wa.me/${props.whatsapp}`}
                >
                  {props.whatsapp}
                </a>
              </div>
            )}
            <div style={{ marginTop: 10 }}></div>
            {props.mail && (
              <div>
                {" "}
                <b>
                  <div className="title">Personal Email</div>
                </b>{" "}
                <a className="instagram_id" href={`mailto:${props.mail}`}>
                  {props.mail}
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
export async function getServerSideProps(id) {
  id = id.query.id;
  const client = await clientPromise;
  const db = client.db("nsut");
  let data = await db.collection("users-new").find({ email: id }).toArray();
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
