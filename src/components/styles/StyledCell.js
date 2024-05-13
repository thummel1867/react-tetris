import styled from 'styled-components'

export const StyledCell = styled.div`
    width: auto;
    background: rgba(${props => props.color}, 0.8);
    border: ${props => (props.type === 0 ? '0px solid' : '4px solid')};
    border-bottom-color: rgpa(${props => props.color}, 0.1);
    border-right-color: rgpa(${props => props.color},   1);
    border-top-color: rgpa(${props => props.color}, 1);
    border-lef-color: rgpa(${props => props.color}, 0.3);

`