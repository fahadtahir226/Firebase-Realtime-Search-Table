import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { newCurrentPostInfo } from '../../../../../Actions/index'

const PostList = props => {
  const dispatch = useDispatch()
  const posts = useSelector(state => state.currentPost.posts)
  console.log(posts)

  // let posts = props.postList;
  return (
    <div className='col s12 m12 l12 card ' style={{borderRadius: 10, maxHeight: '100%', overflow: 'scroll'}}>
      <div className='container-fluid' >
        <div className='row' style={{padding: 20}} >
          <table style={{
            // tableLayout: "fixed",
            // width: '100%',
          }}
          className='highlight'>
            <tbody>
            <tr>
              <th>Image</th>
              <th>Date</th>
              <th>Likes</th>
              <th>Comments</th>
              <th>Caption</th>
            </tr>
            {(posts !== 0 && posts !== undefined && posts !== null) ? posts.map((post, i) => {
              console.log(post);
              return <tr key={i} style={{paddingTop: 5, paddingBottom: 5}} onClick={() => dispatch(newCurrentPostInfo(post))} >
                <td><img alt='' style={{width: '100%'}} src={post.post_src_thumb} /></td>
                <td>{new Date(post.post_timestamp.seconds * 1000).toLocaleDateString()}</td>
                <td>{post.post_like_count.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                <td>{post.post_com_count.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                <td colSpan={6}>{post.post_caption_user}</td>
              </tr>}
            )
            : "No Post Data Available Yet"}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PostList;