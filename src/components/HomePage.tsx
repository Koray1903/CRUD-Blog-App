import React, {useEffect, memo} from "react";
import styled from 'styled-components';
import {Link} from "react-router-dom";
import {useLocation} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {fetchAllPosts} from "../redux/postReducer/Actions";

import BlogImg from '../assets/blog.jpg';

const Background = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`

const PostDiv = styled.div`
  background-color: lightgray;
  width: 30%;
  height: 85vh;
  margin: 2rem;
  padding: 0 0.5rem 1rem 0.5rem;
  border-radius: 1rem;
  font-weight: bold;
  display:flex;
  flex-direction: column;
  justify-content: start;
  align-content: center;
`

const BlogImage = styled.img`
  margin-top: 1rem;
  border-radius: 1rem;
  width: 95%;
  align-self: center;
`

const Title = styled.p`
  border-bottom: 1px solid black;
  text-transform: uppercase;
  padding: 0.5rem 1rem 1rem 1rem;
  font-size: 1rem;
  font-family: 'Montserrat', sans-serif;
`

const Body = styled.p`
  margin: 0;
  padding: 1rem;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
    color:black;
  }
`

const ReadMore = styled.p`
  font-family: 'Montserrat', sans-serif;
  text-align: right;
  font-size: 1rem;
  :hover{
    opacity:0.8
  }
`

export interface RootState {
  postReducer: any
}

export interface Post {
  id: number,
  title: string,
  body: string
}

const HomePage = () => {

  const posts = useSelector((state: RootState) => state.postReducer.posts)

  const {pathname} = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPosts());
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Background>

        {posts ? posts.map((post: Post) => (
          <PostDiv key={post.id}>

            <BlogImage src={BlogImg}/>

            <Title>{post.title}</Title>

            <Body>{post.body}</Body>

            <StyledLink to={`/post/${post.id}`}>
              <ReadMore>Read more...</ReadMore>
            </StyledLink>

          </PostDiv>
        )) : null}

      </Background>
    </>
  );
};

export default memo(HomePage);