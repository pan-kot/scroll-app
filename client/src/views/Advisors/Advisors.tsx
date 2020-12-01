import React from 'react';

import { Flex, Text } from '../../atoms';

import useHealth from './state/useHealth';

export default function Advisors() {
  const { loading, error, data } = useHealth();

  const content = loading ? 'Loading...' : error ? 'Error!' : data;

  return (
    <Flex width="100%" height="100%" justifyContent="center" alignItems="center">
      <Text>{content}</Text>
    </Flex>
  );
}
