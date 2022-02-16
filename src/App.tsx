import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Charity, Payment } from 'src/common/types';
import { Card } from 'src/components/card';
import { summaryDonations } from 'src/helpers/summary';
import { httpClient } from './helpers/axios';

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
  const [charities, setCharities] = useState<Charity[]>(undefined);
  const [totalDonation, setTotalDonation] = useState<Payment['amount']>(undefined);
  const [selectedCharityId, setSelectedCharityId] = useState<Charity['id']>(undefined);

  const fetchCharities = async () => {
    try {
      const { data: charities } = await httpClient.request<Charity[]>({
        method: 'get',
        url: '/charities',
      });
      setCharities(charities);
    } catch {
      alert('Sorry, something went wrong, Please try again.');
    }
  };

  const fetchPayments = async () => {
    try {
      const { data: payments } = await httpClient.request<Payment[]>({
        method: 'get',
        url: '/payments',
      });
      const totalDonation = summaryDonations(payments);
      setTotalDonation(totalDonation);
    } catch {
      alert('Sorry, something went wrong, Please try again.');
    }
  };

  const handlePay = async (charityId: number, payAmount: number) => {
    try {
      await httpClient.request({
        method: 'post',
        url: '/payments',
        data: {
          amount: payAmount,
          charitiesId: charityId,
          currency: 'THB',
        },
      });
      await fetchPayments();
      alert('Thank you for your donation');
    } catch {
      alert('Sorry, something went wrong, Please try again.');
    }
  };

  useEffect(() => {
    fetchCharities();
    fetchPayments();
  }, []);

  return (
    <Fragment>
      {charities && totalDonation ? (
        <div>
          <HeaderText>Tamboon React</HeaderText>
          <ParagraphText>All donations: {totalDonation}</ParagraphText>
          <CardContainer>
            {charities.map((charity, index) => (
              <Card
                displayOverlay={charity.id === selectedCharityId}
                id={charity.id}
                imageName={charity.image}
                key={index}
                setDisplayOverlay={setSelectedCharityId}
                title={charity.name}
                onSubmit={(payAmount) => handlePay(charity.id, payAmount)}
              />
            ))}
          </CardContainer>
        </div>
      ) : (
        <div>Loading..</div>
      )}
    </Fragment>
  );
};

export default App;
