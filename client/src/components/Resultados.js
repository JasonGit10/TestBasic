import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import clienteAxios from '../config/axios';

const Resultados = ({match,location}) => {

    console.log(match,location);

    let query = location.search.split("=")[1];
    const [resultados,setResultados] = useState([]);

    useEffect( () => {
        const consultarAPI = () => {
            clienteAxios.get('/api/items',
            {
              params: {
                q: query
              }
            }
            )
              .then( respuesta => {
                console.log(respuesta.data);
                setResultados(respuesta.data);
              })
              .catch( error => {
                console.log(error.response.data);
                return null;
              } )
          }
        consultarAPI();
    },[]);
    
    return ( 
        <>
            <h1 className="my-5">Vista de Resultados</h1>

            <div className="container mt-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5 d-flex justify-content-center">
                        <a href="#" className="btn btn-success text-uppercase py-2 px-5 font-weight-bold">Crear Cita</a>
                    </div>
                </div>
            </div>

            {resultados.items !== undefined && resultados.items !== null && resultados.items.length > 0 &&
                <div className="col-md-8 mx-auto">
                <div className="list-group">
                    {resultados.items.slice(0,4).map( res => {
                        return <Link key={res.id} to={{pathname: `/items/${res.id}`} }><h3 className="mb-3" >{res.title}</h3></Link>
                    })}
                </div>
            </div>}
        </>
        );
}

export default Resultados;