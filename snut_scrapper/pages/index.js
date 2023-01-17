import Head from "next/head";
import { useEffect } from "react";
import clientPromise from "../middleware/mongodb";
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
export default function Home({ isConnected, username }) {
  return <>{username}</>;
}
