import{ useState } from 'react';
import { useSelector } from 'react-redux';

import SuggestBox from '../components/SuggestBox/SuggestBox';
import StorageCard from '../components/StorageCard/StorageCard'

const ViewEditLocation = () => {
	const location_list = useSelector(state => state.suggestlists.locationlists.locations)


	const [locationID, setLocationID] = useState('')

	const onLocationSelect = (location) => {
		const location_id = location.split(' ')[0]
   		setLocationID(location_id)
   	}

	return (
		<div>
			<SuggestBox 
				label="Search Locations:"
				suggestlist={location_list}
				handleInputChange={onLocationSelect}
			/>
		{locationID && 
			<div>
				<StorageCard
					asset_id={'id1'}
					asset_type={'storage'}
				/>
			</div>}
		</div>
	);
}

export default ViewEditLocation;


