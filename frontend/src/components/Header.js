import React from "react";
import styled from "styled-components";

export const Header = () => {
  return (
    <HeaderDiv>
      <HeaderText>Mental Health Club </HeaderText>
    </HeaderDiv>
  );
};

const HeaderDiv = styled.div`
  margin: auto;
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  @media (min-width: 1100px) {
    width: 50%;
    margin: 30px auto;
  }
`;

const HeaderText = styled.h1`
  width: fit-content;
  color: #0047ab;
  font-family: "Londrina Shadow", cursive;
  letter-spacing: 4px;
  font-weight: 400;
  font-size: 34px;

  @media (min-width: 700px) {
    font-size: 50px;
  }
`;
