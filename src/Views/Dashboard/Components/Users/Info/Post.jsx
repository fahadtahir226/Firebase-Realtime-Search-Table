import React from 'react';
import { useSelector } from 'react-redux';

const Post = props => {
  const post = useSelector(state => state.currentPost)
console.log(post)
  // let post = props.post;
  return (
    <div className='col s12 offset-m1 m10 l6 card ' style={{borderRadius: 10}}>
    <div className='container-fluid' >
       <div className='row' style={{padding: 20}} >
        <img className='col s3 m3 l3' src={post.post_src_full} alt='' />
        <div className='col s7 m6 l6' >
          {/* <h5 style={{color: 'green'}}>{post.u_ig_username}</h5>
          <h6>{post.u_ig_fullname}</h6>
          <p>{post.u_email}</p> */}
          {/* .toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') */}
          <table>
            <tbody>
              <tr style={{paddingTop: 0, paddingBottom: 0, borderBottom: 'none'}}>
                {/* <th style={{color: 'green', paddingTop: 0, paddingBottom: 0}}>{post.post_like_count}</th> */}
                {/* <th style={{color: 'green', paddingTop: 0, paddingBottom: 0}}>{post.post_com_count}</th> */}
                {/* <th style={{color: 'green', paddingTop: 0, paddingBottom: 0}}>{new Date(post.post_timestamp.seconds * 1000).toLocaleDateString()}</th> */}
              </tr>
              <tr style={{paddingTop: 0, paddingBottom: 0, borderBottom: 'none'}}>
                <td style={{fontSize: 10, color: 'lightgrey', paddingTop: 0, paddingBottom: 0}}>Likes</td>
                <td style={{fontSize: 10, color: 'lightgrey', paddingTop: 0, paddingBottom: 0}}>Comments</td>
                <td style={{fontSize: 10, color: 'lightgrey', paddingTop: 0, paddingBottom: 0}}>Date Posted</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className='row'  style={{paddingLeft: 20, paddingRight: 20}}>
        {/* <p>{post.post_caption_accessibility}</p> */}
      </div>
    </div>
  </div>
  );
};

export default Post;