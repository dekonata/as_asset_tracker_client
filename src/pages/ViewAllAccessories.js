import React from 'react';
import { useDispatch ,useSelector } from 'react-redux';

import AccessoryList from '../components/AccessoryList/AccessoryList';
import AccessoryCard from '../components/AccessoryCard/AccessoryCard';
import AccessoryMovementTable from '../components/AccessoryMovementTable/AccessoryMovementTable.js';

import { setAccessory } from '../components/AccessoryCard/accessoryCardSlice';


const ViewAllAccessories = () => {
    const accId = useSelector(state => state.accessory.accId);

    const dispatch = useDispatch()

    const deleteMovement = () => {
        return
    }

    return(
        <div>
            {
                accId 
                ?  
                    <div>
                        <button
                            onClick={(() => dispatch(setAccessory('')))}
                             >BACK
                        </button>
                        <AccessoryCard/>
                    </div>
                :
                    <AccessoryList/>
            }
        </div>
    );
}

export default ViewAllAccessories;