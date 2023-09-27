import React, { useState } from "react";
import "../css/Feedback.css";
import styled from "styled-components";

const InfoP = styled.p`
  color: #fff;
  border: 5px solid ${(props) => (props.bgcolor ? props.bgcolor : `#ffd1dc`)};
  border-radius: 10px;
  max-width: 50%;
  margin: 2rem auto;
  padding: 1rem;
`;

const InfoSmall = styled.span`
  font-size: 0.8rem;
  display: inline-block;
`;

const Info = (props) => {
  return (
    <div className="info">
      <InfoP bgcolor={props.bgcolor}>
        {props.text}
        <InfoSmall>{props.smallText}</InfoSmall>
      </InfoP>
    </div>
  );
};

export default Info;
