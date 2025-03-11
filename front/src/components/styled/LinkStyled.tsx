import { Link } from "react-router-dom"
import routes from "../../utils/routes.ts"
import React from "react"
import styled from "styled-components"


const LinkStyles  = styled.a`
text-decoration: 0;
font-size: 2rem;
font-family: Roboto;
color: rgba(0, 0, 0, 0.87);
padding: .5rem 1rem;
border: 1px solid rgba(0, 0, 0, 0.87);
border-radius: 10px;
margin-top: 10px;
display: block;
width: max-content
`
const LinkStyled= ()=>{
    return <LinkStyles href={routes.user.applications}>Мои ссылки</LinkStyles>
}

export default LinkStyled