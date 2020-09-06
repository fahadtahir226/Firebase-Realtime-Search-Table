import React from 'react';
import { useSelector } from 'react-redux';

const User = props => {
  const data = useSelector(state => state.currentUser)
  // let data = props.user;
  return (
    <div className='col s12 offset-m1 m10 l6 card ' style={{borderRadius: 10}}>
      {data ? 
      
    <div className='container-fluid' >
      <div className='row' style={{padding: 20}} >
        <img className='col s3 m3 l3 circle' src={data.u_ig_profile_scr_full} alt='' />
        <div className='col s7 m6 l6' >
          <h5 style={{color: 'green'}}>{data.u_ig_username}</h5>
          <h6>{data.u_ig_fullname}</h6>
          <p>{data.u_email}</p>
          <table>
            <tbody>
              <tr style={{paddingTop: 0, paddingBottom: 0, borderBottom: 'none'}}>
                <th style={{color: 'green', paddingTop: 0, paddingBottom: 0}}>{data.u_ig_followers_count.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</th>
                <th style={{color: 'green', paddingTop: 0, paddingBottom: 0}}>{data.u_ig_following_count.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</th>
                <th style={{color: 'green', paddingTop: 0, paddingBottom: 0}}>{data.u_ig_media_count.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</th>
              </tr>
              <tr style={{paddingTop: 0, paddingBottom: 0, borderBottom: 'none'}}>
                <td style={{fontSize: 10, color: 'lightgrey', paddingTop: 0, paddingBottom: 0}}>Followers</td>
                <td style={{fontSize: 10, color: 'lightgrey', paddingTop: 0, paddingBottom: 0}}>Following</td>
                <td style={{fontSize: 10, color: 'lightgrey', paddingTop: 0, paddingBottom: 0}}>Posts</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='col s2 m3 l3'>
          <a 
            className='btn hide-on-large-only right' 
            style={{borderRadius:'100%', padding: 0, marginRight: 5, marginBottom: 5}} 
            target='blank'
            href={"https://www.instagram.com/" + data.u_ig_username} >
            <i className='material-icons right' style={{margin: 0, width: 40, height: 40}}>person</i>
          </a>
          <a className='btn hide-on-med-and-down right' style={{marginBottom: 5, width: '100%', paddingRight: 5, paddingLeft: 5}} target='blank' href={"https://www.instagram.com/" + data.u_ig_username} >
            PROFILE
          </a>
          {
          data.u_ig_external_link > '' ?
            <>
              <a 
                className='btn hide-on-large-only right' 
                style={{borderRadius:'100%', padding: 0, marginRight: 5}} 
                target='blank' 
                href={data.u_ig_external_link} >
                <i className='material-icons right' style={{margin: 0, width: 40, height: 40}}>insert_link</i>
              </a>
              <a className='btn hide-on-med-and-down right' style={{width: '100%', paddingRight: 5, paddingLeft: 5}} target='blank' href={data.u_ig_external_link} >
                EXTERNAL
              </a>
            </>
            : null
          }
        </div>
      </div>
      <div className='row'  style={{paddingLeft: 20, paddingRight: 20}}>
        <p>{data.u_ig_bio}</p>
      </div>
    </div>
    : null}
  </div>
  );
};

export default User;