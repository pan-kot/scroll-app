import { AxiosError } from 'axios';
import { useState, useMemo } from 'react';

import {
  TAdvisorsResponse,
  TSortByReviews,
  useGetAvilableLanguages,
  useGetAdvisors,
} from '../../api';

export type TAdvisors = {
  settings: {
    page: number;
    setPage(page: number): void;
    sortByReviews: null | TSortByReviews;
    setSortByReviews(sort: null | TSortByReviews): void;
    isOnline: null | true;
    setIsOnline(isOnline: null | true): void;
    language: null | string;
    setLanguage(language: null | string): void;
  };
  loading: boolean;
  error?: null | AxiosError;
  availableLanguages: string[];
  data: TAdvisorsResponse;
  canLoadMore: boolean;
  loadMore: () => void;
};

export default function useAdvisors(): TAdvisors {
  const [page, setPage] = useState(0);
  const [sortByReviews, setSortByReviews] = useState<TSortByReviews | null>(
    'desc'
  );
  const [isOnline, setIsOnline] = useState<true | null>(true);
  const [language, setLanguage] = useState<string | null>(null);

  const request = useMemo(
    () => ({
      page,
      sortByReviews,
      isOnline,
      language,
    }),
    [page, sortByReviews, isOnline, language]
  );

  const languagesRequest = useGetAvilableLanguages();
  const advisorsRequest = useGetAdvisors(request);

  const loading = advisorsRequest.loading;
  const error = languagesRequest.error || advisorsRequest.error;

  const availableLanguages = languagesRequest.data || [];
  const data = advisorsRequest.data;

  const { canLoadMore, loadMore } = advisorsRequest;

  return {
    settings: {
      page,
      setPage,
      sortByReviews,
      setSortByReviews,
      isOnline,
      setIsOnline,
      language,
      setLanguage,
    },
    loading,
    error,
    availableLanguages,
    data,
    canLoadMore,
    loadMore,
  };
}
