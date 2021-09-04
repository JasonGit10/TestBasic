import React, { useEffect, useState } from 'react';

import clienteAxios from '../config/axios';

const Detalle = ({match,location}) => {

    console.log(match,location);

    let id = match.params.id;
    console.log(`Id de producto: ${id}`);

    const [infoProducto,setInfoProducto] = useState([]);

    useEffect( () => {
        const consultarAPI = () => {
            clienteAxios.get(`/api/items/${id}`)
              .then( respuesta => {
                console.log(respuesta.data);
                setInfoProducto(respuesta.data);
              })
              .catch( error => {
                console.log(error.response.data);
                return null;
              } )
          }
        consultarAPI();
    },[]);

    return ( <>
                <h1 className="my-5">Vista de Detalle</h1> 
            </>
            )
            
}

export default Detalle;