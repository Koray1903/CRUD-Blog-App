import React, {useEffect, memo} from "react";
import styled from 'styled-components';
import {Link} from "react-router-dom";
import {useLocation} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {fetchAllPosts} from "../redux/Actions";
import BlogImg from '../assets/blog.jpg';
import {iPost} from "../redux/Types";
import {RootState} from "../redux/rootReducer";


const BodyFlex = styled.div`
  width: 1300px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
`

const PostFlex = styled.div`
  background-color: lightgray;
  width: 450px;
  height: 550px;
  margin: 64px 0;
  padding: 16px;
  border-radius: 24px;
  font-weight: 600;
  display:flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  box-shadow: 8px 10px 19px 1px rgba(0,0,0,0.75);
`

const PostImage = styled.img`
  border-radius: 16px;
  width: 100%;
  align-self: center;
`

const PostTitle = styled.p`
  text-transform: uppercase;
  font-weight: 500;
  margin: 24px 16px 12px 16px;
  font-size: 22px;
  font-family: 'Montserrat', sans-serif;
  text-align: justify;
  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: clip;
  word-break: break-word;
  height: max-content;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`

const HorizontalLine = styled.div`
  height: 2px;
  width: 100%;
  background: black;
`

const PostBody = styled.p`
  margin: 12px 16px auto 16px;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  text-align: justify;
  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: clip;
  word-break: break-word;
  height: max-content;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`

const PostInnerFlex = styled.div`
  margin: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
    color:black;
  }
`

const PostDate = styled.span`
  font-family: 'Montserrat', sans-serif;
  text-align: left;
  font-weight: 500;
  letter-spacing: 1px;
  font-size: 16px;
  pointer-events: none;
  :hover { cursor: not-allowed}
`

const PostReadMore = styled.span`
  font-family: 'Montserrat', sans-serif;
  text-align: right;
  font-weight: 600;
  font-size: 16px;
  :hover{
    color: #f89029;
  }
`


const HomePage = () => {

    const posts = useSelector((state: RootState) => state.reducer.posts.sort(
        (a, b) => {
            if (a.created_at < b.created_at) return +1;
            if (a.created_at > b.created_at) return -1;
            return 0;
        }
    ))

    const {pathname} = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllPosts());
        window.scrollTo(0, 0);
    }, [pathname]);


    return (
        <>
            <BodyFlex>

                {posts ? posts.map((post: iPost) => (
                    <PostFlex key={post.postID}>

                        <PostImage src={BlogImg}/>

                        <PostTitle>{post.title}</PostTitle>

                        <HorizontalLine/>

                        <PostBody>{post.body}</PostBody>

                        <PostInnerFlex>
                            <PostDate>@ {post.created_at.toLocaleString()}</PostDate>

                            <StyledLink to={`/post/${post.postID}`}>
                                <PostReadMore>Read more...</PostReadMore>
                            </StyledLink>
                        </PostInnerFlex>

                    </PostFlex>
                )) : null}

            </BodyFlex>
        </>
    );
};

export default memo(HomePage);
