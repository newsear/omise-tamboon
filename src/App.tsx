import React, { Fragment, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Charity } from 'src/common/types';
import { Card } from 'src/components/card';
import { summaryDonations } from 'src/helpers/summary';
import { useFetchCharities } from 'src/hooks/useFetchCharities';
import { useFetchPayments } from 'src/hooks/useFetchPayments';
import { usePayCharity } from 'src/hooks/usePayCharity';

const HeaderText = styled.h1`
  text-align: center;
`;

const ParagraphText = styled.p`
  text-align: center;
`;

const CardContainer = styled.div`
  display: flex;

  @media (max-width: 1000px) {
    flex-direction: column;
    padding: 2.5% 20%;

    > * {
      flex: 0 0 80%;
      margin: 5%;
    }
  }

  @media (min-width: 1001px) {
    flex-wrap: wrap;
    margin: auto;
    max-width: 1000px;
    position: relative;

    > * {
      flex: 0 0 45%;
      margin: 2.5%;
    }
  }
`;

const App = () => {
  const [fetchCharities, { loading: fetchCharitiesLoading, data: charities }] = useFetchCharities({});
  const [fetchPayments, { loading: fetchPaymentsLoading, data: payments }] = useFetchPayments({});
  const [payToCharity] = usePayCharity({
    onBeforeComplete: () => handlePayToCharityCompleted(),
  });

  const [selectedCharityId, setSelectedCharityId] = useState<Charity['id']>(undefined);

  const totalDonation = useMemo(() => payments && summaryDonations(payments), [payments]);

  useEffect(() => {
    fetchCharities();
    fetchPayments();
  }, []);

  const handlePayToCharityCompleted = () => {
    fetchPayments();
    alert('Thank you for your donation');
  };

  return (
    <Fragment>
      {(!charities && fetchCharitiesLoading) || (!payments && fetchPaymentsLoading) ? (
        <div>Loading..</div>
      ) : (
        <div>
          <HeaderText>Tamboon React</HeaderText>
          <ParagraphText>All donations: {totalDonation}</ParagraphText>
          <CardContainer>
            {charities?.map((charity, index) => (
              <Card
                displayOverlay={charity.id === selectedCharityId}
                id={charity.id}
                imageName={charity.image}
                key={index}
                setDisplayOverlay={setSelectedCharityId}
                title={charity.name}
                onSubmit={(payAmount) => payToCharity(charity.id, payAmount)}
              />
            ))}
          </CardContainer>
        </div>
      )}
    </Fragment>
  );
};

export default App;
