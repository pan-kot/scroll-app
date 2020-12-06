import React, { useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import { Flex, Text, Box } from '../../atoms';

import { TAdvisors } from './useAdvisors';

import AdvisorCard from './AdvisorCard';

export default function AdvisorsList({
  data,
  canLoadMore,
  loadMore,
}: TAdvisors) {
  const onItemsRendered = useCallback(
    ({ visibleStopIndex }) => {
      if (canLoadMore && visibleStopIndex === data.items.length - 1) {
        loadMore();
      }
    },
    [data, canLoadMore, loadMore]
  );

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          height={height}
          itemCount={data.items.length}
          itemKey={itemKey}
          itemData={data}
          itemSize={88}
          width={width}
          onItemsRendered={onItemsRendered}
        >
          {Row}
        </List>
      )}
    </AutoSizer>
  );
}

function Row({ index, style, data }: any) {
  const { items } = data;
  const item = items[index];

  return (
    <div style={style}>
      <AdvisorCard {...item} />
    </div>
  );
}

function itemKey(index: number, data: any) {
  // Find the item at the specified index.
  // In this case "data" is an Array that was passed to List as "itemData".
  const item = data.items[index];

  // Return a value that uniquely identifies this item.
  // Typically this will be a UID of some sort.
  return item.id;
}
