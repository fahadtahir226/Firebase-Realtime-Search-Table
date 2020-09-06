import React from 'react';
// import { auth } from '../../../../../Firebase/auth'
// import { db } from '../../../../../Firebase/firestore';
// import M from 'materialize-css'

const QueryForm = () => {

// useEffect(() => {
//   var elems = document.querySelectorAll('select');
//   M.FormSelect.init(elems);
//   auth.onAuthStateChanged(user => {
//     if(user){
//       console.log(user);
//     }
//   })
// });
// const handleEmail = event => {
//   event.preventDefault();
//   db.collection('users').where('u_email', '==', document.getElementById('emailfield').value).get()
//   .then(res => {console.log(res); alert('response recieved')})
// }
// const textOptions = ['contains this', 'Is this', 'contains', 'Is one of'],
//       numberOptions = ['Greater', 'less', 'equal', 'between']
  return (
    <div className="col s12 m6 l6">
      {/* <form class="col s12 m6 l6">
        <div class="row" style={{marginBottom: 0}}>
          <div class="input-field col s5">
            <select>
              <option value="" selected>Contains</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </select>
            <label>Search Type</label>
          </div>
          <div class="input-field col s7">
            <input placeholder="type here" id="searchtype" type="text" class="validate" />
            <label htmlFor="searchtype"></label>
          </div>
        </div>
        <div class="row" style={{marginBottom: 0}}>
          <div class="input-field col s5">
            <select>
              <option value="" selected>Contains</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </select>
            <label>Query Search</label>
          </div>

          <div class="input-field col s7">
            <input placeholder="type here..." id="qsearch" type="text" class="validate" />
            <label htmlFor="qsearch"></label>
          </div>
        </div>

        <div class="row" style={{marginBottom: 0}}>
          <div class="input-field col s5">
            <select>
              <option value="" selected>Contains</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </select>
            <label>City Name</label>
          </div>
          <div class="input-field col s7">
            <input placeholder="type here..." id="city" type="text" class="validate" />
            <label htmlFor="city"></label>
          </div>
        </div>

        <div class="row" style={{marginBottom: 0}}>
        <div class="input-field col s5">
            <select>
              <option value="" selected>Contains</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </select>
            <label>Country Name</label>
          </div>
          <div class="input-field col s7">
            <input placeholder="type here..." id="country" type="text" class="validate" />
            <label htmlFor="country"></label>
          </div>
        </div>

      </form>
        <div className='row'>
          <div class="input-field col s12">
            <button className="btn teal accent-4 white-text" onClick={event => handleEmail(event)}> Search / Export</button>
          </div>
        </div> */}
    </div>
  );
};

// const InputSearch = props => {
//   return (
//         <div class="row" style={{marginBottom: 0}}>
//           <div class="input-field col s5" style={{marginBottom: 0}}>
//             <select>
//               <option value="-" selected>-</option>
//               {props.options.map((option, key) => <option key={key} value={option}>{option}</option>)}
//             </select>
//             <label>{props.label}</label>
//           </div>
//           <div class="input-field col s7" style={{marginBottom: 0}}>
//             <input placeholder="type here..." id={props.id} type="text" class="validate" />
//             <label htmlFor={props.id}></label>
//           </div>
//         </div>
//   );
// };

export default QueryForm;