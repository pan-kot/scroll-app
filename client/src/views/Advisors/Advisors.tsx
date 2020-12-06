import React from 'react';

import { Flex, Box } from '../../atoms';

import useAdvisors from './useAdvisors';

import AdvisorsHeader from './AdvisorsHeader';
import AdvisorsList from './AdvisorsList';
import AdvisorsError from './AdvisorsError';

export default function Advisors() {
  const advisors = useAdvisors();

  return (
    <Flex
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
      padding={3}
    >
      <Flex flexDirection="column" maxWidth="1000px" width="100%" height="100%">
        <AdvisorsHeader {...advisors} />

        <br />

        {!advisors.error ? (
          <Box width="100%" height="100%" overflowY="auto">
            <AdvisorsList {...advisors} />
          </Box>
        ) : (
          <Flex
            width="100%"
            height="100%"
            alignItems="center"
            justifyContent="center"
          >
            <AdvisorsError error={advisors.error} />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
