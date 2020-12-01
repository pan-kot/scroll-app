import { AxiosError } from 'axios';

import { useGetHealth } from '../../../api/api';

export type TRequest = TRequestLoading | TRequestError | TRequestLoaded;

type TRequestLoading = {
  loading: true;
  error: void;
  data: null;
};

type TRequestError = {
  loading: false;
  error: AxiosError<any>;
  data: null;
};

type TRequestLoaded = {
  loading: false;
  error: void;
  data: string;
};

export default function useHelath(): TRequest {
  const [{ loading, error, data }] = useGetHealth();

  const request = { loading, error, data };

  if (loading) {
    return request as TRequestLoading;
  }

  if (error) {
    return request as TRequestError;
  }

  return request as TRequestLoaded;
}
