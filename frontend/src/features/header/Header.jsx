import { Container, Button, Navbar } from 'react-bootstrap';
  
import { Link, Outlet } from 'react-router-dom';
  
export const Header = () => {
    return (
        <div className="d-flex flex-column h-100">
        <Navbar className="shadow-sm" bg="white" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
            <Link to="/login"><Button>Выйти</Button></Link>
          </Container>
        </Navbar>
        <Outlet />
      </div>
    )
}
  