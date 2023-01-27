import { ObjectId } from "mongodb";
import Image from "next/image";
import Head from "../../components/head";
import clientPromise from "../../middleware/mongodb";

export default function Profile(props) {
  return (
    <div style={{ padding: 10 }}>
      <Head
        title={`Dope - Notice by ${props.societies}`}
        description={`This is a noticed published by "${props.societies}" titled "${props.title}"`}
        keword={`, notices, ${props.societies}`}
        url={`profile/${props._id}`}
        image={props.image || "https://www.itsdope.in/profile.webp"}
      ></Head>
      <center>
        <h1 style={{}}>{props.title}</h1>
        <p>By {props.societies.toUpperCase()}</p>
      </center>
      <br></br>
      <p
        dangerouslySetInnerHTML={{
          __html: props.description.replace("\n", "<br>"),
        }}
      ></p>
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
