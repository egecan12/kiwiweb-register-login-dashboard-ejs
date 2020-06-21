

const express = require('express');
const path = require('path');
const app = express();
 

require('dotenv').config();

const nodemailer = require('nodemailer');
const log = console.log;

const PORT = 8080;


var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }));
 



app.use(express.static(path.join(__dirname, "/")))

app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname + '/index.html'));

    return res.redirect('/');

    
})





app.listen(PORT, () => {

    console.log( 'server starting on PORT ', 8080);
    
} 

)



app.post('/submitForm', (req, res) => {
    // res.sendFile(path.join(__dirname + '/index.html'));



let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL ,
        pass: process.env.PASSWORD
    }
});




let mailOptions = {
    from:'hasankayaverdi@gmail.com',  
    to: 'hasankayaverdi@gmail.com',
    subject: req.body.option ,
    text:'Sender address : '+ req.body.email +" "+ 'Sender message : '+ req.body.details,

 

    

};



transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
        return log('Error occurs', err);
    }
    return log('Email sent!!!');
    
});


return res.redirect('/');

})




















