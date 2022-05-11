import React, { useState, useEffect } from 'react';

import SuggestBox from '../components/SuggestBox/SuggestBox';
import AssetCard from '../components/AssetCard/AssetCard';
import AssetMovementTable from '../components/AssetMovementTable/AssetMovementTable';


import { useGetAssetListsQuery}  from '../api/apiAssetSlice';

const ASSET_TYPES = ['Laptop', 'Monitor', 'Modem', 'Cellphone' , 'PC', 'Tablet', 'Misc']

const ViewEditAsset = ({movement_type_list}) => {
	const [assetType, setAssetType] = useState('');
	const [serialList, setSerialList] = useState([]);

	const [serial, setSerial] = useState('')

	// Increase update state +1 to rerun fetch and update values
	const [update, setUpdate] = useState(0)

	const {data: assetlists, isSuccess} = useGetAssetListsQuery();

	useEffect(() => {
		// set serial list based on asset type selected
		if(isSuccess && assetlists[assetType.toLowerCase()]) {
			const  { serialList } = assetlists[assetType.toLowerCase()]
			setSerialList(serialList)
		}

	}, [isSuccess, assetType, assetlists])



   	const deleteMovement = (movement_id) => {
		fetch('http://localhost:3000/delete_stockmovement', {
			method: 'delete',
			headers: {'Content-Type': 'application/json'},			
			body: JSON.stringify({
				'stock_movement_id': movement_id
				})
		})
		.then(response => response.json())
		.then(id => console.log(id))
		.then(() =>  setUpdate(update + 1))
		.catch(err => console.log(err))
	}

	return (
		<div>
			<form className="">
				<SuggestBox 
					label="Asset Type:"
					suggestlist={ASSET_TYPES}
					handleInputChange={input_value => setAssetType(input_value)}
				/>
				<SuggestBox 
					label="Search Serials:"
					suggestlist={serialList}
					handleInputChange={input_value => setSerial(input_value)}
				/>
			</form>
			{serial &&
				<div>
					<AssetCard
						serial_number={serial}
						// getStockItemDetails={getStockItemDetails}
						update={update}
						setUpdate={setUpdate}
					/>
					<AssetMovementTable
						serialnumber = {serial}
						deleteMovement={deleteMovement}
					/>
				</div>
			}
		</div>
	);
}

export default ViewEditAsset;



