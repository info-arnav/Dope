import Head from "next/head";
import { useEffect } from "react";
import Router from "next/router";

export default function Error() {
  useEffect(() => {
    if (window.location.pathname != "/500") {
      Router.push("/500");
    }
  }, []);
  return <div>Coming Soon</div>;
}
