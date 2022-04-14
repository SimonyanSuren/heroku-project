import { useState, useEffect } from "react";
import { Ipost, List } from "../APIResponseTypes";

type Status =
  | "unloaded"
  | "loading"
  | "error"
  | "success"
  | "more"
  | "deleted"
  | "added"
  | "edited";

const useFetch = (
  itmesUrl: string
): [any, Status, Function, Function, boolean] => {
  const [data, setData] = useState([] as Ipost[] );
  const [status, setStatus] = useState("unloaded" as Status);
  const [end, setEnd] = useState(false);

  const fetchData = async (url: string): Promise<any> => {
    setStatus("loading");
    try {
      const req = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "content-type": "application/json",
        },
      });
      const res = await req.json();
      setStatus("success");
      if (req.status === 200) {
        if (status === "more" || status === "added") {
          data && setData([...data, ...res]);
        } else setData(res);
      } else {
        setEnd(true);
      }
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    fetchData(itmesUrl);
  }, [itmesUrl]);

  return [data, status, setStatus, setData, end];
};

export default useFetch;
