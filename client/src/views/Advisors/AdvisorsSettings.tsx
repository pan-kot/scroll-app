import React, { useRef } from 'react';

import { Flex, Box, Text, Select, Checkbox } from '../../atoms';

import { TAdvisors } from './useAdvisors';

export default function AdvisorsSettings({
  settings,
  availableLanguages,
}: TAdvisors) {
  const handleChangeSort = useRef((event: any) => {
    const value = event.target.value || null;

    settings.setSortByReviews(value);
  });

  const handleChangeIsOnline = useRef((event: any) => {
    const value = event.target.checked || null;

    settings.setIsOnline(value);
  });

  const handleChangeLanguage = useRef((event: any) => {
    const value = event.target.value || null;

    settings.setLanguage(value);
  });

  return (
    <Flex justifyContent="space-between" marginBottom={3} flexWrap="wrap">
      <Box padding={1}>
        <Select
          value={settings.sortByReviews || ''}
          onChange={handleChangeSort.current}
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
            onChange={handleChangeIsOnline.current}
          >
            <Text color="background">Online</Text>
          </Checkbox>
        </Box>

        <Box padding={1}>
          <Select
            value={settings.language || ''}
            onChange={handleChangeLanguage.current}
          >
            <option value="" />

            {availableLanguages.map((language) => (
              <option key={language}>{language}</option>
            ))}
          </Select>
        </Box>
      </Flex>
    </Flex>
  );
}
