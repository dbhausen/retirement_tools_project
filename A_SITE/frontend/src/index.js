import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const calculateWinner = (squares) => {
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

const Square = (props) => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
};

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    let status;

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(""), player: "X", winner: null }],
      stepNumber: 0,
    };
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
    });
  }

  handleClick(i) {
    const stepNumber = this.state.stepNumber;
    const newHistory = this.state.history.slice(0, stepNumber + 1);
    //the following line works
    //const currentSquares = [...newHistory.at(stepNumber).squares];
    //but the next line is easier to read.
    //Both lines result in a shallow clone of squares
    const currentSquares = newHistory.at(stepNumber).squares.slice();
    const currentPlayer = newHistory.at(stepNumber).player;
    const currentWiner = newHistory.at(stepNumber).winner;
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
    const currentSquares = [...this.state.history.at(stepNumber).squares];
    const player = this.state.history.at(stepNumber).player;
    const winner = this.state.history.at(stepNumber).winner;

    const moves = this.state.history.map((step, move) => {
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
            onClick={(i) => this.handleClick(i)}
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
