import { Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Container, Button, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import Spinner from '../spinner/Spinner';
import { removeCredentials } from '../../slices/usersSlice';

const Header = () => {
  const { token } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const location = useLocation();

  const { t } = useTranslation();

  const handeleRemoveUser = () => () => {
    dispatch(removeCredentials());
  };

  return (
    <div className="d-flex flex-column h-100">
      <Navbar className="shadow-sm" bg="white" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
          {token
            ? <Button as={Link} onClick={handeleRemoveUser()} to="/login" state={{ from: location }}>{t('buttons.exit')}</Button>
            : null}
        </Container>
      </Navbar>
      <Suspense fallback={<Spinner />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Header;
