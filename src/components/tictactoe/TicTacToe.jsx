import React from "react";
import { useState } from "react";
import './TicTacToe.css'
import ColorScheme from "../colorScheme/ColorScheme";
import Board from "../boardComponent/Board";

const TicTacToe = () =>
{
    const [reset, setReset] = useState(false);

    const handleReset = () => {
        setReset(true);
        setTimeout(() => setReset(false),50); 
    };

    return (
       <div className="container">
        <h1 className="title"> Simple Tic Tac Toe</h1>
        <div>
            <button className="reset" onClick={handleReset}> Reset </button>
            <ColorScheme/>
        </div>
        <br />
        <div className="board">
            <Board rowNum={3} reset={reset}> </Board>
        </div>
       </div>
    )
}

export default TicTacToe