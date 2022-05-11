import React, { useState, useEffect } from 'react'

import SuggestBox from '../SuggestBox/SuggestBox';
import TextInput from '../TextInput/TextInput'

import { 
	useGetAssetListsQuery
	} from '../../api/apiAssetSlice';

const ViewEditField = ({input_type, asset_type, serial, suggestlist, label, value, data_field, handleEdit}) => {
	// Editable data fields on View/Edit page
	const [ editOpen, setEditOpen ] = useState(false);
	const [ editValue, setEditValue ] = useState(value);
	const [ suggestList, setSuggestList ] = useState([]);

	// Close edit if different stock item is selected
	useEffect(() => {
		setEditOpen(false)
	}, [serial])

	const {data: assetlists, isSuccess} = useGetAssetListsQuery();

	useEffect(() => {
		if(isSuccess && assetlists && assetlists[asset_type]) {
			setSuggestList(assetlists[asset_type][suggestlist])
			// setSuggestList(assetlists[asset_type][data_field])
		}
	}, [isSuccess, assetlists, asset_type, suggestlist])

	const onSubmitEdit = (event) => {
		event.preventDefault();
		if (!editValue) {
			alert(`Select a new ${label}  value.`);
		} else {
			handleEdit(data_field, editValue);
			setEditOpen(false);
		}
	}

	return(
		<div className=''>
		{ !editOpen 
			?
				<div>
					<span className="dib w4 pr5 mv2">{label}</span>
					<span className="dib w-40">{value}</span>
					<button className="link dim gray f6 f5-ns mr3 mv2 pointer" href=''
						onClick={() => setEditOpen(true)}>
							Edit
					</button>
				</div>
			: 
				input_type === 'suggest' 
					?
						<div>
							<form className="bg-light-silver">
								<SuggestBox 
									initial_input={value}
									label={label}
									suggestlist={suggestList} 
									addNewEnabled={true}
									handleInputChange={input_value => setEditValue(input_value)}
									/>
									<input
										className="mr2"
										type='submit'
										value='Submit Edit'
										id='test'
										onClick={event => onSubmitEdit(event)}
									/>
									<input
										type='submit'
										value='Cancel Edit'
										onClick={() => setEditOpen(false)}
									/>
							</form>
						</div>
					:
						<div>
							<form className="bg-light-silver">
									<TextInput
										label={label}
										value={editValue}
										handleInputChange={event => setEditValue(event.target.value)}
										/>
									<input
										className="mr2"
										type='submit'
										value='Submit Edit'
										id='test'
										onClick={event => onSubmitEdit(event)}
									/>
									<input
										type='submit'
										value='Cancel Edit'
										onClick={() => setEditOpen(false)}
									/>
							</form>
						</div>

			}
		</div>
	)
}

export default ViewEditField