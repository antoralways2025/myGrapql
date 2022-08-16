import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import mongoose from 'mongoose';
import { MONGO_URL } from './config.js';
import resolvers from './resolvers.js';
import schemaGql from './schemaGql.js';

  mongoose.connect(MONGO_URL,{
     useNewUrlParser:true,
     useUnifiedTopology : true
 })


  mongoose.connection.on("connected",()=>console.log("Connected to mongodb")) 
  mongoose.connection.on(" error ",(err)=> console.log("err connectin ",err)) ;



  // import modal here 




 const server = new ApolloServer({ 
  typeDefs:schemaGql,
   resolvers,
   plugins:[
    ApolloServerPluginLandingPageGraphQLPlayground()
   ]

 });


 server.listen().then(({url})=> console.log(` server is runing at ${url} ` ))