import Image from "next/image";
import Head from "../../components/head";
import clientPromise from "../../middleware/mongodb";

export default function Profile(props) {
  return (
    <div className="profile-back">
      <Head
        title={`Dope - ${props.email}@nsut.ac.in`}
        description={`This is the profile of ${
          props.name | "No name"
        }. About - ${props.bio | "No Bio"}`}
        keword={`, ${props.email}@nsut.ac.in, ${props.name}, profile`}
        url={`profile/${props.email}`}
        image="https://wwww.itsdope.in/social.jpg"
      ></Head>
      <div className="profile-front">
        <center>
          <Image
            width={200}
            height={200}
            src={props.image || "/profile.webp"}
          ></Image>
          <div className="name">
            {props.name.toUpperCase() || "Not Provided"}
          </div>
          <div className="email">{props.roll_no}</div>
          <hr></hr>
          <br></br>
          <p className="bio">{props.bio ? props.bio : "No bio added"}</p>
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
          <a
            className="instagram_id"
            href={`https://www.instagram.com/${props.instagram_id}`}
          >
            {props.instagram_id}
          </a>
        )}
        {!props.instagram_id ? (
          props.insta_predicted.split("*")[0] ? (
            <div className="instagram_name">
              {props.insta_predicted.split("*")[0].split("$")[1]}
            </div>
          ) : (
            <div className="instagram_name"></div>
          )
        ) : (
          <div className="instagram_name"></div>
        )}
        <b>
          <div className="title">{!props.instagram_id && "Possibilities"}</div>
        </b>
        <div className="possibilities">
          {!props.instagram_id &&
            props.insta_posibilities.split("*").map((e) => (
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
  );
}
export async function getServerSideProps(id) {
  id = id.query.id;
  const client = await clientPromise;
  const db = client.db("nsut");
  let data = await db.collection("users").find({ email: id }).toArray();
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
