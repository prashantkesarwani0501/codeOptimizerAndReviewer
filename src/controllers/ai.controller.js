const aiservices=require("../services/ai.services");




module.exports.getReview= async (req,res)=>{
  const code=req.body.code;

  if(!code){
    return res.status(400).send("prompt is required");
  }
  const response=await aiservices(code);

  res.send(response);
}