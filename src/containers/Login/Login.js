import{ useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import logo from './albatros_logo.png'

import TextInput from '../../components/TextInput/TextInput';

import { setRoute } from '../../components/Navibar/navibarSlice';
import { setUser } from './loginSlice';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		const onEnter = (e) => {
			if (e.key === 'Enter') {
				onSubmitLogin()
			}		
		}
		
		document.body.addEventListener('keypress', onEnter);

		return () => {
			document.body.removeEventListener('keypress', onEnter)
		}
	})

	const dispatch = useDispatch();

	const onSubmitLogin = async (event) => {
		if(event) {
			event.preventDefault()
		}

		if(!email || !password) {
			return alert('pleaes enter username and password')
		}


		const loginData = {email, password};

		try {
			const url = 'http://localhost:5000/auth/local/'
			const config = {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(loginData)
			}

			const login = await fetch(url, config)

			if(login.status === 401) {
				alert('Incorrect username or Password')
				return
			} else if(!login.ok) {
				alert('There was a problem loggin in. Try again or contact sysadmin')
			} else if(login.status === 200 ){
				const user = await login.json()
				dispatch(setUser(user))
				dispatch(setRoute(''))
			} else {
				console.log('There was an problem logging in')
			}
		} catch (err) {
			console.log('Error:', err)
		}
		
	};


	return (
		<div>
			<div className="bg-black-20 pt2 pb2">
				<img src={logo} alt="LOGO" className="db center ma0"/>
			</div>
			<h2> Login </h2>
			<form className="">
				<TextInput 
					label="Email"
					handleInputChange={(event) => setEmail(event.target.value)} />
				<TextInput 
					label="Password"
					type="password"
					handleInputChange={(event) => setPassword(event.target.value)} />
			{ email && password &&
				<input 
					type="submit" 
					value="Submit" 
					onClick={onSubmitLogin}
					/>
			}
			</form>
		</div>
	);
};

export default Login;