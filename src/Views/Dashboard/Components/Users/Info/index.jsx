import React from 'react';
import { useSelector } from 'react-redux';
import User from './User';
import Post from './Post';
import PostList from './PostList';

const Info = () => {
  const user = useSelector(state => state.currentUser)
  const post = useSelector(state => state.currentPost)
  const postList = user ? user.posts : null;
  console.log("User: ", user) 
  console.log("Post: ", post)
  console.log("Post List: ", user ? user.posts: "No user yet") 
  // console.log("Info Component: ", data);
  return (
    <>
      {user !== null ?
        <>
          <User user={user} />
          {
            post === null ? null :
            <Post post={post}/>
          }
          <PostList postList={postList} />
        </>
        : null
      }
    </>
  );
};

export default Info;