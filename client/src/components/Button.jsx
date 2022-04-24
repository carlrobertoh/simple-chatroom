import React from "react";
import styled, { css } from "styled-components";

const ButtonEl = React.forwardRef(
  ({ secondary, warning, color, type = "button", ...props }, ref) => (
    <button ref={ref} type={type} {...props} />
  )
);

const disabledStyle = css`
  cursor: not-allowed;
  opacity: 0.8;
  color: lightgray;
  background-color: darkgray;
`;

export const Button = styled(ButtonEl)`
  height: 32px;
  text-align: center;
  padding: 6px 16px;
  border: 0;
  cursor: pointer;
  border-radius: 16px;
  background-color: var(--color-background-tertiary);
  color: lightgray;
  width: 100%;

  &:disabled {
    ${disabledStyle}
  }
`;
