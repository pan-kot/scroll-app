import { Theme } from 'styled-system';

import { getProp } from './object';

type TStyledProps = {
  theme: Theme;
};

export function getColor(colorSpec?: string) {
  return (props: TStyledProps) => {
    const color = getProp(
      props.theme.colors as Record<string, string>,
      colorSpec
    );

    return color || colorSpec;
  };
}
