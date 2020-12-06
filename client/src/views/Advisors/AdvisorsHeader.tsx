import React from 'react';

import { Flex, Text, Card } from '../../atoms';

import { TAdvisors } from './useAdvisors';
import AdvisorsSettings from './AdvisorsSettings';

export default function AdvisorsHeader(advisors: TAdvisors) {
  return (
    <Card backgroundColor="brand" padding={3} borderRadius={2}>
      <Flex flexDirection="column">
        <AdvisorsSettings {...advisors} />

        <Text color="background">
          <Text fontWeight="bold">Matched:</Text> {advisors.data.total}
        </Text>
      </Flex>
    </Card>
  );
}
