import { useState, useEffect } from "react";

const token = localStorage.getItem("token");
export default function useLocalstorage(token) {
  const [loginStatus, setLoginStatus] = useState(
    localStorage.getItem("token") ? true : false
  );

  useEffect(() => {
    setLoginStatus(localStorage.getItem("token") ? true : false);
  }, [token]);

  return [loginStatus];
}
