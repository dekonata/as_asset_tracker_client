import{ useState } from 'react';
import { useSelector } from 'react-redux';

import SuggestBox from '../components/SuggestBox/SuggestBox';
import StaffCard from '../components/StaffCard/StaffCard'
import AssetList from '../components/AssetList/AssetList'

const ViewEditLocation = () => {
	const location_list = useSelector(state => state.suggestlists.locationlists.locations)


	const [staffID, setStaffID] = useState('')

	return (
		<div className="">
			<SuggestBox 
				label="Search by ID:"
				suggestlist={location_list}
				handleInputChange={(id) => setStaffID(id)}
			/>
			<SuggestBox 
				label="Search by Name:"
				suggestlist={location_list}
				handleInputChange={(name) => setStaffID(name)}
			/>
			<SuggestBox 
				label="Search by Surname:"
				suggestlist={location_list}
				handleInputChange={(surname) => setStaffID(surname)}
			/>
			<h2 className="bb">Staff Member Details</h2>
		{staffID && 
			<div>
				<StaffCard
					staff_id={'id1'}
					firstname={'Ben'}
					lastname={'Jeramy Johnson van Helburger'}
				/>
				<AssetList
					asset_list={[
						{
						serial_number: 'Z100', 
						asset_type: 'Mini Mandela Micromin', 
						make:'Lenovo', 
						model:"X4000000000000000000000 0000000000000000000000000"
						},
						{
						serial_number: 'Z100', 
						asset_type: 'Mini Mandela Micromin', 
						make:'Lenovo smart LKED', 
						model:"X400"
						},

					]}
				/>
			</div>
		}
		</div>
	);
}

export default ViewEditLocation;


