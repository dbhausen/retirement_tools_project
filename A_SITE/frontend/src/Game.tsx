/* eslint-disable react/jsx-handler-names */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import Button from '@mui/material/Button'

import { Box } from '@mui/material'
import { CoupleContext } from 'CoupleContext'

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
	]
	for (let i = 0; i < lines.length; i += 1) {
		const [a, b, c] = lines[i]
		if (
			squares[a] !== '' &&
			squares[a] === squares[b] &&
			squares[a] === squares[c]
		) {
			return squares[a]
		}
	}
	return ''
}

interface ISquare {
	onClick: () => void
	value: string
}

const Square = (props: ISquare) => {
	const { onClick, value } = props
	return (
		<Button variant='contained' className='square' onClick={onClick}>
			{value}
		</Button>
	)
}

interface IBoardProps {
	// eslint-disable-next-line no-unused-vars
	onClick: (i: number) => void
	squares: string[]
}

const Board = (props: IBoardProps) => {
	const { onClick, squares } = props
	const renderSquare = (i: number) => (
		<Square value={squares[i]} onClick={() => onClick(i)} />
	)
	return (
		<div>
			<div className='board-row'>
				{renderSquare(0)}
				{renderSquare(1)}
				{renderSquare(2)}
			</div>
			<div className='board-row'>
				{renderSquare(3)}
				{renderSquare(4)}
				{renderSquare(5)}
			</div>
			<div className='board-row'>
				{renderSquare(6)}
				{renderSquare(7)}
				{renderSquare(8)}
			</div>
		</div>
	)
}
type THistory = Array<{
	squares: Array<string>
	player: string
	winner: string | null
}>

export default function Game() {
	const { couple } = useContext(CoupleContext)
	const [history, setHistory] = useState<THistory>([
		{ squares: Array(9).fill(''), player: 'X', winner: null },
	])
	const [stepNumber, setStepNumber] = useState<number>(0)

	const jumpTo = (step: number): void => {
		setStepNumber(step)
	}

	const handleClick = (i: number) => {
		const newHistory = history.slice(0, stepNumber + 1)
		const currentPlay = newHistory[stepNumber]
		if (!currentPlay) {
			throw new Error('Unexpexted no current play.')
		}
		const currentSquares = currentPlay.squares.slice()
		const currentPlayer = currentPlay.player
		const currentWinner = currentPlay.winner

		if (currentSquares[i] === '' && !currentWinner) {
			currentSquares[i] = currentPlayer
			const newWinner = calculateWinner(currentSquares)
			const newPlayer = currentPlayer === 'X' ? 'O' : 'X'

			newHistory.push({
				squares: currentSquares,
				player: newPlayer,
				winner: newWinner,
			})

			setHistory(newHistory)
			setStepNumber(stepNumber + 1)
		}
	}

	const moves = history.map((step: any, move: number) => {
		let desc = move ? `Go to back to move #${move}` : 'Go back to game start'
		if (move === stepNumber) {
			desc = `At move #${move}`
		}
		if (move === stepNumber && move === 0) {
			desc = 'At start of game'
		}

		return (
			// eslint-disable-next-line react/no-array-index-key
			<li key={move}>
				{move !== stepNumber && (
					<Button variant='contained' onClick={() => jumpTo(move)}>
						{desc}
					</Button>
				)}
				{move === stepNumber && (
					<Button variant='contained' disabled>
						{desc}
					</Button>
				)}
			</li>
		)
	})

	const newHistory = history.slice(0, stepNumber + 1)

	const currentPlay = newHistory[stepNumber]
	if (!currentPlay) {
		throw new Error('Unexpexted no current play.')
	}
	const currentSquares = currentPlay.squares.slice()
	const currentPlayer = currentPlay.player
	const currentWinner = currentPlay.winner
	const status = currentWinner
		? `Winner: ${currentWinner}`
		: `Next player: ${currentPlayer}`

	return (
		<Box sx={{ marginTop: '70px' }}>
			<div className='game-board'>
				<Board
					squares={currentSquares}
					onClick={(i: number) => handleClick(i)}
				/>
			</div>
			<div className='game-info'>
				<div>{status}</div>
				<ol>{moves}</ol>
			</div>
		</Box>
	)
}
