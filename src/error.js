import * as React from 'react';
import { useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import ErrorIcon from '@mui/icons-material/Report';
import History from '@mui/icons-material/History';
import { Title, useTranslate } from 'react-admin';
import { useLocation } from 'react-router-dom';

export const MyError = ({ error, errorInfo, resetErrorBoundary, ...rest }) => {
	const { pathname } = useLocation();
	const originalPathname = useRef(pathname);

	// Effect that resets the error state whenever the location changes
	useEffect(() => {
		if (pathname !== originalPathname.current) {
			resetErrorBoundary();
		}
	}, [pathname, resetErrorBoundary]);

	const translate = useTranslate();

	return (
		<div>
			<Title title="Error" />
			<h1>
				<ErrorIcon /> Only this errors catched
			</h1>
			<div>
				A client error occurred and your request couldn not be
				completed.
			</div>
			{process.env.NODE_ENV !== 'production' && (
				<details>
					<h2>{JSON.stringify(error)}</h2>
					<p>{error?.code}</p>
					{errorInfo?.componentStack}
				</details>
			)}
			<div>
				<Button
					variant="contained"
					startIcon={<History />}
				>
					Back
				</Button>
			</div>
		</div>
	);
};
