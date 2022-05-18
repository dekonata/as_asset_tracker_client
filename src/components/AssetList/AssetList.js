import React from 'react'

const AssetList = ({ asset_list }) => {
	return(
		<div className="">
			{Array.isArray(asset_list) 
				? 
					<div className="overflow-auto">
					    <table className="f7 w-100 mw8 center" cellSpacing="0">
						    <thead>
						      	<tr className="stripe-dark">
						      	 	<th className="tl pa2 bg-white">Serialnumber</th>				      	
						      	 	<th className="tl pa2 bg-white">Type</th>
						      	 	<th className="tl pa2 bg-white">Model</th>
						     		<th className="tl pa2 bg-white">Transferred</th>
					      	 	</tr>
					      	</thead>
					      	<tbody className="lh-copy">		
			    				{asset_list.map((asset,i) => {
									return (
										<tr 
											className="stripe-dark" 
											key={'movement ' + i}
											onClick={event => console.log(asset)}>
												<td className="pa1">{asset.serialnumber}</td>								
												<td className="pa1">{asset.asset_type.toUpperCase()}</td>									
												<td className="pa1">{asset.model}</td>
												<td className="pa1">{asset.transfer_date}</td>																				
										</tr>
									)
								})}
							</tbody>
						</table>
					</div>
				:
					<div><h3> Incorrect Asset List Format</h3></div> 
			}
		</div>
	)
}

export default AssetList;