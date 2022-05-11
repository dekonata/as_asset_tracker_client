import React, { useState, useMemo} from 'react';
import { useDispatch } from 'react-redux';

import { formatId } from '../utils/utils.js'

import { setRoute } from '../components/Navibar/navibarSlice';
import SuggestBox from '../components/SuggestBox/SuggestBox';
import TextInput from '../components/TextInput/TextInput';

import {
	useGetStaffListsQuery,
	useAddStaffMutation
} from '../api/apiStaffSlice'

const ID_CODE = 'STAFF';
const ID_PADDING = 2

const AddNewStorageLocation = () => {
	const [staffCodeId, setStaffCodeId] = useState('');
	const [firstname, setFirstName] = useState('');
	const [lastname, setLastName] = useState('');
	const {data: stafflists, isSuccess }  = useGetStaffListsQuery();

	const [addStaff] = useAddStaffMutation();

	const formattedIds = useMemo(() => {
		if(isSuccess) {
			return stafflists.unusedIds.map(id => formatId(id, ID_CODE , ID_PADDING))
		}
	}, [stafflists, isSuccess]);

	const dispatch = useDispatch();

	const onSubmitNewStaff = async (event) => {
		event.preventDefault()

		//Extract only number id from staff code
		const staff_id = staffCodeId.substring(ID_CODE.length);

		const postData = {
			staff_id,
			firstname,
			lastname
		}
		try {
			await addStaff(postData).unwrap();
			alert('Staff Added');
			dispatch(setRoute(''));
		} catch (err) {
			console.log(err)
			alert(err);
		}
	}

return (
	<div>	
		<form>
			<SuggestBox 
				label="Staff ID:"
				suggestlist= {isSuccess ? formattedIds : ['loading']}
				addNewEnabled={false}
				handleInputChange={(value) => setStaffCodeId(value)}
				/>
			<TextInput
				label="First Name:"
				value={firstname}
				handleInputChange={event => setFirstName(event.target.value)}
				/>
			<TextInput
				label="Last Name:"
				value={lastname}
				handleInputChange={event => setLastName(event.target.value)}
				/>
			{ staffCodeId  && firstname && lastname &&
				<input 
					type="submit" 
					value="Submit" 
					onClick={onSubmitNewStaff}
					/>
			}
		</form>
	</div>
	)	
}

export default AddNewStorageLocation;