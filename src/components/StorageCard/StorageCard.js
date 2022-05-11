import React from 'react'
import ViewEditField from '../ViewEditField/ViewEditField'

const StorageCard = ({asset_id, asset_type, location_type }) => {

	return(
		<div className=''>
			<ViewEditField
				serial={asset_id}
				suggestlist={'test'}
				label= 'Asset ID: '
				value={asset_id}
				data_field='stock_type'
				/>
			<ViewEditField
				serial={asset_id}
				suggestlist={'test'}
				label= 'Asset Type: '
				value={asset_type}
				data_field='stock_type'
				/>
		</div>
	)
}

export default StorageCard