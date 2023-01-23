import clientPromise from "../../middleware/mongodb";

export default function Profile(props) {
  return (
    <div className="profile">
      <Head
        title={`Dope - ${props.email}@nsut.ac.in`}
        description={`This is the profile of ${
          props.name | "No name"
        }. About - ${props.bio | "No Bio"}`}
        kewrod={`, ${props.email}@nsut.ac.in, ${props.name}, profile`}
        url={`profile/${props.email}`}
        image="https://wwww.itsdope.in/social.jpg"
      ></Head>
      {props.email}
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
