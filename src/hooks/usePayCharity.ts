import { useCallback, useState } from 'react';
import { HttpHookProps, httpClient } from 'src/helpers/axios';

export const usePayCharity = ({ onCompleted }: HttpHookProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(undefined);

  const fetch = useCallback(async (charityId: number, amount: number) => {
    try {
      setLoading(true);
      await httpClient.request({
        method: 'post',
        url: '/payments',
        data: {
          amount,
          charitiesId: charityId,
          currency: 'THB',
        },
      });
      setIsSuccess(true);
    } catch {
      setIsSuccess(false);
      alert('Sorry, something went wrong, Please try again.');
    } finally {
      setLoading(false);
      onCompleted && onCompleted();
    }
  }, []);

  return [fetch, { loading, isSuccess }] as const;
};
