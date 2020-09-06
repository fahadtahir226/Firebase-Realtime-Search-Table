import React, { useState, useEffect } from 'react';
import M from 'materialize-css';

export const TextSearch = props => {
  const [type, setType] = useState('-');

  const handleChange = e => {
    e.preventDefault();
    setType(e.target.value);
  }
  const options = [
    // {
    //   name: 'Contains this',
    //   value: 'contain'
    // },
    {
      name: 'Exactly',
      value: '=='
    },
    // {
    //   name: 'Contains',
    //   value: 'in'
    // },
    {
      name: 'Any of these',
      value: 'in'
    },
    ]
    useEffect(() => {
      var elems = document.querySelectorAll('.chips');
      M.Chips.init(elems, {limit: 3});
    });

  return (
    <div className="row" style={{marginBottom: 0}}>
      <div className="input-field col s6 m4" style={{marginBottom: 0}}>
        <select id={props.id} onChange={handleChange} defaultValue={'-'} >
          <option value='-' >-</option>
          {options.map((option, key) => <option key={key} value={option.value}>{option.name}</option>)}
        </select>
        <label>{props.label}</label>
      </div>
      <div className="input-field col s6 m8" style={{marginBottom: 0, paddingLeft: 0}}>
        {type === '-' ?
          <input placeholder="Select type first..." id={props.inputID} disabled={true} type="text" className="validate" />
          :
        type === 'in' ?
          <div className="chips" id={props.inputID}  style={{margin: 0}} >
            <input className="custom-class" style={{width: '100% !important'}} placeholder="Add Upto 3" />
          </div>
          :
          <input placeholder="type here..." id={props.inputID} type="text" className="validate" />
        }

        <label htmlFor={props.inputID}></label>
      </div>
    </div>
  );
};