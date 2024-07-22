import React from "react";
import {useState, useEffect} from "react";
import './Board.css'
import circle_icon from "../../assets/circle.png"
import cross_icon from "../../assets/cross.png"

const Board = ({rowNum, reset}) =>
{
    const [board, setBoard] = useState(Array(rowNum*rowNum).fill(null));
    const [isPlayerNext, setIsPlayerNext] = useState(true);
    const [gameOver, setGameOver] = useState(false);

    //for the reset button in the main page:
    useEffect(() => {
        if (reset) {
            setBoard(Array(rowNum * rowNum).fill(null));
            setIsPlayerNext(true);
            setGameOver(false);
        }
    }, [reset]);

    const handleClick = (index) => {
        // Ignore if the box is filled, game is over, or it's not the user's turn
        if (board[index] || gameOver || !isPlayerNext) return; 

        const newBoard = board.slice();
        newBoard[index] = 'X';
        setBoard(newBoard);
        setIsPlayerNext(!isPlayerNext);
    };

    const computerMove = () => {
        const emptyIndexes = board.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
        if (emptyIndexes.length > 0 && !gameOver) {
            const randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
            const newBoard = board.slice();
            newBoard[randomIndex] = 'O';
            setBoard(newBoard);
            setIsPlayerNext(true);
        }
    };

    useEffect(() => {
        if (!isPlayerNext && !gameOver) {
            const timeout = setTimeout(() => {
                computerMove();
            }, 1000);
            return () => clearTimeout(timeout);
        }
    }, [isPlayerNext, board, gameOver]);

    useEffect(() => {
        const winner = calculateWinner(board, rowNum);
        if (winner || board.every(box => box !== null)) {
            setGameOver(true);
        }
    }, [board, rowNum]);


    const renderSquare = (index) => (
        <div className="boxes" onClick={() => handleClick(index)} key={index}>
            {board[index] && (
                <img
                    src={board[index] === 'X' ? cross_icon : circle_icon}
                    alt={board[index]}
                />
            )}
        </div>
    );

    const renderBoard = () => {
        let squares = [];
        for (let i = 0; i < rowNum; i++) {
            let row = [];
            for (let j = 0; j < rowNum; j++) {
                row.push(renderSquare(i * rowNum + j));
            }
            squares.push(
                <div className="row" key={i}>
                    {row}
                </div>
            );
        }
        return squares;
    };

    return (
        <div className="board">
            {renderBoard()}
        </div>
    );
};

const calculateWinner = (board, size) => {
    const lines = [];

    // Rows and columns
    for (let i = 0; i < size; i++) {
        const row = [];
        const column = [];
        for (let j = 0; j < size; j++) {
            row.push(i * size + j);
            column.push(i + j * size);
        }
        lines.push(row);
        lines.push(column);
    }

    // Diagonals
    const diagonal1 = [];
    const diagonal2 = [];
    for (let i = 0; i < size; i++) {
        diagonal1.push(i * size + i);
        diagonal2.push(i * size + (size - i - 1));
    }
    lines.push(diagonal1);
    lines.push(diagonal2);

    for (let i = 0; i < lines.length; i++) {
        const [a, b, ...rest] = lines[i];
        if (board[a] && board[a] === board[b] && rest.every(index => board[index] === board[a])) {
            return board[a];
        }
    }

    return null;
};



export default Board;