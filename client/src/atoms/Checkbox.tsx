import React from 'react';
import styled from 'styled-components';

export function Checkbox({ children, ...props }: any) {
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
