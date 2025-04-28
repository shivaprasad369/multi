import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Category } from '../../../../payload-types'
import { getPayload } from 'payload'
import configPromise from '../../../../payload.config'
export const categoriesRouter=createTRPCRouter({

    getMany:baseProcedure.query(async({ctx})=>{
 
     const data = await ctx.db.find({
            collection: "categories",
            depth: 1,
            pagination:false,
           sort: "name",
           
        
            where: {
              parent: {
                exists: false,
              },
            },
          })

          const formatedData = data.docs.map((doc) => ({
            ...doc,
            subCategories:(doc.subcategories?.docs?? []).map((doc:any)=>({
              ...(doc as Category),
              subcategories:undefined
            }))
          }))
        return formatedData;
    }),
});