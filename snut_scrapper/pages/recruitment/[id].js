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
        description={`This is a recruitment offered at dope by ${props.email}.`}
        keword={`, recruitment`}
        url={`recruitment/${props._id}`}
        image={"https://www.itsdope.in/recruitment.jpeg"}
      ></Head>
      {loggedIn != null && loggedIn ? (
        <div>Some content</div>
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
