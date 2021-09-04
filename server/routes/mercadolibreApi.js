const express = require('express');

const axios = require('axios');

const app = express();

const getProductInfo = id => {

    return new Promise((resolve, reject) => {

        axios.get(`${process.env.ML_BASE_URL}/items/${id}`)
        .then(function (response) {
            resolve(response.data);
        })
        .catch(function (error) {
            reject(error.response.data);
        })

    });

}

const getProductDescription = id => {

    return new Promise((resolve, reject) => {

        axios.get(`${process.env.ML_BASE_URL}/items/${id}/description`)
        .then(function (response) {
            resolve(response.data);
        })
        .catch(function (error) {
            reject(error.response.data);
        })

    });

}

const getSearchResults = query => {

    return new Promise((resolve, reject) => {

        axios.get(`${process.env.ML_BASE_URL}/sites/MLA/search`,
        {
            params:{
                q: query
            }
        })
        .then(function (response) {
            resolve(response.data);
        })
        .catch(function (error) {
            reject(error.response.data);
        })

    });

}

app.get('/api/items', async(req, res) => {

    let {q} = req.query;

    try {
        var result = await getSearchResults(q);
    } catch(error){
        res.status(400).send({
            error
        })
    }
    
    if( result.filters !== undefined && result.filters.length > 0 ){
        var categories = result.filters[0].values[0].path_from_root.map( item => {
            let category = item.name;
            return category;
        });
    }
    

    let items = result.results.map( item => {
        let newItem = {
            id: item.id,
            title: item.title,
            price:{
                currency: item.currency_id,
                amount: item.price,
                decimals: 2
            },
            picture: item.thumbnail,
            condition: item.condition,
            free_shipping: item.free_shipping
        };
        return newItem;
    });

    res.send({
        categories,
        items
    });
  
  });

  app.get('/api/items/:id', async (req, res) => {

    let {id} = req.params;

    try {
        var [infoResult, descResult] = await Promise.all([getProductInfo(id), getProductDescription(id)]);
    } catch(error){

        res.status(400).send({
            error
        })
    }

    let item = {
        id: infoResult.id,
        title: infoResult.title,
        price:{
            currency: infoResult.currency_id,
            amount: infoResult.price,
            decimals: 2
        },
        picture: infoResult.pictures[0].url,
        condition: infoResult.condition,
        free_shipping: infoResult.free_shipping,
        sold_quantity: infoResult.sold_quantity,
        description: descResult.plain_text
    };
    

    res.send({
        item
    });
  
  
  });

  module.exports = app;