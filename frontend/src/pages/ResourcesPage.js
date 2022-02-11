import React from "react";
import styled from "styled-components";
import Owl from "../images/Untitled.jpg";

import { Header } from "../components/Header";

export const ResourcesPage = () => {
  return (
    <>
      <Header />
      <ContentDiv>
        <h1>Resources</h1>

        <p>
          {" "}
          <ResourcesLink href="https://www.1177.se/liv--halsa/psykisk-halsa/att-soka-stod-och-hjalp/rad-och-stod-pa-chatt-och-telefon-vid-psykisk-ohalsa-och-beroende/">
            Different support options if you need to talk
          </ResourcesLink>
        </p>
        <p>
          {" "}
          <ResourcesLink href="https://anhorigasriksforbund.se/anhoriglinjen">
            Help for family and friends who need to talk
          </ResourcesLink>
        </p>
        <p>
          {" "}
          <ResourcesLink href="https://kbtterapi.se/kbt-ovningar/">
            CBT exercises
          </ResourcesLink>
        </p>
        <img src={Owl} alt="stupid mental health" />
      </ContentDiv>
    </>
  );
};

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
  width: 80%;
  font-size: 12px;
  color: #0047ab;
  margin: auto;
  padding: 12px;
  border-radius: 5px;
  width: 300px;
  height: fit-content;
`;

const ResourcesLink = styled.a`
  font-size: 16px;
  text-align: center;
  color: #0047ab;
  cursor: pointer;
  text-decoration: none;
`;
