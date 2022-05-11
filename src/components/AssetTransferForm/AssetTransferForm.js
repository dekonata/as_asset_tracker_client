import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import { parsedLocationId } from '../../utils/utils.js'

import SuggestBox from '../SuggestBox/SuggestBox';

import {useGetAllLocationsQuery} from '../../api/apiLocationsSlice';
import {useAddAssetTransferMutation} from '../../api/apiTransfersSlice';

const AssetTransferForm = ({asset_id, close_transfer}) => {
	const [locationListObj, setLocationListObj] = useState([]);
	const [transferTo, setTransferTo] = useState('');
	const [transferDate, setTransferDate] = useState(new Date());

	const {data: locations, isSuccess} = useGetAllLocationsQuery();

	const [addAssetTransfer] = useAddAssetTransferMutation()

	useEffect(() => {
		if(isSuccess && locations) {
			// object with parsed location id and location detail as keys and location_id used for submitting transfer as values
			const LocationSelectorListObj = {};

			locations.forEach(location => {
				const selectorValue = parsedLocationId(location.location_type_id, location.location_type) + ': ' + location.location_detail;
				const locationId = location.location_id
				LocationSelectorListObj[selectorValue] = locationId 
			})

			setLocationListObj(LocationSelectorListObj)
		}
	}, [isSuccess, locations])

	const onCaptureTransfer = async(event) => {
		event.preventDefault();

		const transferData = {
			asset_id: asset_id,
			location_id: locationListObj[transferTo],
			transfer_date: transferDate
		};

		try {
			const addTransfer = await addAssetTransfer(transferData);
			close_transfer()
			alert(addTransfer);
		} catch(err) {
			alert(err);
		}
	}

	return (
		<div>
			<form className='bg-light-silver'>
				<SuggestBox 
					label="Transfer To"
					suggestlist={Object.keys(locationListObj)}
					handleInputChange={selected => setTransferTo(selected)}
				/>
				<label className="dib w4 pr5 mv2"> Transfer Date: </label>
					<div className="dib">
						<DatePicker 
							selected={transferDate} 
							onChange={(date) => setTransferDate(date)} /><br/>
					</div>
				<input
					className="db"
					type='submit'
					value='Capture'
					onClick={onCaptureTransfer}
				/>
			</form>	
		</div>
	)
}

export default AssetTransferForm;