import Head from "next/head";
import clientPromise from "../lib/mongodb";
export async function getServerSideProps(context) {
  try {
    await clientPromise;
    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}
export default function Home({ isConnected }) {
  return <main>Coming Soon</main>;
}
