import React, {memo} from "react";
import {Link} from "react-router-dom";
import styled from 'styled-components';
import logoSVG from '../assets/blog.svg';
import addSVG from '../assets/addButton.svg';

const NavBar = styled.div`
  background: black;
  padding: 5vh 5vw;
  max-width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: center
`

const Logo = styled.img`
  height: 13vh;
  justify-self: start;
`

const BlogName = styled.p`
  color: #f89029;
  font-size: 3rem;
  font-weight: bold;
  margin: 0 auto 0 0;
  justify-self: start;
  padding-left: 1rem;
  font-family: 'Montserrat', sans-serif;
`

const NewPostButton = styled.button`
  background: #f89029;
  justify-self: end;
  width: 23rem;
  font-size: 2rem;
  border:none;
  padding: 0.5rem 1rem;
  margin: 0;
  border-radius: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'Montserrat', sans-serif;
  :hover{
    opacity:0.8
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
  }
`;

const PlusIcon = styled.img`
height: 2rem
`

const Header = () => {

  return (
    <>
      <NavBar>

        <StyledLink to={`/`}>
          <Logo src={logoSVG}/>
        </StyledLink>

        <BlogName>SIMPLE BLOG APP</BlogName>

        <StyledLink to={`/new`}>
          <NewPostButton>
            Create a new post
            <PlusIcon src={addSVG}/>
          </NewPostButton>
        </StyledLink>

      </NavBar>
    </>
  );
};

export default memo(Header);