import React from 'react';
import styled from 'styled-components';

import { color, ColorProps, layout, LayoutProps } from 'styled-system';

type TAvatarProps = LayoutProps & {
  name: string;
  color: string;
};

export function Avatar({ name, color: clr, ...rest }: TAvatarProps) {
  return (
    <AvatarStyled backgroundColor={clr} color={invertHex(clr)} {...rest}>
      {getInitials(name)}
    </AvatarStyled>
  );
}

type TAvatarStyledProps = ColorProps & LayoutProps;

const AvatarStyled = styled.div<TAvatarStyledProps>`
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

function getInitials(name: string) {
  const capitalLetters = name
    .replace(/\W/g, '')
    .split('')
    .filter((letter) => letter.toLocaleUpperCase() === letter);

  // Adding placeholders just in case the provided name has no or one capital letter
  capitalLetters.push('X');
  capitalLetters.push('X');

  return capitalLetters.slice(0, 2).join('');
}

// Finds the opposite color to the given hex color
function invertHex(hex: string) {
  // tslint:disable-next-line:no-bitwise
  const mask = Number(`0x1${hex.substr(1)}`) ^ 0xffffff;

  return '#' + mask.toString(16).substr(1).toUpperCase();
}
