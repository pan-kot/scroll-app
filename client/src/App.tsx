import React from 'react';

import Setup from './setup/Setup';
import Advisors from './views/Advisors/Advisors';

export default function App() {
  return (
    <Setup>
      <Advisors />
    </Setup>
  );
}
