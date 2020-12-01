import React, { Fragment } from 'react';

import Theme from './Theme';
import GlobalStyle from './GlobalStyle';

type TSetupProps = {
  children: React.ReactElement;
};

export default function Setup({ children }: TSetupProps) {
  return (
    <Theme>
      <Fragment>
        <GlobalStyle />

        {children}
      </Fragment>
    </Theme>
  );
}
