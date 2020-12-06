import { createGlobalStyle } from 'styled-components';

import { getColor } from '../util';

export default createGlobalStyle`
  body {
    * {
      box-sizing: border-box;
    }

    width: 100vw;
    height: 100vh;
    margin: 0;

    font-family: Roboto;

    background: ${getColor('background')};
    color: ${getColor('font')};

    display: flex;
    align-items: center;
    justify-content: center;
  }

  #root {
    width: 100%;
    height: 100%;
  }
`;
