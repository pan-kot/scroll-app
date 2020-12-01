import useAxios from 'axios-hooks';

export function useGetHealth() {
  return useAxios({
    method: 'get',
    url: '/healthcheck',
  });
}
