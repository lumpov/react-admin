//import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

//const httpClient = fetchUtils.fetchJson;
import httpClient from './httpclient';

const apiUrl = 'https://jsonplaceholder.typicode.com';

// eslint-disable-next-line
export default {
	getList: async (resource, params) => {
		const { page, perPage } = params.pagination;
		const { field, order } = params.sort;

		const query = {
			sort: JSON.stringify([field, order]),
			range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
			filter: JSON.stringify(params.filter),
			meta: JSON.stringify(params.meta),
		};

		const url = `${apiUrl}/${resource}?${stringify(query)}`;

		return httpClient(url).then(({ headers, json }) => {
			//console.log('json:', JSON.stringify(json, null, 4));

			return {
				data: json,
				total: 10,
			};
		}).catch(e => {
			return Promise.reject({message:`status:${e.status} ${e.message || 'no message from API'}`});
		});
	},

	getOne: (resource, params) =>
		httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
			data: json,
		})),

	getMany: (resource, params) => {
		const query = {
			filter: JSON.stringify({ ids: params.ids }),
		};
		const url = `${apiUrl}/${resource}?${stringify(query)}`;
		return httpClient(url).then(({ json }) => ({ data: json }));
	},

	getManyReference: (resource, params) => {
		const { page, perPage } = params.pagination;
		const { field, order } = params.sort;
		const query = {
			sort: JSON.stringify([field, order]),
			range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
			filter: JSON.stringify({
				...params.filter,
				[params.target]: params.id,
			}),
		};
		const url = `${apiUrl}/${resource}?${stringify(query)}`;

		return httpClient(url).then(({ headers, json }) => ({
			data: json,
			total: parseInt(headers.get('content-range').split('/').pop(), 10),
		}));
	},

	create: (resource, params) =>
		httpClient(`${apiUrl}/${resource}`, {
			method: 'POST',
			body: JSON.stringify(params.data),
		}).then(({ json }) => ({
			data: { ...params.data, id: json.id },
		})),

	update: (resource, params) =>
		httpClient(`${apiUrl}/${resource}/${params.id}`, {
			method: 'PUT',
			body: JSON.stringify(params.data),
		}).then(({ json }) => ({ data: json })),

	updateMany: (resource, params) => {
		const query = {
			filter: JSON.stringify({ id: params.ids }),
		};
		return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
			method: 'PUT',
			body: JSON.stringify(params.data),
		}).then(({ json }) => ({ data: json }));
	},

	delete: (resource, params) =>
		httpClient(`${apiUrl}/${resource}/${params.id}`, {
			method: 'DELETE',
		}).then(({ json }) => ({ data: json })),

	deleteMany: (resource, params) => {
		const query = {
			filter: JSON.stringify({ id: params.ids }),
		};
		return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
			method: 'DELETE',
			body: JSON.stringify(params.data),
		}).then(({ json }) => ({ data: json }));
	},
};
