import React from 'react';

import { Flex, Box } from '../../atoms';

import { TAdvisors } from './useAdvisors';

export default function AdvisorsSettings({
  settings,
  availableLanguages,
}: TAdvisors) {
  return (
    <Flex justifyContent="space-between" marginBottom={3}>
      <Box>
        <select
          value={settings.sortByReviews || ''}
          onChange={(e) => {
            const value: any = e.target.value || null;

            settings.setSortByReviews(value);
          }}
        >
          <option value="">no sort</option>
          <option value="asc">sort by reviews asc</option>
          <option value="desc">sort by reviews desc</option>
        </select>
      </Box>

      <Flex>
        <Flex>
          <input
            type="checkbox"
            checked={Boolean(settings.isOnline)}
            onChange={(e) => settings.setIsOnline(e.target.checked || null)}
          />{' '}
          Online
        </Flex>

        <select
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
        </select>
      </Flex>
    </Flex>
  );
}
