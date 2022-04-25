import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  loginAuthenticated,
  loginError,
  loginLoading,
  loginSuccess,
} from "../Redux/Login/action";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

const MainDiv = styled.div``;
const H1 = styled.h1`
  text-align: center;
`;

const Nav = styled.div`
  .nav {
    border-bottom: 1px solid gray;
  }
`;
const Div = styled.div`
  width: 30%;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 25px;
  background-color: white;
  box-sizing: border-box;
  padding: 2%;
  border-radius: 8px;
  margin-top: 30px;
  margin-bottom: 19%;
  input {
    height: 33px;
    padding-left: 15px;
    outline: none;
    border: 1px solid #dddddd;
  }
  button {
    height: 38px;
    border: none;
    background-color: #a85cf9;
    color: white;
    font-size: 17px;
    :hover {
      opacity: 0.9;
    }
  }
`;

export const Login = () => {
  const [email, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = () => {
    const userDetails = {
      email,
      password,
    };

    dispatch(loginLoading());
    fetch(`https://pet-boarding-server.herokuapp.com/login`, {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch(loginSuccess({ token: res.token, roles: res.user.roles }));
        if (
          res.token != undefined &&
          (res.user.roles[0] === "users" || res.user.roles[1] === "users")
        ) {
          dispatch(loginAuthenticated("true"));
          navigate("/");
        } else {
          dispatch(loginAuthenticated("true"));
          navigate("/");
        }
      })
      .catch((error) => dispatch(loginError()));
  };

  return (
    <MainDiv>
      <Nav>
        <Navbar />
      </Nav>
      <H1>Login</H1>

      <Div>
        <input
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit
        </button>
      </Div>
      <Footer />
    </MainDiv>
  );
};