import Head from "next/head";
import { useEffect } from "react";
import Router from "next/router";

export default function Error() {
  useEffect(() => {
    if (window.location.pathname != "/404") {
      Router.push("/404");
    }
  }, []);
  return <div>Coming Soon</div>;
}
