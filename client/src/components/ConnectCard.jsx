import React, { useState } from "react";
import styled from "styled-components";

import { Button } from "./Button";

export const ConnectCard = (props) => {
  const [username, setUsername] = useState();
  return (
    <CardWrapper>
      <h2>Connect</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          props.onConnect(username);
        }}
      >
        <StyledInput
          placeholder="Username"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button type="submit" disabled={!username}>
          CONNECT
        </Button>
      </form>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 25vh;
  background-color: var(--color-background-secondary);
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--default-box-shadow);

  button {
    margin-top: 24px;
  }
`;

const StyledInput = styled.input`
  padding: 12px 16px;
  width: calc(100% - 32px);
  border-width: 0;
  border-radius: 16px;
`;
