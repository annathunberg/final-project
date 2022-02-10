import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { API_URL } from "../utils/Constants.js";
import { user } from "../reducers/user";
import { Header } from "../components/Header.js";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("signin");
  const [error, setError] = useState("");

  const accessToken = useSelector((store) => store.user.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  const onFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    };

    fetch(API_URL(mode), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId));
            dispatch(user.actions.setUsername(data.response.username));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setError(null));
          });
        } else {
          batch(() => {
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setUsername(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setError(data.response));
          });
          setError("Sorry, this is an invalid username or password");
        }
      });
  };

  return (
    <>
      <Header />

      <MainContainer>
        <BtnContainer>
          {mode === "signin" ? (
            <div className="sign-btn-container">
              <ActionTitle>Login to your account</ActionTitle>
            </div>
          ) : (
            <div className="sign-btn-container">
              <ActionTitle>Create your account</ActionTitle>
            </div>
          )}
        </BtnContainer>
        <FormContainer>
          <Form onSubmit={onFormSubmit}>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {mode === "signin" ? (
              <SubmitButton type="submit">Login</SubmitButton>
            ) : (
              <SubmitButton type="submit">Sign up</SubmitButton>
            )}

            {error !== "" && <ErrorText>{error}</ErrorText>}
          </Form>
        </FormContainer>

        {mode === "signin" ? (
          <SwitchPageLink onClick={() => setMode("signup")}>
            Need an account? Click here to sign up
          </SwitchPageLink>
        ) : (
          <SwitchPageLink onClick={() => setMode("signin")}>
            Already have an account? Click here to login
          </SwitchPageLink>
        )}
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto;
  background-color: #fafafa;
  border-radius: 5px;
  width: 300px;
  height: 400px;
  position: relative;
  /* border: 1px solid #0047ab; */

  @media (min-width: 700px) {
    width: 500px;
    height: 400px;
  }
`;

const BtnContainer = styled.div`
  margin-top: 10px;
`;

const FormContainer = styled.div`
  width: 80%;
  margin: 0;
  /* border: 1px solid yellow; */
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const SubmitButton = styled.button`
  width: 87%;
  margin-top: 10px;
  cursor: pointer;
  font-weight: 700;
  display: inline-block;
  background: #fce3e4;
  padding: 10px 10px;
  border-radius: 50px;
  color: #0047ab;
  text-decoration: none;
  text-transform: uppercase;
  border: 1px solid #0047ab;
  margin: 15px auto;
`;

const ActionTitle = styled.p`
  font-weight: 600;
  font-size: 16px;
  margin-top: 40px;
  margin-bottom: 10px;
  text-align: center;
  color: #0047ab;

  @media (min-width: 700px) {
    font-size: 24px;
  }
`;

const ErrorText = styled.p`
  font-weight: 700;
  font-size: 16px;
  margin: 10px 0;
  text-align: center;
`;

const SwitchPageLink = styled.a`
  position: absolute;
  bottom: 28px;
  font-size: 16px;
  text-align: center;
  color: #0047ab;
  cursor: pointer;
`;

const Label = styled.label`
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 5px;
  text-align: center;
  color: #0047ab;
  font-weight: 500;
`;

const Input = styled.input`
  margin: 2px auto;
  height: 25px;
  width: 80%;
  border-radius: 5px;
  border: 1px solid #d5dcf9;
  padding: 5px 12px;
`;
