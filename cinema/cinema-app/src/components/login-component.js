import { useState } from 'react';
import '../App.css'
import { Button, Container, Form } from "react-bootstrap";
import axios from 'axios';


export default function Login(){
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');

    function handleLogin(event) {
        if(login && senha){
            event.preventDefault();
            axios.post('http://localhost:4000/users/login', { login : login, senha : senha }, {withCredentials : true}).then(resposta => {
                if(resposta.data.token){
                    localStorage.setItem("token", resposta.data.token);
                    localStorage.setItem("user", resposta.data.user);
                    window.location.reload();
                }else{
                    alert(resposta.data.message);
                }
            })
        }
    }

    return(

        <Container>

            <h1>Cinema App - Login</h1>

            <Form>

                <Form.Group className="mb-3" controlId="formBasicLogin">
                    <Form.Label>Login</Form.Label>
                    <Form.Control type="text" placeholder="Informe seu Login" onChange={(e)=> setLogin(e.target.value)} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>senha</Form.Label>
                    <Form.Control type="password" placeholder="Informe sua senha" onChange={(e)=> setSenha(e.target.value)} required/>
                </Form.Group>

                <Button variant="primary" type="submit" onClick={handleLogin}>
                    Entrar
                </Button>

            </Form>
        </Container>
        
    )
}