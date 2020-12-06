import React, { useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import { PAGE_SIZE } from '../../api/api';

import { TAdvisors } from './useAdvisors';
import AdvisorCard from './AdvisorCard';

export default function AdvisorsList({
  data,
  loading,
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

  const nextPageSize = Math.max(PAGE_SIZE, data.total - data.items.length);

  const itemCount = !loading
    ? data.items.length
    : data.items.length + nextPageSize;

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          height={height}
          itemCount={itemCount}
          itemKey={itemKey}
          itemData={data}
          itemSize={100}
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
  const content =
    index < data.items.length ? (
      <AdvisorCard {...data.items[index]} />
    ) : (
      <AdvisorCard.Loading />
    );

  return <div style={style}>{content}</div>;
}

function itemKey(index: number, data: any) {
  const item = data.items[index];

  return item?.id || `loading.${index}`;
}
