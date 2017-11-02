const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
//MODELS // 


const Article = require('./Article');

// ROUTES //


module.exports = (app) => {

    app.get('/', (request,response)=>{
        response.send(__dirname + '/public/index.html');
    })

    app.get('/api/', (request,response)=>{
        Article.find({})
        .exec((err, doc)=>{
            err? console.log(err): response.json(doc);
        })
    })

    app.post('/api/saved', (request, response)=>{
        let title = request.body.title;
        let link = request.body.link;
         Article.findOneAndUpdate(
            {title: title},
            { $set: {link: link} }, 
            { upsert: true }
        ).exec( (err) =>{
             err ? console.log(err) : console.log('SAVED!!');
        });
    })
    
 }

 


