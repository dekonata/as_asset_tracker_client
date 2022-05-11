import React from 'react'

const AssetList = ({ asset_list }) => {
	return(
		<div className="pa2 ba">
			<div className="overflow-auto">
				<h3 className="ma0">Assets</h3>
			    <table className="f7 w-100 mw8 center" cellSpacing="0">
				    <thead>
				      	<tr className="stripe-dark">
				      	 	<th className="tl pa2 bg-white">Serialnumber</th>
				      	 	<th className="tl pa2 bg-white">Type</th>
				      	 	<th className="tl pa2 bg-white">Make</th>
				     		<th className="tl pa2 bg-white">Model</th>
			      	 	</tr>
			      	</thead>
			      	<tbody className="lh-copy">		
	    				{asset_list.map((asset,i) => {
							return (
								<tr 
									className="stripe-dark" 
									key={'movement ' + i}
									onClick={event => console.log(asset)}>
										<td className="pa1">{asset.serial_number}</td>
										<td className="pa1">{asset.asset_type}</td>									
										<td className="pa1">{asset.make}</td>
										<td className="pa1">{asset.model}</td>
{/*										<td 
											className="fw6 bold link dim  pointer pr2"
											onClick={() => deleteMovement(movement.stock_movement_id)}
											>x</td>*/}
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default AssetList;