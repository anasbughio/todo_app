const todo = require(`../Models/todoSchema`);


const getTodo  = async(req,res)=>{
    try {
       const todos = await todo.find();
       res.status(200).json(todos); 
    } catch (error) {
        res.status(500).json({message:error.message});   
    }
}

const createTodo = async (req,res)=>{
    const newTodo = new todo(req.body);
    try {
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}


const updateTodo  =  async (req,res)=>{
 
  try {
    const updateTodo =  await todo.findByIdAndUpdate(req.params.id,req.body,{
        new:true,})
            res.status(200).json(updateTodo);
  } catch (error) {
    res.status(500).json({message:error.message});
  }
}

  const deleteTodo =  async(req,res)=>{
  try {
    await todo.findByIdAndDelete(req.params.id);
    res.status(200).json({message:"Todo deleted successfully"});
  } catch (error) {
    res.status(500).json({message:error.message});
  }
  }

  module.exports =  {getTodo,createTodo,updateTodo,deleteTodo};