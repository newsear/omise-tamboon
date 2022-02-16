import { useCallback, useState } from 'react';
import { Charity, Payment } from 'src/common/types';
import { HttpHookProps, httpClient } from 'src/helpers/axios';

export const usePayCharity = ({ onBeforeComplete }: HttpHookProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(undefined);

  const fetch = useCallback(async (charityId: Charity['id'], amount: Payment['amount']) => {
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
      onBeforeComplete && onBeforeComplete();
    } catch {
      setIsSuccess(false);
      alert('Sorry, something went wrong, Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  return [fetch, { loading, isSuccess }] as const;
};
