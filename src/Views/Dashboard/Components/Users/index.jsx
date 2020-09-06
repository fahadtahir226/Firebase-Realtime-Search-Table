import React from 'react';
import QueryForm from './Form/index'
import Stats from './Stats'
import QueryResults from './Result'
import Info from './Info'

const Users = () => {
  return (
    <div className="card" style={{padding: 10, borderRadius: 10}}>
      <div className='card-content'>
        <div className="container-fluid" >
          <div className='row'>
            <QueryForm/>
            <Stats />
          </div>
          <div className='row' >
            <QueryResults />
          </div>
          <div className='row' >
            <Info />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;