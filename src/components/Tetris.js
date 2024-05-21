import React, { useState, useEffect } from "react";
import { createStage, checkCollision } from "../gameHelpers";
import { StlyedTetris, StyledTetrisWrapper } from "./styles/StyledTetris";
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { useInterval } from "../hooks/useInterval";
import { useGameStatus } from "../hooks/useGameStatus";
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";
import PauseButton from "./PauseButton"; 

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [prevDropTime, setPrevDropTime] = useState(null); 
    const [gameOver, setGameOver] = useState(false);
    const [isPaused, setIsPaused] = useState(false); 

    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer); 
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

    const movePlayer = dir => {
        if(!checkCollision(player, stage, {x: dir, y: 0})) {
        updatePlayerPos({x:dir, y: 0});
        }
    }

    const startGame = () => {
        setStage(createStage());
        resetPlayer();
        setGameOver(false);
        setDropTime(1000);
        setScore(0);
        setRows(0);
        setLevel(0);
    }

    const drop = () => {
        if(rows > (level + 1) * 10) {
            setLevel(prev => prev + 1);
            setDropTime(1000 / (level + 1) + 300);
        }
        if(!checkCollision(player, stage, {x: 0, y: 1})){
        updatePlayerPos({x: 0, y: 1, collided: false});
    }   else {
        if (player.pos.y <1) {
            console.log("Game Over!");
            setGameOver(true);
            setDropTime(null);
        }
        updatePlayerPos({x:0, y:0, collided: true});
    }
}

    const dropPlayer = () => {
        drop();
        setDropTime(null);
    }

    const keyUp = ({ keyCode }) => {
        if (!gameOver && !isPaused) {
            if (keyCode === 40) {
                setDropTime(1000 / (level + 1) + 300);
            }
        }
    }

    useInterval(() => {
        drop();
    }, dropTime);

    const move = ({ keyCode }) => {
        if(!gameOver && !isPaused) {
            if(keyCode === 37) {
               movePlayer(-1); 
            } else if (keyCode === 39) {
                movePlayer(1);
            } else if (keyCode === 40) {
                dropPlayer();
            } else if (keyCode === 38) {
                playerRotate(stage, 1);
            }
        }
    }

    const togglePause = () => {
        if (isPaused) {
            setDropTime(prevDropTime);
            setIsPaused(false);
        } else {
            setPrevDropTime(dropTime);
            setDropTime(null);
            setIsPaused(true);
        }
    };

    return (
        <StyledTetrisWrapper role='button' tabIndex='0' onKeyDown={e => move(e)} onKeyUp={keyUp}>
            <StlyedTetris>
            <Stage stage={stage}/>
            <aside>
                {gameOver ? (
                    <Display gameOver= {gameOver} text = 'Game Over' />
                ) : (
                <div>
                <Display text = {`Score: ${score}`}/>
                <Display text = {`Rows: ${rows}`} />
                <Display text = {`Level: ${level}`} />
                </div>
                   )}
                <StartButton callback={startGame}/>
                {!gameOver && dropTime !== null && (
                        <PauseButton isPaused={isPaused} onTogglePause={togglePause} />
                    )}
                </aside>
                </StlyedTetris>
                </StyledTetrisWrapper>
            )
        }

export default Tetris;
