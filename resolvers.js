 import { quotes, users } from './fakedb.js';

  import bcrypt from 'bcryptjs';
import UserModal from './modals/User.js';

import Jwt from 'jsonwebtoken';
import { JWT_SECRET } from './config.js';

       const resolvers = {
        Query:{
          get:()=>"hello bd",
          users:()=> users , 
          user:(p,a,c)=> users.find(user=> user._id === a._id),
          quotes:()=> quotes , 
          iquote:(p,a,c)=>{
           return quotes.filter(quote=> quote.by == a._id) 
          }
        } ,

        User:{
          quote:(parent,args,context)=>{  

  
             const _id = parent._id ; 

              return quotes.filter(quote=> quote.by === _id) ; 

        }  
       },


       Mutation:{ 
         
         singupUser:async(parent, {input},context)=>{   
                  
                       
                      


                const {firstName,lastName,email,password}=input ;


           const user = await UserModal.findOne({email}) ; 

            if(user){
              throw new Error("user already exists with that email..")
            }

            let hassPassword= await bcrypt.hash(password,10) ;  

            const newUser = await UserModal.create({
              firstName,
              lastName,
              email,
              password :hassPassword
             })

       
       console.log(newUser ) ;

             return newUser ;

         },

         singinUser:async(parent, {input},context)=>{   

          const { email,password}=input ;


     const user  = await UserModal.findOne({email}) ;  

      if(!user){
        throw new Error("User does not exist on this Email.")
      }

        
       let isMatch = await bcrypt.compare(password,user.password) ; 


             if(!isMatch){
              throw new Error("Email or Password is Mandortory ")
             }



      //  todo

         const token =   Jwt.sign({userId:user._id},JWT_SECRET)



           return {token}
          

   },

          
        

      },
        
     }

export default resolvers