import { useEffect, useState } from 'react';
import axios from 'axios';
import {Table} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Lista() {
    
    const [ lista, setLista ] = useState([]);

    function listar(){
        axios.get('http://localhost:4000/listar').then(resposta => setLista(resposta.data));
    }

    useEffect(()=>{
        listar()
    },[]);

    function handleRemove(e) {
        let confirm = window.confirm('Deseja realmente excluir este registro?');

        if(confirm){
            axios.delete(`http://localhost:4000/remover/${e.target.getAttribute('data-id')}`).then(resposta => {
                alert(resposta.data.message);
                listar();
            } 
        )}
    }

    return(
        <>
            <h1>Listagem de Filmes e Séries</h1>

            <Table id='tabela' striped bordered hover variant='dark' responsive>

                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Ano de Lançamento</th>
                        <th colSpan={2}>Opções</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        lista.map(itemLista => {
                            return(
                                <tr key={itemLista._id}>
                                    <td>{itemLista.titulo}</td>
                                    <td>{itemLista.ano}</td>
                                    <td>
                                        <Link to={`/editar/${itemLista._id}`}>
                                            <i className="bi bi-pencil-square" id='edit'></i>
                                        </Link>
                                    </td>
                                    <td><i className="bi bi-x-circle-fill" data-id={itemLista._id} onClick={handleRemove} id='exclude'></i></td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            
            </Table>
        </>
    );
}