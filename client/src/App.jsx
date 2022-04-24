import React, { useEffect } from "react";
import styled from "styled-components";

import { ConnectCard } from "./components/ConnectCard";
import { ChatRoom } from "./components/ChatRoom";
import { useStomp } from "./useStomp";

import "./styles.css";

export const App = () => {
  const stompHook = useStomp();

  useEffect(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    window.addEventListener("resize", () => {
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
  }, []);

  if (stompHook.connected) {
    return (
      <ChatRoom
        username={stompHook.username}
        activeUsers={stompHook.activeUsers}
        messages={stompHook.messages}
        onSend={stompHook.sendMessage}
      />
    );
  }

  return (
    <ConnectCardWrapper>
      <ConnectCard onConnect={stompHook.connect} />
    </ConnectCardWrapper>
  );
};

const ConnectCardWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
