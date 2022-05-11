import React from 'react';
import './App.css';
import { useSelector } from 'react-redux';
import Navibar from '../components/Navibar/Navibar';
import Add from './Add';
import ViewEdit from './ViewEdit';
import Reports from '../pages/Reports';
import { 
  add_option, 
  movement_type_list } from '../data/selectionLists';



function App() {
  const route = useSelector(state => state.route.value)

  const returnRoute = () => {
    switch(route) {
        case 'add':
            return (
              <Add 
                  add_list={add_option} 
                />
            );
        case 'view_edit':
            return (
                <ViewEdit 
                    movement_type_list={movement_type_list}
                />
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
        <Navibar />
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
