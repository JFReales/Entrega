import axios from 'axios';
import { SET_SORT_CONFIG, SET_INVOICES } from './types';

export const setSortConfig = (key) => (dispatch, getState) => {
	const { sortConfig } = getState().invoice;
	let direction = 'ascending';

	if (sortConfig.key === key && sortConfig.direction === 'ascending') {
		direction = 'descending';
	}

	dispatch({
		type: SET_SORT_CONFIG,
		payload: { key, direction },
	});
};

export const fetchInvoices = () => async (dispatch) => {
	try {
		const response = await axios.get('http://localhost:5000/api/invoices');
		dispatch({
			type: SET_INVOICES,
			payload: response.data,
		});
	} catch (error) {
		console.error('Error al obtener las facturas:', error);
	}
};
