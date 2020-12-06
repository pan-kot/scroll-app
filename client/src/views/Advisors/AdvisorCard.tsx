import React from 'react';

import { TAdvisorCard } from '../../api';
import { RatingIcon } from '../../icons';

import { Avatar, Flex, Box, Text, Card, Circle } from '../../atoms';

export default function AdvisorCard(advisor: TAdvisorCard) {
  return (
    <AdvisorCardWrapper>
      <Flex justifyContent="space-between">
        <Flex alignItems="center">
          <Box padding={2}>
            <Avatar
              name={advisor.name}
              color={advisor.appearance.color}
              width="60px"
              height="60px"
            />
          </Box>

          <Flex flexDirection="column">
            <Box padding={1}>
              <AdvisorName
                name={advisor.name}
                isOnline={advisor.presence.isOnline}
              />
            </Box>

            <Box padding={1}>
              <Text color="font-secondary">{advisor.contact.email}</Text>
            </Box>
          </Flex>
        </Flex>

        <Flex alignItems="center">
          <Box marginRight={2}>
            <Text color="font-secondary" fontSize={12}>
              {advisor.features.languages.join(', ')}
            </Text>
          </Box>

          <AdvisorRating reviews={advisor.feedback.reviews} />
        </Flex>
      </Flex>
    </AdvisorCardWrapper>
  );
}

AdvisorCard.Loading = function () {
  return <AdvisorCardWrapper />;
};

function AdvisorCardWrapper({
  children = null,
}: {
  children?: React.ReactNode;
}) {
  return (
    <Card
      width="calc(100% - 16px)"
      height="84px"
      padding={2}
      marginLeft="auto"
      marginRight="auto"
      marginTop="8px"
      marginBottom="8px"
      backgroundColor="background"
      borderRadius={2}
    >
      {children}
    </Card>
  );
}

type TAdvisorNameProps = {
  name: string;
  isOnline: boolean;
};

function AdvisorName({ name, isOnline }: TAdvisorNameProps) {
  const statusColor = isOnline ? '#05b714' : '#999999';

  return (
    <Flex alignItems="center">
      <Text fontWeight="bold">{name}</Text>{' '}
      <Box padding={1}>
        <Circle width="12px" height="12px" backgroundColor={statusColor} />
      </Box>
    </Flex>
  );
}

type TAdvisorRatingProps = {
  reviews: number;
};

function AdvisorRating({ reviews }: TAdvisorRatingProps) {
  return (
    <Flex alignItems="center">
      <Box padding={1}>
        <RatingIcon />
      </Box>

      <Box padding={1}>
        <Text>{reviews}</Text>
      </Box>
    </Flex>
  );
}
