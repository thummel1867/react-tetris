import styled from "styled-components";

import bgImage from '../../img/bg.png'
import spacePic from '../../img/space.jpg'


export const StyledTetrisWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background: url(${spacePic}) #000;
    background-size: cover;
    overflow: hidden;
`

export const StlyedTetris = styled.div`
    display: flex;
    align-tems: center;
    justify-content: center;
    padding: 40px;
    margin: 0 auto;
    max-width: 900px;

    aside {
        width: 100%;
        max-width: 200px;
        display: block;
        padding: 0 20px;
    }
`