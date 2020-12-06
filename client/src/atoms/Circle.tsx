import styled from 'styled-components';

import { color, ColorProps, layout, LayoutProps } from 'styled-system';

type TCircleProps = ColorProps & LayoutProps;

export const Circle = styled.div<TCircleProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 24px;

  width: 50px;
  height: 50px;

  border-radius: 50%;

  ${color};
  ${layout};
`;
