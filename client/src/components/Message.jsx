import React, { useState } from "react";
import styled, { css } from "styled-components";
import { format, parseISO } from "date-fns";

export const Message = ({ message, username }) => {
  const [touched, setTouched] = useState(false);
  const isSessionUserMessage = message.username === username;
  return (
    <Root
      $isSessionUserMessage={isSessionUserMessage}
      onClick={() => setTouched(!touched)}
    >
      {!isSessionUserMessage && message.type === "USER_MESSAGE" && (
        <Author>{message.username}</Author>
      )}
      <Pebble>{getMessage(message)}</Pebble>
      {touched && message.timestamp && (
        <Timestamp>{format(parseISO(message.timestamp), "HH:mm")}</Timestamp>
      )}
    </Root>
  );
};

const getMessage = (message) => {
  switch (message.type) {
    case "USER_JOINED":
      return `User ${message.username} joined.`;
    case "USER_LEFT":
      return `User ${message.username} left.`;
    case "USER_MESSAGE":
      return message.content;
  }
};

const Pebble = styled.span`
  display: inline-block;
  padding: 8px;
  cursor: default;
  border-radius: 16px;
  word-break: break-word;
`;

const Root = styled.div`
  ${(props) =>
    props.$isSessionUserMessage
      ? css`
          ${Pebble} {
            color: white;
            background-color: var(--color-green);
          }
          margin-left: auto;
        `
      : css`
          ${Pebble} {
            background-color: var(--color-white);
          }
          margin-right: auto;
        `}
`;

const Author = styled.div`
  padding: 4px;
`;

const Timestamp = styled.span`
  margin-left: 8px;
`;
