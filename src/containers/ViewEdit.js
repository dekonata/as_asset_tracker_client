import{ useState } from 'react';
import SuggestBox from '../components/SuggestBox/SuggestBox';
import ViewEditAsset from '../pages/ViewEditAsset';
import ViewEditStorage from '../pages/ViewEditStorage';
import ViewEditStaff from '../pages/ViewEditStaff';
import ViewAllAccessories from '../pages/ViewAllAccessories'




const ViewEdit= ({movement_type_list}) => {
	const [viewEditValue, setViewEditValue] = useState('');
	const [addList] = useState(['Asset', 'Location', 'Staff', 'Accessories']);

	const onViewEditSelect = (input_value) => {
		setViewEditValue(input_value);
	}

	const returnViewEditType = (view_edit_type) => {
		switch (view_edit_type){
			case "Asset":
				return (
					<ViewEditAsset
							movement_type_list={movement_type_list}
					/>
				);
			case "Location":
				return (
					<ViewEditStorage
						/>
				);
			case "Staff":
				return (
					<ViewEditStaff
					/>
				);
			case "Accessories":
				return (
					<ViewAllAccessories
					/>
				);				
			default:
				return <div></div>;
		}
	}


	return (
		<div>
			<form className="">
				<SuggestBox 
					label="View/Edit"
					handleInputChange={onViewEditSelect} 
					suggestlist={addList} />
			</form>
			{returnViewEditType(viewEditValue)}
		</div>
	);
}

export default ViewEdit