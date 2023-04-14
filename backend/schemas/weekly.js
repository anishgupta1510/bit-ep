import { defineField , defineType } from 'sanity'

export default defineType({
    name:'weekly',
    title:'Weekly',
    type:'document',
    fields:[
        defineField({
            name:'week_no',
            title:'Week_number',
            type:'string',
        })
        ,
        defineField({
            name:'image',
            title:'Image',
            type:'image',
            options:{
                hotspot:true,
            },
        }),
        defineField({
            name:'description',
            title:'Description',
            type:'blockContent',
        }),
    ],
    preview:{
        select:{
            title:'week_no',
            media:'image',
        }
    }
})
