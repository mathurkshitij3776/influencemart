import prisma from "../config/db.js";

const getusernotes =  async (req, res) =>{
const userId = req.user.id

    try{
    
      const notes = await prisma.note.findMany({
        where:{userId},
        
      })
    res.json(notes)

}
catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
};


const createnotes = async(req , res) => {
const userId = req.user.id
const {title, content} = req.body

    const data = await prisma.note.create({
       data:{
       title,
       content,
        userId
       }
})
res.json(data)

}

const updatenote = async(req, res) =>{
           const userId = req.user.id
           const id = parseInt(req.params.id);
           const {title, content} = req.body
           const checknote = await prisma.note.findFirst({
            where:{id}
           })
           if (!checknote) return res.json({message: "Note Not found"})

                try{
                 const updatenote = await prisma.note.update({
                     where:{id},
                     data:{title, content}
     
                 })
                  res.json(updatenote)
     
                }
                catch (err){
                 res.json({err: "something went wrong"})
     
                }
          
            
        }



const deletenote = async(req,res) =>{
    const id = parseInt(req.params.id);

    if (!(await prisma.note.findFirst({id}))) return res.json({"message" : "Note not found "})
    
    const deletenote =  await prisma.note.delete({
         where:{id}
  
    })
    res.json({message: "deleted successfully"})
}       

export {
  getusernotes,
  createnotes,
  updatenote,
  deletenote,
};
