import React from 'react';
import styled from 'styled-components';

import { TAdvisorCard } from '../../api';

import { Flex, Box, Text } from '../../atoms';

export default function AdvisorCard(advisor: TAdvisorCard) {
  return (
    <Box
      width="100%"
      height="80px"
      padding={2}
      marginBottom="8px"
      style={{ border: '1px solid #FFFFFF' }}
      backgroundColor="#FFFFFF"
    >
      <Avatar></Avatar>

      <Flex flexDirection="column">
        <Text>{advisor.name}</Text>

        <Text>{advisor.contact.email}</Text>

        <Text>{advisor.feedback.reviews}</Text>
      </Flex>
    </Box>
  );
}

const Avatar = styled.img``;
