import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { Doc, Id } from "./_generated/dataModel"

// export const get = query({
//     handler: async (ctx) => {
//         const identity = await ctx.auth.getUserIdentity();

//         if (!identity) {
//             throw new Error("Not authenticated")
//         }

//         const documents = await ctx.db.query("documents").collect();

//         return documents

//     }
// })

export const archive = mutation({
    args:{id:v.id("documents")},
    handler:async(ctx,args)=>{
        const identity = await ctx.auth.getUserIdentity()

        if (!identity) {
            throw new Error("Not authenitcated")
        }

        const userId = identity.subject;

        const existingDoc = await ctx.db.get(args.id)

        if(!existingDoc){
            throw new Error("Not found")
        }

        if(existingDoc.userId !==userId){
            throw new Error("Unauthorized")
        }

        const recursiveArchive = async(documentId : Id<"documents">)=>{
            
            //getting all the child id
            const children = await ctx.db
            .query("documents")
            .withIndex("by_user_parent",(q)=>(
                q.eq("userId",userId).eq("parentDocument",documentId)
            )
            )
            .collect()

            //looping over all the child and archiving them.
            for(const child of children){
                await ctx.db.patch(child._id,{
                    isArchived:true,
                })

                //recursivly calling this function on the child for archiving its children
                await recursiveArchive(child._id)
            }
        }
        
        
        const document = await ctx.db.patch(args.id,{
            isArchived:true
        });

        recursiveArchive(args.id)
        return document
    }
})

export const getSideBar = query({
    args: {
        parentDocument: v.optional(v.id("documents"))
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()

        if (!identity) {
            throw new Error("Not authenitcated")
        }

        const userId = identity.subject;

        const document = await ctx.db
            .query("documents")
            .withIndex("by_user_parent", (q) => q.eq("userId", userId).eq("parentDocument", args.parentDocument))
            .filter((q) => q.eq(q.field("isArchived"), false))
            .order("desc")
            .collect()

        return document
    }
})

export const create = mutation({
    args: {
        title: v.string(),
        parentDocument: v.optional(v.id("documents"))
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Not authenticated")
        }

        const userId = identity.subject;
        const document = await ctx.db.insert("documents", {
            title: args.title,
            parentDocument: args.parentDocument,
            userId,
            isArchived: false,
            isPublished: false
        })

        return document;
    }
})