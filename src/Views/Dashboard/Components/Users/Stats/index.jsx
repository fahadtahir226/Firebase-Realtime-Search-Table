import React, { useEffect, useState } from 'react';
import Graph from '../Graph/index'

const Stats = () => {
  const [firload, setFirLoad] = useState(true);
  const [secload, setSecLoad] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setFirLoad(false)
      setSecLoad(false)
    }, 700)
  }, []);

  const handleFirstChange = () => {
    setFirLoad(true);
    setTimeout(() => {
      setFirLoad(false)
    }, 700);
  }
  const handleSecondChange = () => {
    setSecLoad(true);
    setTimeout(() => {
      setSecLoad(false)
    }, 800);
  }
  return (
    <div className="col s12 m12 l5">
      <h6>Result Snapshots</h6>
      <div className="container-fluid" >
        <div className='row' id='recordResult'>
          <div className='col s12 m6 l6' style={{padding: 5}}>
            <div className='card' style={{borderRadius: 15}} >
              <div className='card-header' >  
                  <select onChange={handleFirstChange} >
                    <option value="1">Total Users</option>
                    <option value="2">Total Posts</option>
                    <option value="3">Total Status</option>
                  </select>

                  {firload ?
                  <div style={{textAlign: 'center', fontSize: 50}} >
                    <div className="preloader-wrapper medium active"  >
                      <div className="spinner-layer spinner-green-only">
                        <div className="circle-clipper left">
                          <div className="circle"></div>
                        </div><div className="gap-patch">
                          <div className="circle"></div>
                        </div><div className="circle-clipper right">
                          <div className="circle"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  :
                  <p style={{textAlign: "center", fontSize: 50, fontFamily: 'roboto'}} > 
                   {Math.floor(9000 * Math.random())}
                  </p>
                  }

              </div>
            </div>
          </div>
          <div className='col s12 m6 l6' style={{padding: 5}}>
            <div className='card' style={{borderRadius: 15}} >
              <div className='card-header'>  
                <select onChange={handleSecondChange} >
                  <option value="1">Average Email</option>
                  <option value="2">Average Posts</option>
                  <option value="3">Average Status</option>
                </select>
                {secload ?
                  <div style={{textAlign: 'center', fontSize: 50}} >
                    <div className="preloader-wrapper medium active"  >
                      <div className="spinner-layer spinner-green-only">
                        <div className="circle-clipper left">
                          <div className="circle"></div>
                        </div><div className="gap-patch">
                          <div className="circle"></div>
                        </div><div className="circle-clipper right">
                          <div className="circle"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                    :
                    <p style={{textAlign: "center", fontSize: 50, fontFamily: 'roboto'}} > 
                     {Math.floor(9000 * Math.random())}
                    </p>
                  }                
              </div>
            </div>
          </div>
        </div>
        <div className='row' >
          <div className='col s12 card' style={{borderRadius: 15}}>
          <Graph />
          </div>
        </div>

      </div>
    
    </div>
  );
};

export default Stats;