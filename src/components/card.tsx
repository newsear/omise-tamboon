import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

type AmountProps = {
  checked: boolean;
  value: number;
  onSelect: () => void;
};

type CardProps = {
  displayOverlay: boolean;
  id: number;
  imageName: string;
  setDisplayOverlay: Function;
  title: string;
  onSubmit: (payAmount: number) => void;
};

const Container = styled.div`
  border-radius: 5px;
  height: 250px;
  overflow: hidden;
  position: relative;

  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const ImageContainer = styled.div`
  flex: 1;
  overflow: hidden;
`;

const Image = styled.img`
  height: fit-content;
  object-fit: cover;
  width: 100%;
`;

const Detail = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 17px;
`;

const Text = styled.span`
  color: dimgray;
`;

const Button = styled.div`
  border: 1.5px solid royalblue;
  border-radius: 5px;
  color: royalblue;
  cursor: pointer;
  padding: 4px 8px;
`;

const OverlayContainer = styled.div`
  background: rgba(255, 255, 255, 0.9);
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

const CloseButton = styled.div`
  align-items: center;
  color: dimgray;
  cursor: pointer;
  display: flex;
  height: 40px;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 0;
  width: 40px;
`;

const OverlayContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

const Column = styled.div`
  margin: 7.5px 0px;
`;

const Radio = styled.label`
  margin: 0px 5px;
`;

const defaultPayAmount = Number(process.env.DEFAULT_PAY_AMOUNT);

const amountValues = [10, 20, 50, 100, 200];

const AmountRadio = ({ checked, value, onSelect }: AmountProps) => {
  return (
    <Radio>
      <input type="radio" checked={checked} onChange={onSelect} />
      <Text>{value}</Text>
    </Radio>
  );
};

export const Card = ({
  displayOverlay,
  id,
  imageName,
  setDisplayOverlay,
  title,
  onSubmit,
}: CardProps) => {
  const [imageSrc, setImageSrc] = useState();
  const [payAmount, setPayAmount] = useState(defaultPayAmount);

  useEffect(() => {
    setPayAmount(defaultPayAmount);
  }, [displayOverlay]);

  useEffect(() => {
    import(`../assets/images/${imageName}`).then((image) => {
      console.log('image', image);
      setImageSrc(image.default);
    });
  }, []);

  const handleSubmit = () => {
    onSubmit(payAmount);
    setDisplayOverlay(undefined);
  };

  return (
    <Container>
      <Content>
        <ImageContainer>{imageSrc && <Image src={imageSrc} />}</ImageContainer>
        <Detail>
          <Text>{title}</Text>
          <Button onClick={() => setDisplayOverlay(id)}>Donate</Button>
        </Detail>
      </Content>
      {displayOverlay && (
        <OverlayContainer>
          <CloseButton onClick={() => setDisplayOverlay(undefined)}>X</CloseButton>
          <OverlayContent>
            <Column>
              <Text>Select the amount to donate (USD)</Text>
            </Column>
            <Column>
              {amountValues.map((amountValue, index) => (
                <AmountRadio
                  checked={payAmount === amountValue}
                  key={index}
                  value={amountValue}
                  onSelect={() => setPayAmount(amountValue)}
                />
              ))}
            </Column>
            <Column>
              <Button onClick={() => handleSubmit()}>Pay</Button>
            </Column>
          </OverlayContent>
        </OverlayContainer>
      )}
    </Container>
  );
};
