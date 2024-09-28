import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleRegister = async (e) => {
		e.preventDefault();
		try {
			await axios.post('http://localhost:5000/users/register', {
				username,
				password,
				name,
				email,
			});

			navigate('/');
		} catch (error) {
			setError('Error al registrar el usuario');
		}
	};
	const handleGoToLogin = () => {
		navigate('/');
	};

	return (
		<StyledContainer>
			<h1>Registrarse</h1>
			<StyledForm onSubmit={handleRegister}>
				<StyledInput
					type='text'
					placeholder='Usuario'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
				<StyledInput
					type='password'
					placeholder='Contraseña'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<StyledInput
					type='text'
					placeholder='Nombre'
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
				/>
				<StyledInput
					type='email'
					placeholder='Email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				{error && <ErrorMessage>{error}</ErrorMessage>}
				<StyledButton type='submit'>Registrar</StyledButton>
				<StyledButton onClick={handleGoToLogin}>
					Regresar al login
				</StyledButton>
			</StyledForm>
		</StyledContainer>
	);
};

const StyledContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	margin: auto;
	padding: 3vh 4vw;
	box-sizing: border-box;
	gap: 1rem;
`;

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	width: 20rem;
	gap: 1rem;
`;

const StyledInput = styled.input`
	padding: 10px;
	border: 1px solid #ddd;
	border-radius: 5px;
`;

const StyledButton = styled.button`
	padding: 10px;
	background-color: #2ecc71;
	border: none;
	color: white;
	font-size: 16px;
	border-radius: 5px;
	cursor: pointer;

	&:hover {
		background-color: #27ae60;
	}
`;

const ErrorMessage = styled.p`
	color: red;
	font-weight: bold;
`;

export default Register;
