import React, { useState } from 'react';

export const NumberSearch = props => {
  const [isbetween, setIsBetween] = useState(false);
  const [disable, setDisable] = useState(true);

  const handlechange = e => {
    e.preventDefault();
    if(e.target.value !== '-') setDisable(false);
    else setDisable(true);
    if(e.target.value === 'between') setIsBetween(true);
    else setIsBetween(false);
  }
  const options = [
    {
      name: 'Greater',
      value: '>'
    },
    {
      name: 'Less',
      value: '<'
    },
    {
      name: 'Equal',
      value: '=='
    },
    {
      name: 'Between',
      value: 'between'
    },
   ]

  return (
    // <>
        <div className="row" style={{marginBottom: 0}}>
          <div className="input-field col s4" style={{marginBottom: 0, padding: 0}}>
            <select id={props.id} onChange={handlechange} defaultValue='-' >
              <option value="-">-</option>
              {options.map((option, key) => <option key={key} value={option.value}>{option.name}</option>)}
            </select>
            <label>{props.label}</label>
          </div>
          {
            !isbetween ?
              <div className="input-field col s8" style={{marginBottom: 0}}>
                <input 
                  placeholder={disable ? "Select type first..." : "type here..."} 
                  disabled={disable} 
                  id={props.inputID} 
                  type="number" 
                  className="validate" />
                <label htmlFor={props.inputID}></label>
              </div>
              :
              <>
                <div className="input-field col s4" style={{marginBottom: 0}}>
                  <input placeholder="min" id={props.inputID + 'min'} type="number" className="validate" />
                  <label htmlFor={props.inputID}></label>
                </div>
                <div className="input-field col s4" style={{marginBottom: 0}}>
                  <input placeholder="max" id={props.inputID + 'max'} type="number" className="validate" />
                  <label htmlFor={props.inputID}></label>
                </div>
              </>
          }
        </div>
    // </>
  );
};