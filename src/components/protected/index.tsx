import {Navigate, Outlet } from 'react-router-dom';

import { useLocalStorage } from '../../hooks';
import { DEFAULT_DATA } from '../../constants';

const Protected = () => {
	const { value } = useLocalStorage<StoredData>('data', DEFAULT_DATA);
	return (
    value && value.user ? <Outlet/> : <Navigate to="/"/>
  );
};

export default Protected;
