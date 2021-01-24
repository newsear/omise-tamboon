import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card } from './components/card';

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

const API_URL = 'http://localhost:3001';

const App = () => {
  const [charities, setCharities] = useState([]);
  const [currentDisplayOverlayId, setCurrentDisplayOverlayId] = useState();
  const [totalDonation, setTotalDonation] = useState(0);
  const [infoMessage, setInfoMessage] = useState();

  useEffect(() => {
    if (infoMessage) {
      const timer = setTimeout(() => {
        setInfoMessage(undefined);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [infoMessage]);

  useEffect(() => {
    fetchCharities();
    fetchPayments();
  }, []);

  const fetchCharities = () => {
    fetch(`${API_URL}/charities`)
      .then((resp) => resp.json())
      .then((charities) => setCharities(charities));
  };

  const fetchPayments = () => {
    fetch(`${API_URL}/payments`)
      .then((resp) => resp.json())
      .then((payments) => {
        const totalDonation = payments.reduce(
          (totalDonation, payment) => (totalDonation += payment.amount),
          0
        );
        setTotalDonation(totalDonation);
      });
  };

  const handlePay = async (charityId, payAmount) => {
    await fetch(`${API_URL}/payments`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: `{ "charitiesId": ${charityId}, "amount": ${payAmount}, "currency": "THB" }`,
    });
    fetchPayments();
    setInfoMessage('Thank you for your donation');
  };

  return (
    <div>
      <HeaderText>Tamboon React</HeaderText>
      <ParagraphText>All donations: {totalDonation}</ParagraphText>
      <ParagraphText>{infoMessage}</ParagraphText>
      <CardContainer>
        {charities.map((charity) => (
          <Card
            displayOverlay={charity.id === currentDisplayOverlayId}
            id={charity.id}
            imageName={charity.image}
            key={charity.id}
            onSubmit={(payAmount) => handlePay(charity.id, payAmount)}
            setDisplayOverlay={setCurrentDisplayOverlayId}
            title={charity.name}
          />
        ))}
      </CardContainer>
    </div>
  );
};

export default App;
