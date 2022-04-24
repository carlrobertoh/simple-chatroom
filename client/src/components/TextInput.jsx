import React, { useRef, useState } from "react";
import styled from "styled-components";

export const TextInput = (props) => {
  const [text, setText] = useState("");
  return (
    <StyledForm
      onSubmit={(event) => {
        event.preventDefault();
        setText("");
        props.onSend({ text });
      }}
    >
      <StyledInput
        type="text"
        value={text}
        placeholder="Type a message here"
        onChange={(e) => setText(e.target.value)}
      />
    </StyledForm>
  );
};

const StyledForm = styled.form`
  height: 5vh;
  width: calc(100% - 24px);
  margin: 16px auto;
`;

const StyledInput = styled.input`
  height: inherit;
  min-height: 40px;
  padding-left: 16px;
  width: calc(100% - 16px);
  border-width: 0;
  border-radius: 16px;
`;
