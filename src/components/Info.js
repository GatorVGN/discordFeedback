import React from "react";
import "../css/Feedback.css";
import styled from "styled-components";

const InfoBox = styled.div`
  color: #fff;
  border: 5px solid ${(props) => (props.bgcolor ? props.bgcolor : `#ffd1dc`)};
  border-radius: 10px;
  max-width: 50%;
  margin: 2rem auto;
  padding: 1rem;
`;

const InfoText = styled.p`
  margin: 1rem 0 0;
`;

const InfoSmall = styled.span`
  font-size: 0.8rem;
  display: inline-block;
`;

const Info = (props) => {
  return (
    <div className="info">
      <InfoBox bgcolor={props.bgcolor}>
        <InfoText>{props.text}</InfoText>
        <InfoSmall>{props.smallText}</InfoSmall>
      </InfoBox>
    </div>
  );
};

export default Info;
