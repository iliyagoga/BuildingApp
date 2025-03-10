import { styled } from "styled-components"
import React from "react"
interface Props{
    variant:string;
}
const ButtonStyle = styled.button<Props>`
padding: 16px;
color: white;
background: #1976d2;
outline: 0;
border: ${({variant})=>(variant=='outlined'?'1px solid white': '1px solid #1976d2')};
border-bottom: 1px solid white;
border-radius:5px;
font-size: 1rem;
cursor: pointer;
`


 
const Button =({variant, children, onClick})=>{
return <ButtonStyle onClick={onClick} variant={variant}>{children}</ButtonStyle>
}


export default Button