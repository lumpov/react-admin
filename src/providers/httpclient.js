import { fetchUtils } from 'react-admin';

const httpClient = (url, options = {}) => {
	//console.log('httpclient:', { url, options });
	if (!options.headers)
		options.headers = new Headers({
			Accept: 'application/json',
		});
	else options.headers.set('Accept', 'application/json');

	options.headers.set(
		'Authorization',
		`Bearer ${localStorage.getItem('token')}`,
	);

	return fetchUtils.fetchJson(url, options);
};

export default httpClient;
