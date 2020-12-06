import React from 'react';

import { Flex, Box } from '../../atoms';

import useAdvisors from './useAdvisors';

import AdvisorsSettings from './AdvisorsSettings';
import AdvisorsList from './AdvisorsList';

export default function Advisors() {
  const advisors = useAdvisors();

  return (
    <Flex
      width="100%"
      height="100%"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      padding={2}
    >
      <Flex
        flexDirection="column"
        padding={4}
        style={{ border: '1px solid #FFFFFF', overflowY: 'auto' }}
        width="600px"
        height="100%"
      >
        <AdvisorsSettings {...advisors} />

        <Box marginBottom={3}>{advisors.data.total}</Box>

        <AdvisorsList {...advisors} />
      </Flex>
    </Flex>
  );
}
