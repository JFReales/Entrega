/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';

const Login = () => {
	const [usernameOrEmail, setUsernameOrEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [welcomeMessage, setWelcomeMessage] = useState('');

	const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);
	const [isRecoveryModalOpen, setIsRecoveryModalOpen] = useState(false);

	const navigate = useNavigate();

	const openWelcomeModal = () => {
		setIsWelcomeModalOpen(true);
	};
	const closeWelcomeModal = () => {
		setIsWelcomeModalOpen(false);
	};

	const openRecoveryModal = () => {
		setIsRecoveryModalOpen(true);
	};
	const closeRecoveryModal = () => {
		setIsRecoveryModalOpen(false);
		setUsernameOrEmail('');
		setError('');
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				'http://localhost:5000/users/login',
				{
					usernameOrEmail,
					password,
				}
			);

			localStorage.setItem('user', JSON.stringify(response.data.user));

			setWelcomeMessage(`Bienvenido, ${response.data.user.name}!`);
			openWelcomeModal();

			setTimeout(() => {
				closeWelcomeModal();
				navigate('/invoices');
			}, 3000);
		} catch (error) {
			setError('Error al iniciar sesión. Verifica tus credenciales.');
		}
	};

	const handlePasswordResetRequest = async () => {
		try {
			const response = await axios.post(
				'http://localhost:5000/users/recovery',
				{
					usernameOrEmail,
				}
			);
			if (response.data.success) {
				closeRecoveryModal();
				navigate(`/reset-password/${response.data.userId}`);
			} else {
				setError('Usuario o email no encontrado.');
			}
		} catch (error) {
			setError('Error al enviar la solicitud');
		}
	};

	return (
		<StyledContainer>
			<h1>Iniciar Sesión</h1>
			<StyledForm onSubmit={handleLogin}>
				<StyledInput
					type='text'
					placeholder='Usuario o email'
					value={usernameOrEmail}
					onChange={(e) => setUsernameOrEmail(e.target.value)}
					required
				/>
				<StyledInput
					type='password'
					placeholder='Contraseña'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				{error && <ErrorMessage>{error}</ErrorMessage>}
				<StyledButton type='submit'>Iniciar Sesión</StyledButton>
				<StyledLink onClick={openRecoveryModal}>
					¿Olvidaste tu contraseña?
				</StyledLink>
				<StyledLink onClick={() => navigate('/register')}>
					Registrarse
				</StyledLink>
			</StyledForm>

			<StyledModal
				isOpen={isWelcomeModalOpen}
				onRequestClose={closeWelcomeModal}
				contentLabel='Mensaje de Bienvenida'
			>
				<ModalTitle>{welcomeMessage}</ModalTitle>
			</StyledModal>

			<StyledModal
				isOpen={isRecoveryModalOpen}
				onRequestClose={closeRecoveryModal}
				contentLabel='Recuperar Contraseña'
				ariaHideApp={false}
			>
				<ModalTitle>Recuperar Contraseña</ModalTitle>
				<StyledInput
					type='text'
					placeholder='Introduce tu usuario o email'
					value={usernameOrEmail}
					onChange={(e) => setUsernameOrEmail(e.target.value)}
				/>
				{error && <ErrorMessage>{error}</ErrorMessage>}
				<ButtonContainer>
					<ModalButton onClick={handlePasswordResetRequest}>
						Enviar
					</ModalButton>
					<CancelButton onClick={closeRecoveryModal}>
						Cancelar
					</CancelButton>
				</ButtonContainer>
			</StyledModal>
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
	background-color: #3498db;
	border: none;
	color: white;
	font-size: 16px;
	border-radius: 5px;
	cursor: pointer;

	&:hover {
		background-color: #2980b9;
	}
`;

const StyledLink = styled.a`
	text-decoration: none;
	color: #3498db;
	cursor: pointer;
	margin-top: 10px;

	&:hover {
		text-decoration: underline;
	}
`;

const ModalTitle = styled.h2`
	margin-bottom: 1rem;
	color: #333;
	text-align: center;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	gap: 10px;
	margin-top: 1rem;
`;

const StyledModal = styled(Modal)`
	position: absolute;
	top: 50%;
	left: 50%;
	right: auto;
	bottom: auto;
	transform: translate(-50%, -50%);
	background: ${({ theme }) => theme.modalBackground};
	color: ${({ theme }) => theme.modalText};
	padding: 2rem;
	border-radius: 10px;
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
	width: 400px;
	text-align: center;
`;

const ModalButton = styled.button`
	background-color: ${({ theme }) => theme.buttonBackground};
	color: ${({ theme }) => theme.buttonText};
	padding: 10px;
	border-radius: 5px;
	cursor: pointer;
	transition: background-color 0.3s ease, color 0.3s ease;

	&:hover {
		background-color: ${({ theme }) =>
			theme.buttonBackgroundHover || theme.buttonBackground};
	}
`;

const CancelButton = styled(ModalButton)`
	background-color: #e74c3c;
	color: ${({ theme }) => theme.buttonText};

	&:hover {
		background-color: #c0392b;
	}
`;

const ErrorMessage = styled.p`
	color: red;
	font-weight: bold;
`;

export default Login;
