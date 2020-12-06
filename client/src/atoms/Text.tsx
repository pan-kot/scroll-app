import styled from 'styled-components';
import { color, typography, ColorProps, TypographyProps } from 'styled-system';

type TTextProps = ColorProps & TypographyProps;

export const Text = styled.span<TTextProps>`
  ${color};
  ${typography};
`;
