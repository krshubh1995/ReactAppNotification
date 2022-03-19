import { React, useEffect, useState } from "react";
export default function Notification() {
  const [data, setData] = useState("No Notifications");
  const localUrl = `http://localhost:9090/notifications?userId=${"userId"}`;
  const hostedUrl = `https://kafka-streaming-service.herokuapp.com/notifications?userId=${"userId"}`;
  const url = hostedUrl;
  useEffect(() => {
    const source = new EventSource(url);

    source.onmessage = (event) => {
      console.log(event);
      // setData(event.data);
    };
    source.addEventListener("pubs", (e) => {
      setData(e.data);
    });
    return () => source.close();
  }, []);

  return (
    <div>
      <h1>Notification Pannel</h1>
      <h2>{data}</h2>
    </div>
  );
}
