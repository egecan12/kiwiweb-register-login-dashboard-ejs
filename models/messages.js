  
const mongoose = require('mongoose');

const MessagesSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
      },
      phone: {
        type: String,
        required: true
      },
      option: {
        type: String,
        enum:['Web Development', 'Mobile Development', 'SEO', 'E-commerce', 'Pc Application' ],
        required: true
      },  
      details: {
        type: String,
        required: true

      }
});

const Messages = mongoose.model('Messages',  MessagesSchema );

module.exports = Messages;