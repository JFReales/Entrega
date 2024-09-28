import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './assets/themes';
import GlobalStyles from './assets/GlobalStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import InvoiceList from './pages/InvoiceList/InvoiceList';
import ResetPassword from './pages/ResetPassword/ResetPassword';

function App() {
	const [theme, setTheme] = useState(() => {
		const savedTheme = localStorage.getItem('theme');
		return savedTheme ? savedTheme : 'light';
	});

	const toggleTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
		localStorage.setItem('theme', newTheme);
	};

	return (
		<ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
			<GlobalStyles />
			<div className='App'>
				<button
					onClick={toggleTheme}
					style={{
						border: 'none',
						background: 'none',
						cursor: 'pointer',
					}}
				>
					<FontAwesomeIcon
						icon={theme === 'light' ? faMoon : faSun}
						size='2x'
						color={theme === 'light' ? '#f39c12' : '#f1c40f'}
					/>
				</button>
				<Routes>
					<Route path='/' element={<Login />} />
					<Route
						path='/reset-password/:id'
						element={<ResetPassword />}
					/>
					<Route path='/register' element={<Register />} />
					<Route path='/invoices' element={<InvoiceList />} />
				</Routes>
			</div>
		</ThemeProvider>
	);
}

export default App;
