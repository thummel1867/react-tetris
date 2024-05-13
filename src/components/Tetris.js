import React from "react";

import { createStage } from "../gameHelpers";
import { StlyedTetris, StyledTetrisWrapper } from "./styles/StyledTetris";

import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";


const Tetris = () => {



    return (
        <StyledTetrisWrapper>
            <StlyedTetris>
            <Stage stage={createStage()}/>
            <aside>
                <div>
                <Display text = "Score" />
                <Display text = "Rows" />
                <Display text = "Level" />
                </div>
                <StartButton />
            </aside>
            </StlyedTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris;