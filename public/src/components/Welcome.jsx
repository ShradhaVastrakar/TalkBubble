import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BiPowerOff } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Robot from "../assets/robot.gif";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";
export default function Welcome() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  useEffect(async () => {
    setUserName(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      ).username
    );
  }, []);

  const handleClick = async () => {
    const id = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    )._id;
    const data = await axios.get(`${logoutRoute}/${id}`);
    if (data.status === 200) {
      localStorage.clear();
      navigate("/login");
    }
  };
  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
      <button style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0.8rem",
        borderRadius: "0.5rem",
        backgroundColor: "#9a86f3",
        border: "none",
        cursor: "pointer",
        marginLeft: "95%",
        marginTop: "15%"
      }} onClick={handleClick}><BiPowerOff /></button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;

