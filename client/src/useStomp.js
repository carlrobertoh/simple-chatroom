import { useEffect, useState } from "react";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export const useStomp = () => {
  const [client, setClient] = useState();
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState();

  useEffect(() => {
    return () => {
      client?.disconnect();
    };
  }, [client]);

  return {
    messages,
    connected,
    username,
    connect: (name) => {
      setUsername(name);
      const stompClient = Stomp.over(new SockJS("/chatroom"));
      stompClient.connect(
        {
          username: name,
        },
        () => {
          setConnected(true);
          stompClient.subscribe("/topic/messages", (message) => {
            setMessages((prevState) => [
              ...prevState,
              JSON.parse(message.body),
            ]);
          });
        },
        () => {
          console.error("Can't connect to server.");
        }
      );
      setClient(stompClient);
    },
    sendMessage: (message) => {
      client?.send("/app/v1/messages", {}, JSON.stringify(message));
    },
  };
};
