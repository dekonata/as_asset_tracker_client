import React from 'react';
import { useSelector } from 'react-redux';

import ViewEditField from '../ViewEditField/ViewEditField';
import AssetList from '../AssetList/AssetList';
import LocationAccessoryList from '../LocationAccessoryList/LocationAccessoryList';

import { useGetOneStaffQuery, useEditStaffMutation } from '../../api/apiStaffSlice'






const StaffCard = () => {
	const staffId = useSelector(state => state.staff.staffId);

	const {data: staffMember, isSuccess, refetch} = useGetOneStaffQuery(staffId);
	const [editStaff] = useEditStaffMutation();

	const handleEdit = async (data_field, editvalue) => {
		const editData = {
			staff_id: staffMember.staff_id,
			payload: {
				[data_field]: editvalue
			}
		};

		try {
			const edit = await editStaff(editData).unwrap();
				refetch();
				alert(edit);
		} catch(err) {
			console.log(err);
		}
	}

	return(
       <div className=''>
            {!isSuccess
                ?
                    <h1>LOADINNG</h1>
                : 
                    <div>
                        <h3 className="bb">Staff Details</h3>
                        <div>
                            <span className="dib w4 pr5 mv2">Staff ID:</span><span>{(staffMember?.parsed_id)}</span>
                        </div>
                        <ViewEditField
                            input_type='text'
                            asset_type={'staff'}
                            serial={staffMember?.staff_id}
                            label= 'Firstname:'
                            value={staffMember?.firstname}
                            data_field='firstname'
                            handleEdit={handleEdit}
                            />
                        <ViewEditField
                            input_type='text'
                            asset_type={'staff'}
                            serial={staffMember?.staff_id}
                            label= 'Lastname:'
                            value={staffMember?.lastname}
                            data_field='lastname'
                            handleEdit={handleEdit}
                            />
                        <h3 className="bb">Assets</h3> 
                        <AssetList
                        	asset_list={staffMember?.assets}
                        />
                        <h3 className="bb">Accessories</h3>                     
                        <LocationAccessoryList
                        	accessory_list={staffMember?.acc}
                        />                                                         
                    </div>

            }      
		</div>
	);
}

export default StaffCard