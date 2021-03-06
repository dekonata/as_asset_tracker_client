import React from 'react'
import { useDispatch ,useSelector } from 'react-redux';

import ViewEditField from '../ViewEditField/ViewEditField'
import AssetList from '../AssetList/AssetList';
import LocationAccessoryList from '../LocationAccessoryList/LocationAccessoryList';

import { useGetOneLocationQuery } from '../../api/apiLocationsSlice'

const LocationCard = () => {
	const parsed_id = useSelector(state => state.locations.locationId);

	const {data:locationData, isSuccess, refetch} = useGetOneLocationQuery(parsed_id);

	return(
		<div className=''>
			{!isSuccess
				?
					<h1> LOADING </h1>
				:
					<div className="mb4">
                        <h3 className="bb">Locations Details</h3>
                        <div>
                            <span className="dib w4 pr5 mv2">Location ID:</span><span>{parsed_id}</span>
                        </div>
                        <div>
                            <span className="dib w4 pr5 mv2">Location Type:</span><span>{locationData?.location_type}</span>
                        </div>
                        <div>
                            <span className="dib w4 pr5 mv2">Location:</span><span>{locationData?.located}</span>
                        </div>                                                        
                        <h3 className="bb">Assets</h3> 
                        <AssetList
                        	asset_list={locationData?.assets}
                        />
                        <h3 className="bb">Accessories</h3>                     
                        <LocationAccessoryList
                        	accessory_list={locationData?.accessories}
                        />     						
					</div>
			}
		</div>
	)
}

export default LocationCard;