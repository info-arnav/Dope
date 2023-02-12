import { ObjectId } from "mongodb";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "../../components/head";
import clientPromise from "../../middleware/mongodb";

export default function Profile(props) {
  const [loggedIn, setLoggedIn] = useState(null);
  const router = useRouter();
  useEffect(() => {
    if (props.username_given == false) {
      router.push("/login");
    }
    if (props.username_given) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [props.username_given]);
  return (
    <div>
      <Head
        title={`Dope - Offer | ${props.title}`}
        description={`This is a recruitment offered at dope. Login to view more details`}
        keword={`, recruitment`}
        url={`recruitment/${props._id}`}
        image={"https://www.itsdope.in/recruitment.webp"}
      ></Head>
      {loggedIn != null && loggedIn ? (
        <div style={{ padding: 10 }}>
          <center style={{ marginTop: 80 }}>
            <h1 style={{}}>{props.title}</h1>
            <p>By {props.email}</p>
          </center>
          <br></br>
          <p>
            <b>Location : </b>
            {props.location}
          </p>
          <div style={{ marginBottom: 15 }}></div>
          <p>
            <b>Department : </b>
            {props.department}
          </p>
          <div style={{ marginBottom: 15 }}></div>
          <p>
            <b>Reporting To : </b>
            {props.reporting}
          </p>
          <div style={{ marginBottom: 15 }}></div>
          <p>
            <b>Main Requirments : </b>
            {props.requirments}
          </p>
          <div style={{ marginBottom: 15 }}></div>
          <br></br>
          <br></br>
          <b>Details : </b>
          <p
            dangerouslySetInnerHTML={{
              __html:
                props.description && props.description.replaceAll("\n", "<br>"),
            }}
          ></p>
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
    .collection("recruitments")
    .find({ _id: ObjectId(id) })
    .toArray();
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
