const { log } = require('console');
const { Post,User } = require('../models')
const jwt=require('jsonwebtoken')
exports.getPosts = async (req, res) => {
    const {cat}=req.query;
   let response;
   try {
      if(cat){
      response=await Post.findAll({where:{cat}});
      return res.status(200).json({ data: response });

      }else{
      response = await Post.findAll();
      // response = await Post.create({uuid:1,title:"dfcsadf",desc:"dsfnkdkdf",img:"new image"});
      return res.status(200).json({ data: response });

      }

     
   } catch (error) {
      console.log('error', error)
   }
}
exports.getPost = async (req, res) => {
   console.log('hello----------------------------------------------------',)
   const { id } = req.params;
   const post =await Post.findOne({
      where: { id },raw:true,nest:true,
      attributes: ['id', 'title', 'desc', 'img', 'cat', ],
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'img'],
        },
      ],
    });
    console.log('post', post)
    if (post){
         return res.status(200).json({
            data:post
         })
    }else{
      return res.status(403).json("No data")
    }
   //    const post = await User.findAll({
   //    where: { id: id }, include: [
   //       {
   //          model: Post
   //       }
   //    ]
   // })
   
}
exports.addPost = async (req, res) => {

   const token=  req.body.token || req.query.token || req.headers["access_token"] || req?.cookies?.access_token;
  const { title,desc,img,cat,date,uuid}=req?.body;
  try{
   if(!token){
      return res.status(401).json({
         error:"Not authenticated"

      })
   }  
   jwt?.verify(token,process?.env?.SECRET_TOKEN,async(err,user)=>{
      if(err){
         return res.status(500).json({error:"Token is invalid"})
      }else{
       try {
         const post= await Post.create({title,desc,img,cat,date,uuid:user?.id})
         console.log('post', post)
          return res.json("Post has been created.");
       } catch (error) {
         log(error)
       }
      }
    })
   }catch(e){
      console.log('e', e)
   }


    


}
exports.deletePost = async (req, res) => {
   const { id } = req.params;
   if(!token){
      return res.status(401).json({
         error:"Not authenticated"

      })
   }  
   jwt?.verify(token,process?.env?.SECRET_TOKEN,async(err,user)=>{
      if(err){
         return res.status(500).json({error:"Token is invalid"})
      }else{
         
      }
   });

}
exports.updatePost = async (req, res) => {

}