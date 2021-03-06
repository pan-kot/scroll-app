import axios from 'axios';
import { useRef, useMemo, useState, useCallback, useEffect } from 'react';
import useAxios from 'axios-hooks';

import { removeNilProps } from '../util';

import { TAdvisorsRequest, TAdvisorsResponse } from './types';

export const PAGE_SIZE = 50;

export function useGetAdvisors(request: TAdvisorsRequest) {
  const cancelTokenSource = useRef(axios.CancelToken.source());

  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<TAdvisorsResponse>({ items: [], total: 0 });

  // When filters change drop everything to initial state and cancel ongoing request
  useEffect(() => {
    cancelTokenSource.current.cancel();

    setPage(0);
    setData((prev) => ({ ...prev, items: [] }));
  }, [request]);

  const params = useMemo(
    () =>
      removeNilProps({
        page,
        size: PAGE_SIZE,
        sort: request.sortByReviews
          ? ['feedback.reviews', request.sortByReviews].join(',')
          : null,
        isOnline: request.isOnline,
        language: request.language,
      }),
    [request, page]
  );

  useEffect(() => {
    setLoading(true);

    axios
      .get('/advisors', { params })
      .then((response) => {
        setData((prev) => ({
          total: response.data.total,
          items: prev.items.concat(response.data.items),
        }));

        setLoading(false);
      })
      .catch((thrown) => {
        if (!axios.isCancel(thrown)) {
          setError(thrown);
        }

        setLoading(false);
      });
  }, [params]);

  const canLoadMore =
    !loading && Boolean(data.total) && page * PAGE_SIZE < data.total;

  const loadMore = useCallback(() => {
    if (canLoadMore) {
      setPage((prev) => prev + 1);
    }
  }, [canLoadMore]);

  return { loading, error, data, canLoadMore, loadMore };
}

export function useGetAvilableLanguages() {
  const [state] = useAxios<string[]>({ url: '/languages' });

  return state;
}
