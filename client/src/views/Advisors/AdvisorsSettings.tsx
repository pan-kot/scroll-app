import React from 'react';

import { Flex, Box, Text, Select, Checkbox } from '../../atoms';

import { TAdvisors } from './useAdvisors';

export default function AdvisorsSettings({
  settings,
  availableLanguages,
}: TAdvisors) {
  return (
    <Flex justifyContent="space-between" marginBottom={3}>
      <Box padding={1}>
        <Select
          value={settings.sortByReviews || ''}
          onChange={(e) => {
            const value: any = e.target.value || null;

            settings.setSortByReviews(value);
          }}
        >
          <option value="">no sort</option>
          <option value="asc">sort by reviews asc</option>
          <option value="desc">sort by reviews desc</option>
        </Select>
      </Box>

      <Flex>
        <Box padding={1}>
          <Checkbox
            checked={Boolean(settings.isOnline)}
            onChange={(e: any) =>
              settings.setIsOnline(e.target.checked || null)
            }
          >
            <Text color="background">Online</Text>
          </Checkbox>
        </Box>

        <Box padding={1}>
          <Select
            value={settings.language || ''}
            onChange={(e) => {
              const value: any = e.target.value || null;

              settings.setLanguage(value);
            }}
          >
            <option value=""></option>

            {availableLanguages.map((language) => (
              <option key={language}>{language}</option>
            ))}
          </Select>
        </Box>
      </Flex>
    </Flex>
  );
}
