import React from 'react';
import QueryForm from './QueryForm/index'


const Queries = () => {
  return (
    <div className="card" style={{padding: 10, borderRadius: 10}}>
      <span className="card-title">Queries Filter</span>
      <div className='card-content'>
        <div className="container-fluid" >
          <div className='row'>
              <QueryForm/>
            <div className="col s12 m6 l6">General Data</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Queries;