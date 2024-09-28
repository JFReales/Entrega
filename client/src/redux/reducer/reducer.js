import { SET_SORT_CONFIG, SET_INVOICES } from '../types/invoiceTypes';

const initialState = {
	invoices: [],
	sortConfig: { key: 'idInvoice', direction: 'ascending' },
};

const sortInvoices = (invoices, sortConfig) => {
	return [...invoices].sort((a, b) => {
		if (a[sortConfig.key] < b[sortConfig.key]) {
			return sortConfig.direction === 'ascending' ? -1 : 1;
		}
		if (a[sortConfig.key] > b[sortConfig.key]) {
			return sortConfig.direction === 'ascending' ? 1 : -1;
		}
		return 0;
	});
};

const invoiceReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_SORT_CONFIG:
			return {
				...state,
				sortConfig: action.payload,
				invoices: sortInvoices(state.invoices, action.payload),
			};

		case SET_INVOICES:
			return {
				...state,
				invoices: sortInvoices(action.payload, state.sortConfig),
			};

		default:
			return state;
	}
};

export default invoiceReducer;
