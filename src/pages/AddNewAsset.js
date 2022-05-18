import React, { useState} from 'react';
import SuggestBox from '../components/SuggestBox/SuggestBox';
import TextInput from '../components/TextInput/TextInput';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { 
	useAddAssetMutation,
	useGetAssetListsQuery,
	 } 
	 from '../api/apiAssetSlice';

const ASSET_TYPES = ['Laptop', 'Monitor', 'Modem', 'Cellphone' , 'PC', 'Tablet', 'Misc']

const AddNewAsset = () => {
	const [transfer_date, setTransferDate] = useState(new Date());
	const [asset_type, setAssetType] = useState('');
	const [make, setMake] = useState('');
	const [model, setModel] = useState('');
	const [asset_condition, setCondition] = useState('');
	const [serialnumber, setSerialNumber] = useState('');
	const [imei, setImei] = useState('');
	const [description, setDescription] = useState('')

	const {data: assetlists, isSuccess} = useGetAssetListsQuery();
	const [addAsset] = useAddAssetMutation();

	const onSubmitAddNewAsset = async (event) => {
		event.preventDefault()

		const postData = {
			asset_type: asset_type.toLowerCase(),
			asset: {
				serialnumber,
				make,
				model,
				asset_condition,
			},
			transfer_date,
		}

		// add imei to post data if modem of cellphone
		if(imei) {
			postData.asset.imei = imei
		}

		// add description for misc assets
		if(description) {
			postData.asset.description = description
		}

		await addAsset(postData).unwrap();
		if(addAsset.error) {
			alert('Could not add asset. Check Data');
		} else {
			alert('Asset added');
			setTransferDate('');
			setAssetType('');
			setMake('');
			setModel('');
			setCondition('');
			setSerialNumber('');
			setImei('');
			setDescription('');
		}
	}

	return (
		<div className="pt2">
			{!isSuccess
				 ? 
				 	<h1> LOADING </h1>
				 :
					<form>
						<div className="">
							<label className="dib w4 pr5 mv2"> Date Received: </label>
								<div className="dib">
									<DatePicker
										selected={transfer_date} 
										onChange={(date) => setTransferDate(date)} /><br/>
								</div>
						</div>
						<SuggestBox 
							label="Asset Type:"
							initial_input={asset_type}
							suggestlist={ASSET_TYPES} 
							addNewEnabled={true}
							handleInputChange={input_value => setAssetType(input_value.toLowerCase())}
							/>
						{(asset_type === 'misc') &&
							<TextInput
								label="Description"
								value={description}
								handleInputChange={event => setDescription(event.target.value)}
								/> 
							}
						<SuggestBox 
							label="Make:"
							initial_input={make} 
							suggestlist={assetlists[asset_type]?.makeList}
							addNewEnabled={true} 
							handleInputChange={input_value => setMake(input_value)}
							/>
						<SuggestBox 
							label="Model:"
							initial_input={model} 
							suggestlist={assetlists[asset_type]?.modelList} 
							addNewEnabled={true} 
							handleInputChange={input_value => setModel(input_value)}
							/>	
						<SuggestBox 
							label="Condition:"
							initial_input={asset_condition} 
							suggestlist={assetlists[asset_type]?.conditionList} 
							addNewEnabled={true} 
							handleInputChange={input_value => setCondition(input_value)}
							/>	
						<TextInput
							label="Serial Number:"
							value={serialnumber}
							handleInputChange={event => setSerialNumber(event.target.value)}
							/>
						{(asset_type === 'cellphone' || asset_type === 'modem') &&
							<TextInput
								label="IMEI"
								value={imei}
								handleInputChange={event => setImei(event.target.value)}
								/> 
							}
						{/*Conditionally render submit button only if fields specified have been filled*/}
						{ asset_type && transfer_date && make && model && serialnumber && asset_condition &&
							<input 
								type="submit" 
								value="Submit" 
								onClick={onSubmitAddNewAsset}
								/>
						}
						: <div></div>
					</form>
			}
		</div>
	)
} 

export default AddNewAsset