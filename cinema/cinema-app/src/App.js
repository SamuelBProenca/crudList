import 'bootstrap/dist/css/bootstrap.min.css';
import'bootstrap/dist/js/bootstrap.bundle.js';
import Lista from './components/list-component';
import Formulario from './components/form-component';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Container, Nav, Navbar, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import Login from './components/login-component';
import axios from 'axios';

function App() {

  const user = localStorage.getItem('user');
  
  const token = localStorage.getItem("token");
  if(!token || !user)
    return <Login />
  

  function handleLogout(){
    axios.post('http://localhost:4000/users/logout',{token:token}, {withCredentials:true}).then(resposta=> {
      if(resposta.status === 200) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.reload();
      }
    })
  }

  return (
    <div className="App">
      
      
        <Navbar bg="dark" data-bs-theme="dark" collapseOnSelect expand="lg">
          <Container>
            <Navbar.Brand href="/listar" id='colorB'>Cinema APP</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
              
                <LinkContainer to='/listar'>
                  <Nav.Link >Listar</Nav.Link>
                </LinkContainer>

                <LinkContainer to='/Adicionar'>
                  <Nav.Link >Adicionar</Nav.Link>
                </LinkContainer>
              
              </Nav>
              
              <Navbar.Text>
                {/* Signed in as: <a href="#login">{user}</a> */}
                <a href="#login">{user}</a>
              </Navbar.Text>
              <i className="bi bi-box-arrow-right exit" title='clique aqui para sair do sistema' onClick={handleLogout}></i>
            
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container>
          <Row className="justify-content-md-center">
            <Routes>
              <Route path="/" element={ <Lista /> }></Route>
              <Route path="/Listar" element={ <Lista /> }></Route>
              <Route path="/Adicionar" element={ <Formulario /> }></Route>
              <Route path="/editar/:id" element={<Formulario />}></Route>
            </Routes>
          </Row>
        </Container>
      
      
    </div>
  );
}

export default App;
