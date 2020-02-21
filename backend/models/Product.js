'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Defino el Schema

const productSchema = mongoose.Schema(
    {
        name:           {type: String, index: true},
        description:    String,
        type:           {type: String, index: true, required: true},
        price:          {type: Number, required: true},
        photo:          {type: String, required: true},
        tags:           {type: Array, index: true,},
        //Relacion con la tabla user
        user:           { type: Schema.ObjectId, ref: "User" },
    },  
    {
        /**
        * Añade las propiedades de created y updated
        */
        timestamps: true,
    }
);  


// Uso un arrow function para evitar errores en los modelos. Hay posibilidad de perder el this, asi que siempre sin arrow funct.
productSchema.statics.list = function({filter, skip, limit, fields, sort}, username){
    // const query = Product.find(filter).populate({ path: 'user', select: 'username', match: { username: username } });
    const query = Product.find(filter)
    query.skip(skip);
    query.limit(limit);
    query.select(fields);
    query.sort(sort);
    query.populate({path: 'user', select: ['email', 'username']});
    return query.exec();
};



//Defino el Product y le digo que el model tiene como nombre 'Product' para que haga la relación con la colección que tengo creada en MongoDB. 
//Ojo con la pluralización, por eso esta en singular, ya que mongoose ya
const Product = mongoose.model('Product', productSchema); 

module.exports = Product;