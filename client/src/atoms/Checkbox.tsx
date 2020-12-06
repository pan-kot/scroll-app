import React from 'react';
import styled from 'styled-components';

type TCheckboxProps = {
  children: React.ReactNode;
  [other: string]: any;
};

export function Checkbox({ children, ...props }: TCheckboxProps) {
  return (
    <CheckboxWrapper>
      <CheckboxInput {...props} />
      <div>{children}</div>
    </CheckboxWrapper>
  );
}

const CheckboxInput = styled.input.attrs({
  type: 'checkbox',
})`
  margin: 8px;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
`;
