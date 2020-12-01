import { createGlobalStyle } from 'styled-components';

import { getColor } from '../util';

export default createGlobalStyle`
  body {
    * {
      box-sizing: border-box;
    }

    width: 100vw;
    height: 100vh;

    font-family: Roboto;

    background: ${getColor('background')};

    display: flex;
    align-items: center;
    justify-content: center;
  }

  #root {
    width: 100%;
    height: 100%;
  }
`;
