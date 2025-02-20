import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "nes.css/css/nes.min.css";
import styled from "styled-components";
import { labyrinth, generateStartInstructions } from "../reducers/game";
import ContinueGame from "./ContinueGame";
import StartGame from "./StartGame";

const Welcome = styled.div`
  margin-bottom: 20px;
  margin-left: 80px;

  @media (max-width: 768px) {
    margin-left: 20px;
  } ;
`;

const Message = styled.div`
  margin-left: 90px;
  color: black;
`;

const Section = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  width: 900px;

  @media (max-width: 768px) {
    width: 400px;
    height: 900px;
    margin-top: 20px;
  } ;
`;

const Container = styled.div`
  width: 700px;

  @media (max-width: 768px) {
    width: 300px;
    margin-top: 20px;
  } ;
`;

const InitiateGame = () => {
  //controlled input we need states:
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.labyrinth.game);
  const playerName = useSelector((state) => state.labyrinth.username);

  const isStartingGame = () => {
    return playerName && !gameState.coordinates;
  };

  const isContinuingGame = () => {
    return playerName && gameState.coordinates;
  };

  const setGame = () => {
    //dispatching an action that takes the inputValue to change username
    dispatch(labyrinth.actions.setPlayerName(inputValue));
    //dispathing thunk function
    dispatch(generateStartInstructions(playerName));
  };

  if (isStartingGame()) {
    return <StartGame />;
  } else if (isContinuingGame()) {
    return <ContinueGame />;
  }

  return (
    <Section className="nes-container is-dark">
      <Welcome>
        <section>
          <Message>
            <div className="ballon" class="nes-balloon from-left">
              Welcome to the labyrinth game
            </div>
          </Message>
          <i class="nes-ash"></i>
        </section>
      </Welcome>

      <Container className="nes-container is-dark with-title">
        <p className="title">Create player</p>
        <p>
          Type in your unique username<i class="snes-jp-logo"></i>
        </p>
        <input
          id="dark_field"
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          className="nes-input is-dark"
          placeholder="e.g. Hippoxx34"
        />
        <button type="button" className="nes-btn is-success" onClick={setGame}>
          Create Player
        </button>
      </Container>
    </Section>
  );
};

export default InitiateGame;
