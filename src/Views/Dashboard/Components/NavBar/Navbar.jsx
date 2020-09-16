import React from 'react';
import M from 'materialize-css'
import { useEffect } from 'react';
import logo from '../../../../Images/logo.png'

const Navbar = () => {
  useEffect(() => {
    var el = document.querySelectorAll('.tabs');
    M.Tabs.init(el);

  });
  return (
    <div>
       <nav className='z-depth-0' >
        <div className="nav-wrapper white" style={{marginBottom: 0,}}>
          <a href="#!" className="brand-logo hide-on-med-and-down black-text">KINASH</a>
          <ul id="nav" className="tabs tabs-transparent" style={{height: 64}}>
            <li style={{ height: 64 }} className="tab right"><a href="#transactions" className="active" style={{paddingTop: 10, color: 'black', background: 'white'}} >Transactions</a></li>
            <li style={{ height: 64 }} className="tab right"><a href="#users"  style={{paddingTop: 10, color: 'black', background: 'white'}} >Users</a></li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;