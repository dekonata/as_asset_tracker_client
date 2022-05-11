import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { formatId } from '../../utils/utils.js'

import ViewEditField from '../ViewEditField/ViewEditField'
import AssetTransferForm from '../AssetTransferForm/AssetTransferForm'


import { 
	useGetOneAssetQuery,
	useEditAssetMutation
	 } 
	 from '../../api/apiAssetSlice';

const ID_PADDING = 2;

const AssetCard = ({serial_number, getStockItemDetails, update, setUpdate }) => {
	const [moveOpen, setMoveOpen] = useState(false);


	const {data:asset, isSuccess} = useGetOneAssetQuery(serial_number);
	const [editAsset] = useEditAssetMutation();

	const handleEdit = async (data_field, editvalue) => {
		const editData = {
			asset_type: asset.asset_type,
			serialnumber: serial_number,
			payload: {
				[data_field]: editvalue
			}
		}

		try {
			await editAsset(editData).unwrap();
		} catch(err) { 
			alert(err.data.detail);
		}
	}

	const closeTransfer = () => {
		setMoveOpen(false)
	}

	return(
		<div className=''>
			{!isSuccess
				?
					<h1>LOADINNG</h1>
				: 
					<div>
						<ViewEditField
							input_type='suggest'
							asset_type={asset.asset_type}
							serial={serial_number}
							suggestlist={'makeList'}
							label= 'Make:'
							value={asset.make}
							data_field='make'
							handleEdit={handleEdit}
							/>		
						<ViewEditField
							input_type='suggest'
							asset_type={asset.asset_type}
							serial={serial_number}
							suggestlist={'modelList'}
							label= 'Model:'
							value={asset.model}
							data_field='model'
							handleEdit={handleEdit}
							/>
						<ViewEditField
							input_type='suggest'
							asset_type={asset.asset_type}
							serial={serial_number}
							suggestlist={'conditionList'}
							label= 'Condition:'
							value={asset.asset_condition}
							data_field='model'
							handleEdit={handleEdit}
							/>
						<ViewEditField
							input_type='text'
							asset_type={asset.asset_type}
							serial={serial_number}
							label= 'Serial:'
							value={asset.serialnumber}
							data_field='serialnumber'
							handleEdit={handleEdit}
							/>
						<div>
							<span className="dib w4 pr5 mv2">Location:</span><span>{asset.location}</span>
						</div>
						{moveOpen 
						?	
							<AssetTransferForm
								asset_id={asset.asset_id}
								close_transfer={closeTransfer}
							/> 
						: 
							<button 
								onClick={() => setMoveOpen(true)}
								>Capure Stock Movement</button>
						}				
								</div>


						}
			
		</div>
	)
}

export default AssetCard;