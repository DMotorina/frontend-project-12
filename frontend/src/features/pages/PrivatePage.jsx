import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import routes from '../../utilities/routes';

const PrivatePage = ({ children }) => {
  const { token } = useSelector((state) => state.user);
  const location = useLocation();

  return (
    token ? children : <Navigate to={routes.loginPage()} state={{ from: location }} />
  );
};

export default PrivatePage;
