import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ResetPassword = () => {
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const { id } = useParams();

	const navigate = useNavigate();

	const handleResetPassword = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setError('Las contraseñas no coinciden.');
			return;
		}

		try {
			const response = await axios.put(
				`http://localhost:5000/users/reset-password/${id}`,
				{
					password,
				}
			);
			if (response.data.success) {
				setSuccess(
					'Contraseña actualizada con éxito. Serás redirigido al login.'
				);
				setTimeout(() => {
					navigate('/');
				}, 3000);
			}
		} catch (error) {
			setError('Error al actualizar la contraseña. Inténtalo de nuevo.');
		}
	};

	return (
		<Container>
			<h1>Recuperar Contraseña</h1>
			{success && <SuccessMessage>{success}</SuccessMessage>}
			{error && <ErrorMessage>{error}</ErrorMessage>}
			<Form onSubmit={handleResetPassword}>
				<Input
					type='password'
					placeholder='Nueva Contraseña'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<Input
					type='password'
					placeholder='Confirmar Contraseña'
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					required
				/>
				<StyledButton type='submit'>Actualizar Contraseña</StyledButton>
			</Form>
		</Container>
	);
};

const Container = styled.div`
	width: 50%;
	margin: 0 auto;
	padding: 20px;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const Input = styled.input`
	padding: 10px;
	border: 1px solid #ddd;
	border-radius: 5px;
`;

const StyledButton = styled.button`
	padding: 10px;
	background-color: #2ecc71;
	border: none;
	color: white;
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

const SuccessMessage = styled.p`
	color: green;
	font-weight: bold;
`;

export default ResetPassword;
