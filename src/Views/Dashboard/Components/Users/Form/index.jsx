import React, { useEffect } from 'react';
import { auth } from '../../../../../Firebase/auth'
import { db } from '../../../../../Firebase/firestore';
import M from 'materialize-css'
import { NumberSearch } from './NumberSearch'
import { TextSearch } from './TextSearch'
import { useDispatch } from 'react-redux'
import { replaceQuery } from '../../../../../Actions/index'

const QueryForm = () => {

useEffect(() => {
  var elems = document.querySelectorAll('select');
  M.FormSelect.init(elems);
  auth.onAuthStateChanged(user => {
    if(user){
      console.log(user);
    }
  })
});

const checkEmpty = id =>  document.getElementById(id).value === '-' ? false : true

const applyNumberFilter = (id, property, ref) => {
  let operation = document.getElementById(id).value;
  if(operation === 'between'){
    ref = document.getElementById(id + 'Inputmin').value ?
    ref.where(property, '>', parseInt(document.getElementById(id + 'Inputmin').value)): ref
    ref = document.getElementById(id + 'Inputmax').value ?
    ref.where(property, '<', parseInt(document.getElementById(id + 'Inputmax').value)): ref
  }
  else{
    ref = ref.where(property, operation, parseInt(document.getElementById(id + 'Input').value))
  }
  return ref
}

const applyTextFilter = (id, property, ref) => {
  let operation = document.getElementById(id).value;
  if(operation === 'in'){
    let chips = M.Chips.getInstance(document.getElementById(id + 'Input')).chipsData;
    if(chips.length === 0) return ref
    chips = chips.map(chip => chip.tag)
    return ref.where(property, operation , chips)
  }
  else if(operation === '=='){
    console.log("Text Search based on equal to");
    return document.getElementById(id + 'Input').value ? 
    ref.where(property, '==' , document.getElementById(id + 'Input').value) : ref
  }

}

const dispatch = useDispatch();
const handleSubmit = event => {
  event.preventDefault();
  let ref = db.collection('users')

  // Put filter on each Number field
  // applyFilter(Property Input ID, Property In Database, Ref to get updated)
  ref = checkEmpty('followersUser') ? applyNumberFilter('followersUser', 'u_ig_followers_count', ref): ref;
  ref = checkEmpty('followingUser') ? applyNumberFilter('followingUser', 'u_ig_following_count', ref): ref;
  ref = checkEmpty('mediaPostsUser') ? applyNumberFilter('mediaPostsUser', 'u_ig_media_count', ref): ref;

  // Putting filter on each text field which is possible by firebase
  // applyFilter(Property Input ID, Property In Database, Ref to get updated)
  ref = checkEmpty('bioUser') ? applyTextFilter('bioUser', 'u_ig_bio', ref): ref;
  ref = checkEmpty('emailUser') ? applyTextFilter('emailUser', 'u_email', ref): ref;
  // ref = checkEmpty('commentsUser') ? applyTextFilter('commentsUser', 'u_ig_username', ref): ref; there is no data for comments
  
  ref = checkEmpty('userUser') ? applyTextFilter('userUser', 'u_ig_username', ref): ref;
  ref = checkEmpty('categoryUser') ? applyTextFilter('categoryUser', 'u_ig_category', ref): ref;
  // ref = checkEmpty('accesabilityUser') ? applyTextFilter('accesabilityUser', 'u_ig_followers_count', ref): ref; not abviable 
  // ref = checkEmpty('locationUser') ? applyTextFilter('locationUser', 'u_ig_followers_count', ref): ref; discribe country/city/place/long-lat
  // ref = checkEmpty('postLocationUser') ? applyTextFilter('postLocationUser', 'u_ig_followers_count', ref): ref;


  ref.limit(parseInt(document.getElementById('userSearchLimit').value))
  .get()
  .then(res => {
    console.log("brigning result", res);
    let data = [];
    res.forEach(user => data.push(user.data()))
    // console.log(data);
    window.location.replace('#myUserTable')
    dispatch(replaceQuery(data))
  })
  .catch(err => console.log(err));
}
  return (
    <div className="col s12 m12 l7">
      <h6>Users Filters</h6>
      <form className="col s12 m12 l12">
        <TextSearch inputID='bioUserInput' id="bioUser" label='Bio' />
        <TextSearch inputID='emailUserInput' id="emailUser" label='Email Risk' />
        <TextSearch inputID='commentsUserInput' id="commentsUser" label='Post Commets' />
      </form>
      <form className="col s12 m6 l6">
        <TextSearch inputID='userUserInput' id="userUser" label='User Id' />
        <TextSearch inputID='categoryUserInput' id="categoryUser" label='Cateory' />
        <TextSearch inputID='accesabilityUserInput' id="accesabilityUser" label='Post Accesability' />
        <TextSearch inputID='locationUserInput' id="locationUser" label='User Location' />
        <TextSearch inputID='postLocationUserInput' id="postLocationUser" label='Post Location' />
      </form>
      <form className="col s12 m6 l6">
        <NumberSearch inputID='followersUserInput' id="followersUser" label='Followers' />
        <NumberSearch inputID='followingUserInput' id="followingUser" label='Following' />
        <NumberSearch inputID='mediaPostsUserInput' id="mediaPostsUser" label='Media Posts' />
        <input type='text' id="userSearchLimit" defaultValue='10' ></input>
        {/* <NumberSearch inputID='postLikesUserInput' id="postLikesUser" label='Post Likes' /> */}
        {/*<NumberSearch inputID='postCommentsUserInput' id="postCommentsUser" label='Post Comments' /> */}
      </form>

        <div className='row'>
          <div className="input-field col s12">
            <button className="btn teal accent-4 white-text" onClick={event => handleSubmit(event)}> Search / Export</button>
          </div>
        </div>
    </div>
  );
};






export default QueryForm;