import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

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
  return null;
};

interface ISquare {
  onClick: () => void;
  value: string;
}

const Square = (props: ISquare) => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
};

interface IBoardProps {
  onClick: (i: number) => void;
  squares: string[];
}

const Board = (props: IBoardProps) => {
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

interface IGameState {
  history: { squares: string[]; player: string; winner: string | null }[];
  stepNumber: number;
}

class Game extends React.Component<any, IGameState> {
  constructor(props: any) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(""), player: "X", winner: null }],
      stepNumber: 0,
    };
  }

  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
    });
  }

  handleClick(i: number) {
    const stepNumber = this.state.stepNumber;
    const newHistory = this.state.history.slice(0, stepNumber + 1);
    const currentPlay = newHistory.at(stepNumber);
    if (!currentPlay) {
      console.error("No current play!");
      return;
    }
    const currentSquares = currentPlay.squares.slice();
    const currentPlayer = currentPlay.player;
    const currentWiner = currentPlay.winner;
    if (currentSquares[i] !== "" || currentWiner) {
      return;
    }

    currentSquares[i] = currentPlayer;
    const newWinner = calculateWinner(currentSquares);
    const newPlayer = currentPlayer === "X" ? "O" : "X";

    newHistory.push({
      squares: currentSquares,
      player: newPlayer,
      winner: newWinner,
    });
    this.setState({
      history: newHistory,
      stepNumber: stepNumber + 1,
    });
  }

  render() {
    const stepNumber = this.state.stepNumber;
    const currentPlay = this.state.history.at(stepNumber);
    if (!currentPlay) {
      console.error("No current play!");
      return;
    }

    const currentSquares = currentPlay.squares.slice();
    const player = currentPlay.player;
    const winner = currentPlay.winner;

    const moves = this.state.history.map((step: any, move: number) => {
      const desc = move ? "Go to move #" + move : "Go to game start";

      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + player;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={currentSquares}
            onClick={(i: number) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
