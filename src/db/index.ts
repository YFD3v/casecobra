//Josh diz que em qualquer projeto podemos utiliar esse sistema de cache


import { PrismaClient } from "@prisma/client";

declare global {
   // eslint-disable-next-line no-var
   var cachedPrisma: PrismaClient
}

 //Se não tivermos um cache, nós precisamos criar um client, mas se já tivermos um cache, vamos usar ele

let prisma: PrismaClient

if(process.env.NODE_ENV==="production"){
   prisma = new PrismaClient()
}else{
  
   if(!global.cachedPrisma){
      //Criando o client
      global.cachedPrisma = new PrismaClient()
   }
   //Já existe o client
   prisma = global.cachedPrisma
}

export const db = prisma