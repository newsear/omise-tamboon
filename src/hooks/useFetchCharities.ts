import { useCallback, useState } from 'react';
import { Charity } from 'src/common/types';
import { HttpHookProps, httpClient } from 'src/helpers/axios';

export const useFetchCharities = ({ onBeforeComplete }: HttpHookProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Charity[]>(undefined);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      const { data: charities } = await httpClient.request<Charity[]>({
        method: 'get',
        url: '/charities',
      });
      setData(charities);
      onBeforeComplete && onBeforeComplete();
    } catch {
      alert('Sorry, something went wrong, Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  return [fetch, { loading, data }] as const;
};
