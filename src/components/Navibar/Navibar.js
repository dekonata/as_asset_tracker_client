import { useDispatch, useSelector } from 'react-redux';
import { setRoute, selectRoute } from './navibarSlice';

const Navibar = ({onRouteChange}) => {
	const dispatch = useDispatch();
	const route = useSelector(selectRoute);

	const onLogout = async (e) => {
		e.preventDefault()

		dispatch(setRoute('login'))
		try {
			const url = 'http://localhost:5000/logout/'

			const result = await fetch(url)
			console.log(result)
		} catch(err) {
			alert('There was an error')
			console.log(err)
		}
	}

	return (
		<nav className="pa2 pa2-ns mw1 mw6-ns center bb">
		    <h1 className="tc">
        		Albatros Asset Tracking
      		</h1>
		  <div className="pb1">
		    <p onClick={() => dispatch(setRoute('add'))} className={`link dim gray f6 f5-ns dib mr3 pointer ${route === 'add' ? 'b' : ''}`}>Add</p>
		    <p onClick={() => dispatch(setRoute('view_edit'))} className={`link dim gray f6 f5-ns dib mr3 pointer ${route === 'view_edit' ? 'b' : ''}`}>View/Edit</p>
		    <p onClick={() => dispatch(setRoute('reports'))} className={`link dim gray f6 f5-ns dib mr3 pointer ${route === 'reports' ? 'b' : ''}`}>Reports</p>
		    <p onClick={onLogout} className={'link dim gray f6 dib mr3 pointer fr'}> LOGOUT </p>
		  </div>
		</nav>
	);
}

export default Navibar