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

  })
} catch (error) {
  console.log(error)
}

});

module.exports = router;