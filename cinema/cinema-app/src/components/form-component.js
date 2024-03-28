import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

export default function Formulario() {
    const [titulo,setTitulo] = useState('');
    const [ano,setAno] = useState(0);
    const {id} = useParams();
    const navigate = useNavigate();

    const anoAtual = new Date().getFullYear();
    let anos = [];
    for(let i=anoAtual; i>=1900; i--)
        anos.push(<option value={i} key={i}>{i}</option>)

    function handleSalvar(e){
        if (titulo && ano){
            e.preventDefault();
            if(id){
                axios.put(`http://localhost:4000/editar/${id}`, {'titulo' : titulo, 'ano' : ano}).then((resposta)=> alert(resposta.data.message))
            }else{
                axios.post('http://localhost:4000/adicionar', {'titulo' : titulo, 'ano' : ano}).then((resposta)=> alert(resposta.data.message));
            }
            navigate('/listar');
        }
    }

    useEffect(()=>{
        if(id){
            axios.get(`http://localhost:4000/editar/${id}`).then(resposta =>{
                
                if(resposta.data){
                    setTitulo(resposta.data.titulo);
                    setAno(parseInt(resposta.data.ano));
                }else{
                    alert('Registro não encontrado.');
                    navigate('/listar');
                }
            })
        }else {
            setTitulo('');
            setAno('');
        }
    },[id, navigate])

    return(
        <>
            <h1>{ id ? `Editar "${titulo}"` : 'Novo Filme e Série' }</h1>
            
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Título</Form.Label>
                    <Form.Control type="text" placeholder="Informe o Título do Filme|Série" onChange={(e)=> setTitulo(e.target.value)} value={titulo} required />
                </Form.Group>

                <Form.Group className="mb-3">
                <Form.Label>Ano</Form.Label>
                <Form.Select onChange={(e)=>setAno(e.target.value)} value={ano} required>
                    <option value="">--Escolha um Ano--</option>
                    {anos}
                </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Button variant='primary' type="submit" onClick={handleSalvar}>
                    Salvar
                    </Button>
                </Form.Group>

            </Form>
        </>
    );
}