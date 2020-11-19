import React, {memo} from "react";
import {Link} from "react-router-dom";
import styled from 'styled-components';
import logoSVG from '../assets/blog.svg';


const HeaderBackground = styled.div`
  background: black;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center
`

const HeaderFlex = styled.div`
  background: black;
  width: 1300px;
  margin: 36px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: center
`

const HeaderLogo = styled.img`
  height: 96px;
  justify-self: start;
  :hover{
    opacity:0.8
  }
  :focus {
    outline: none;
  }
`

const HeaderName = styled.p`
  color: #f89029;
  font-size: 48px;
  font-weight: 700;
  margin: 0 auto 0 16px;
  justify-self: start;
  font-family: 'Montserrat', sans-serif;
`

const HeaderNewPostButton = styled.button`
  background: #f89029;
  width: 375px;
  font-size: 32px;
  font-weight: 600;
  border:none;
  padding: 8px 16px;
  border-radius: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'Montserrat', sans-serif;
  :hover{
    opacity:0.8
  }
  :focus {
    outline: none;
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
  }
`

const HeaderPlusIcon = styled.i`
  font-size: 32px;
  color: black;
`


const Header = () => {

    return (
        <HeaderBackground>

            <HeaderFlex>

                <StyledLink to={`/`}>
                    <HeaderLogo src={logoSVG}/>
                </StyledLink>

                <HeaderName>SIMPLE BLOG APP</HeaderName>

                <StyledLink to={`/new`}>
                    <HeaderNewPostButton>
                        Create a new post
                        <HeaderPlusIcon className="fas fa-plus"/>
                    </HeaderNewPostButton>
                </StyledLink>

            </HeaderFlex>

        </HeaderBackground>
    )
};

export default memo(Header);
