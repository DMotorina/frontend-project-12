import { Container, Button, Navbar } from 'react-bootstrap';
  
import { Link, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { removeCredentials } from '../../slices/usersSlice.js';
  
export const Header = () => {
  const token = useSelector((state) => state.users.token);

  const dispatch = useDispatch();

  const handeleRemoveUser = () => {
    dispatch(removeCredentials());
    localStorage.removeItem('userId');
  };

    return (
        <div className="d-flex flex-column h-100">
        <Navbar className="shadow-sm" bg="white" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
            {token ? <Button onClick={() => handeleRemoveUser()} as={Link} to="/login">Выйти</Button>
            : null}
          </Container>
        </Navbar>
        <Outlet />
      </div>
    )
}
