import React, { useEffect, useRef } from "react";
import styled, { css } from "styled-components";

import { TextInput } from "./TextInput";
import { Message } from "./Message";

export const ChatRoom = (props) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [props.messages]);

  return (
    <Wrapper>
      <Messages>
        {props.messages.map((message, i) => (
          <Message key={i} username={props.username} message={message} />
        ))}
        <span ref={messagesEndRef} />
      </Messages>
      <TextInput onSend={props.onSend} />
    </Wrapper>
  );
};

const disableScrollbars = css`
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Wrapper = styled.div`
  height: 100%;
  max-width: 800px;
  margin: 0 auto;
  background-color: var(--color-background-secondary);
  box-shadow: var(--default-box-shadow);
`;

const Messages = styled.div`
  display: flex;
  flex-flow: column nowrap;
  overflow-y: auto;
  width: 100%;
  height: calc(100% - 32px - 5vh);

  ${disableScrollbars};

  > div {
    padding: 8px;
  }

  > :first-child {
    margin-top: auto !important;
  }
`;
