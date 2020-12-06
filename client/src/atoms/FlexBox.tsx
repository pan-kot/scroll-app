import styled from 'styled-components';

import {
  color,
  ColorProps,
  space,
  SpaceProps,
  layout,
  LayoutProps,
  flexbox,
  FlexboxProps,
} from 'styled-system';

type TBoxProps = ColorProps & SpaceProps & LayoutProps;

export const Box = styled.div<TBoxProps>`
  ${color};
  ${space};
  ${layout};
`;

type TFlexProps = TBoxProps & FlexboxProps;

export const Flex = styled(Box)<TFlexProps>`
  display: flex;

  ${flexbox};
`;
