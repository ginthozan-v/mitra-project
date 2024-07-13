import { useRouter } from "next/router";
import { useEffect } from "react";
import { authNavigate } from "utils/auth";

export default function() {
  const {query} = useRouter();
  useEffect(() => {
    const redirect = query['redirect'];
    if (redirect) {
      localStorage.setItem('redirect', redirect.toString());
    }
    authNavigate();
  }, []);
  return null;
}