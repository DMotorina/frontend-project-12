import { Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import { setCredentials } from '../../slices/usersSlice';

export const PrivateOutlet = ({children}) => {
    const authData = JSON.parse(localStorage.getItem('userId'));
    const dispatch = useDispatch();
  
    if (authData) {
      dispatch(setCredentials(authData));
      return children
    }

    return (
      <Navigate to="/login" />
    );
};