import styled from 'styled-components';

import {
  color,
  ColorProps,
  space,
  SpaceProps,
  layout,
  LayoutProps,
  borderRadius,
  BorderRadiusProps,
} from 'styled-system';

type TCardProps = ColorProps & SpaceProps & LayoutProps & BorderRadiusProps;

export const Card = styled.div<TCardProps>`
  box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05),
    0 15px 40px rgba(166, 173, 201, 0.2);

  ${color};
  ${space};
  ${layout};
  ${borderRadius};
`;
