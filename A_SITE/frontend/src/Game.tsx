import React, { useState } from "react";
import Button from "@mui/material/Button";

import { Box } from "@mui/material";
import env from "./Env";

const calculateWinner = (squares: string[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      squares[a] !== "" &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return "";
};

interface ISquare {
  onClick: () => void;
  value: string;
}

const Square = (props: ISquare): JSX.Element => {
  return (
    <Button variant="contained" className="square" onClick={props.onClick}>
      {props.value}
    </Button>
  );
};

interface IBoardProps {
  onClick: (i: number) => void;
  squares: string[];
}

const Board = (props: IBoardProps): JSX.Element => {
  const renderSquare = (i: number) => {
    return <Square value={props.squares[i]} onClick={() => props.onClick(i)} />;
  };
  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};
type THistory = Array<{
  squares: Array<string>;
  player: string;
  winner: string | null;
}>;

const Game = (): JSX.Element => {
  const [history, setHistory] = useState<THistory>([
    { squares: Array(9).fill(""), player: "X", winner: null },
  ]);
  const [stepNumber, setStepNumber] = useState<number>(0);

  const jumpTo = (step: number): void => {
    setStepNumber(step);
  };

  const handleClick = (i: number) => {
    console.log(env().API_HOST);

    const newHistory = history.slice(0, stepNumber + 1);
    const currentPlay = newHistory[stepNumber];
    if (!currentPlay) {
      throw new Error("Unexpexted no current play.");
    }
    const currentSquares = currentPlay.squares.slice();
    const currentPlayer = currentPlay.player;
    const currentWinner = currentPlay.winner;

    if (currentSquares[i] === "" && !currentWinner) {
      currentSquares[i] = currentPlayer;
      const newWinner = calculateWinner(currentSquares);
      const newPlayer = currentPlayer === "X" ? "O" : "X";

      newHistory.push({
        squares: currentSquares,
        player: newPlayer,
        winner: newWinner,
      });

      setHistory(newHistory);
      setStepNumber(stepNumber + 1);
    }
  };

  const moves = history.map((step: any, move: number) => {
    let desc = move ? "Go to back to move #" + move : "Go back to game start";
    if (move === stepNumber) {
      desc = "At move #" + move;
    }
    if (move === stepNumber && move === 0) {
      desc = "At start of game";
    }

    return (
      <li key={move}>
        {move !== stepNumber && (
          <Button variant="contained" onClick={() => jumpTo(move)}>
            {desc}
          </Button>
        )}
        {move === stepNumber && (
          <Button variant="contained" disabled>
            {desc}
          </Button>
        )}
      </li>
    );
  });

  const newHistory = history.slice(0, stepNumber + 1);

  const currentPlay = newHistory[stepNumber];
  if (!currentPlay) {
    throw new Error("Unexpexted no current play.");
  }
  const currentSquares = currentPlay.squares.slice();
  const currentPlayer = currentPlay.player;
  const currentWinner = currentPlay.winner;
  const status = currentWinner
    ? "Winner: " + currentWinner
    : "Next player: " + currentPlayer;

  return (
    <Box sx={{ marginTop: "70px" }}>
      <div className="game-board">
        <Board
          squares={currentSquares}
          onClick={(i: number) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </Box>
  );
};

export default Game;
