const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const Message = require('../models/messages')


// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));


// Dashboard    
router.get('/dashboard', ensureAuthenticated, async (req, res) =>{
try {
  
  const messages = await Message.find()

  res.render('dashboard', {
    user: req.user,
    messages:messages,
    id: req.params.id


  })
  console.log(messages)


} catch (error) {
  console.log(error)
}


router.get('/delete/:id', (req,res)=>{
  let id = req.params.id;
  Message.remove({_id: id}, (err, tareas)=>{
      if(err){console.log(err);}
      
      console.log("deleted")
      res.redirect('/dashboard');
  });
});


 });
module.exports = router;