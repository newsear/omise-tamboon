import { useCallback, useState } from 'react';
import { Payment } from 'src/common/types';
import { HttpHookProps, httpClient } from 'src/helpers/axios';

export const useFetchPayments = ({ onCompleted }: HttpHookProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Payment[]>(undefined);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      const { data: payments } = await httpClient.request<Payment[]>({
        method: 'get',
        url: '/payments',
      });
      setData(payments);
    } catch {
      alert('Sorry, something went wrong, Please try again.');
    } finally {
      setLoading(false);
      onCompleted && onCompleted()
    }
  }, []);

  return [fetch, { loading, data }] as const;
};
