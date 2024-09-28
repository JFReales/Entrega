import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const InvoiceList = () => {
	const [invoices, setInvoices] = useState([]);
	const [user, setUser] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [sortConfig, setSortConfig] = useState({
		key: 'idInvoice',
		direction: 'ascending',
	});
	const navigate = useNavigate();

	useEffect(() => {
		const storedUser = JSON.parse(localStorage.getItem('user'));
		if (storedUser) {
			setUser(storedUser);
		} else {
			navigate('/login');
		}

		const fetchInvoices = async () => {
			try {
				const response = await axios.get(
					'http://localhost:5000/invoices'
				);
				setInvoices(response.data);
			} catch (error) {
				console.error('Error al obtener las facturas:', error);
			}
		};

		fetchInvoices();
	}, [navigate]);

	const sortedInvoices = () => {
		let sortedArray = [...invoices];
		sortedArray.sort((a, b) => {
			if (a[sortConfig.key] < b[sortConfig.key]) {
				return sortConfig.direction === 'ascending' ? -1 : 1;
			}
			if (a[sortConfig.key] > b[sortConfig.key]) {
				return sortConfig.direction === 'ascending' ? 1 : -1;
			}
			return 0;
		});
		return sortedArray;
	};

	const requestSort = (key) => {
		let direction = 'ascending';
		if (sortConfig.key === key && sortConfig.direction === 'ascending') {
			direction = 'descending';
		}
		setSortConfig({ key, direction });
	};

	const handleLogout = () => {
		localStorage.removeItem('user');
		navigate('/');
	};

	const filteredInvoices = sortedInvoices().filter((invoice) => {
		if (!searchQuery) return true;

		const clientMatches = invoice.client
			.toLowerCase()
			.startsWith(searchQuery.toLowerCase());
		const idMatches = invoice.idInvoice
			.toString()
			.startsWith(searchQuery.trim());
		const totalMatches = invoice.total
			.toString()
			.startsWith(searchQuery.trim());

		return clientMatches || idMatches || totalMatches;
	});

	const getSortIcons = (key) => {
		if (sortConfig.key === key) {
			return sortConfig.direction === 'ascending' ? '🔼' : '🔽';
		}
		return '🔼🔽';
	};

	return (
		<Container>
			<Header>
				<Title>
					Lista de Facturas de {user ? user.name : 'Usuario'}
				</Title>
				<ButtonGroup>
					<StyledButton onClick={handleLogout}>
						Cerrar Sesión
					</StyledButton>
				</ButtonGroup>
			</Header>
			<SearchInput
				type='text'
				placeholder='Buscar por cliente, ID o total...'
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
			/>

			<StyledTable>
				<thead>
					<tr>
						<SortableHeader
							onClick={() => requestSort('idInvoice')}
						>
							ID Factura {getSortIcons('idInvoice')}
						</SortableHeader>
						<SortableHeader onClick={() => requestSort('client')}>
							Cliente {getSortIcons('client')}
						</SortableHeader>
						<SortableHeader onClick={() => requestSort('total')}>
							Total {getSortIcons('total')}
						</SortableHeader>
						<SortableHeader onClick={() => requestSort('date')}>
							Fecha {getSortIcons('date')}
						</SortableHeader>
					</tr>
				</thead>
				<tbody>
					{filteredInvoices.map((invoice) => (
						<tr key={invoice.idInvoice}>
							<td>{invoice.idInvoice}</td>
							<td>{invoice.client}</td>
							<td>{invoice.total}</td>
							<td>
								{new Date(invoice.date).toLocaleDateString()}
							</td>
						</tr>
					))}
				</tbody>
			</StyledTable>
		</Container>
	);
};

const Container = styled.div`
	width: 80%;
	margin: 0 auto;
	padding: 20px;
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const SearchInput = styled.input`
	padding: 10px;
	width: 100%;
	border-radius: 5px;
	border: 1px solid #ddd;
	margin-bottom: 20px;
	box-sizing: border-box;
`;

const Title = styled.h2`
	margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
	display: flex;
	gap: 10px;
`;

const StyledButton = styled.button`
	padding: 10px 15px;
	background-color: #3498db;
	border: none;
	color: white;
	border-radius: 5px;
	cursor: pointer;

	&:hover {
		background-color: #2980b9;
	}
`;

const StyledTable = styled.table`
	width: 100%;
	border-collapse: collapse;

	th,
	td {
		border: 1px solid #ddd;
		padding: 8px;
	}

	th {
		background-color: #3498db;
		color: white;
		text-align: center;
	}

	td {
		text-align: center;
	}
`;

const SortableHeader = styled.th`
	cursor: pointer;
	background-color: #3498db;
	color: white;
	padding: 8px;
	&:hover {
		background-color: #2980b9;
	}
`;

export default InvoiceList;
