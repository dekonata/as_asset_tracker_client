import React from 'react';
import './App.css';
import { useSelector } from 'react-redux';

import Login from '../containers/Login/Login'
import Navibar from '../components/Navibar/Navibar';
import Add from './Add';
import ViewEdit from './ViewEdit/ViewEdit';
import Reports from '../pages/Reports';


function App() {
  const route = useSelector(state => state.route.value)

  const returnRoute = () => {
    switch(route) {
        case "login": 
          return (
            <Login
              />
            );
        case 'add':
            return (
              <Add 
                />
            );
        case 'view_edit':
            return (
                <ViewEdit/>
            );
        case 'reports':
            return (
              <Reports/>
            );
        default:
            return(
                <div>CHOOSE</div>
            )
    }
  }

  return (
    <div>
      <div className="pa2 pa2-ns center-l center-ns mw6-ns bb relative">
        {route === "login"
          ?
            <h2> Albatros Asset Tracker Login </h2>
          :
            <Navibar />
        }
        <div className="pt2 ph1-ns mh1">
          { 
            returnRoute()
          }
        </div>
      </div>
    </div>


  );
}

export default App;
