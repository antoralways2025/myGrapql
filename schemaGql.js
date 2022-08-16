
import { gql } from 'apollo-server';

const typeDefs=gql`

type Query{
  get:String
   users:[User]
   user(_id:ID):User
 
   quotes:[Quote] 
   iquote(_id:ID!):[Quote] 
}

type token{
  token:String
}

type  Mutation{
  singupUser(input:createUserInput!):User
  singinUser(input:singInUserInput!): token
}


input singInUserInput{
  email:String ,
  password:String 
}

input createUserInput{
firstName:String
lastName:String
 email:String
password:String 

}

type Quote{
  name:String
  by:ID
}

type User{
_id:ID
firstName:String
lastName:String
 email:String
password:String 
quote:[Quote!]
}

   `
export default typeDefs