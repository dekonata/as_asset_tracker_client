import React from 'react'
import { useSelector } from 'react-redux'
import ViewEditField from '../ViewEditField/ViewEditField'

const StaffCard = ({staff_id, firstname, lastname, update, setUpdate }) => {
	const { types, makes, models } = useSelector(state => state.suggestlists.stocklists)

	const handleEdit = async (data_field, editvalue) => {
		try {
		const url = 'http://localhost:3000/editstockitem';
		const config = {
			method: 'put',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				staff_id: staff_id,
				update_hash: {
				[data_field]: editvalue	
				}
			})
		};

		const response = await fetch(url, config);
		const json_response =  await response.json();
		setUpdate(update + 1)

		if(!response.ok) {
			throw new Error(json_response.code);
		} 


		} catch(err) {
			console.log(err);
			alert('There was a problem')
		}
	}

	return(
		<div className=''>
			<ViewEditField
				serial={staff_id}
				suggestlist={types}
				label= 'Staff ID: '
				value={staff_id}
				data_field='stock_type'
				handleEdit={handleEdit}
				/>
			<ViewEditField
				serial={staff_id}
				suggestlist={makes}
				label= 'First Name:'
				value={firstname}
				data_field='make'
				handleEdit={handleEdit}
				/>
			<ViewEditField
				serial={staff_id}
				suggestlist={models}
				label= 'Last Name:'
				value={lastname}
				data_field='model'
				handleEdit={handleEdit}
				/>
		</div>
	)
}

export default StaffCard