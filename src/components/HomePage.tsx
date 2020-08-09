import React, {useEffect, memo} from "react";
import styled from 'styled-components';
import {Link} from "react-router-dom";
import {useLocation} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {fetchAllPosts} from "../redux/postReducer/Actions";

const Background = styled.div`
  background: #f89029;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`

const Post = styled.div`
  background: transparent;
  width: 30%;
  height: 50vh;
  margin: 2rem;
  padding: 0 1rem 0 1rem;
  border-radius: 1rem;
  font-weight: bold;
  border: 1px solid black;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`

const Title = styled.p`
  border-bottom: 1px solid black;
  padding: 1rem;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
`

const Body = styled.p`
  padding: 1rem;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 7;
   -webkit-box-orient: vertical;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
    color:black;
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
          <Post key={post.id}>
            <StyledLink to={`/post/${post.id}`}>
              <Title>{post.title}</Title>
              <Body>{post.body}</Body>
            </StyledLink>

          </Post>
        )) : null}

      </Background>
    </>
  );
};

export default memo(HomePage);