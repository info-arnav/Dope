import Head from "next/head";

export default function Offline() {
  return (
    <div className="error">
      <Head>
        <title>Dope - Offline</title>
        <meta name="title" content="Offline" />
        <meta name="description" content="You are offline if u see this." />
      </Head>
      <div className="error-title">Offline!!!</div>
      <div className="error-message">Move to some APJ for good network.</div>
    </div>
  );
}
