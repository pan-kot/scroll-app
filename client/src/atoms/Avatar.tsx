import React from 'react';
import styled from 'styled-components';

import { color, ColorProps, layout, LayoutProps } from 'styled-system';

export function Avatar({ name, color, ...rest }: any) {
  return (
    <AvatarStyled backgroundColor={color} color={invertHex(color)} {...rest}>
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

  capitalLetters.push('X');
  capitalLetters.push('X');

  return capitalLetters.slice(0, 2).join('');
}

function invertHex(hex: string) {
  const mask = Number(`0x1${hex.substr(1)}`) ^ 0xffffff;

  return '#' + mask.toString(16).substr(1).toUpperCase();
}
