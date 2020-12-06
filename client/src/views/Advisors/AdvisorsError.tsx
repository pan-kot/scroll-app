import React from 'react';

import { Card } from '../../atoms';

export default function AdvisorsError({ error }: { error: Error }) {
  return (
    <Card
      color="#FFFFFF"
      backgroundColor="#FF0034"
      padding={3}
      borderRadius={2}
    >
      {error.message}
    </Card>
  );
}
