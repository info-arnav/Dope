import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Profile({ username_given }) {
  useEffect(() => {
    if (username_given == false) {
      router.push("/");
    }
  }, [username_given]);
  const router = useRouter();
  return <>{username_given != null && username_given != false && <></>}</>;
}
