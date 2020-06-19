const express = require('express');
const path = require('path');
const app = express();

const PORT = 8080;



require('dotenv').config();

const nodemailer = require('nodemailer');
const log = console.log;

app.use(express.static(path.join(__dirname, "/")))

app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname + '/index.html'));

    return res.redirect('/');
})


app.listen(PORT, () => {

    console.log( 'server starting on PORT ', 8080)
} 

)



let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL ,
        pass: process.env.PASSWORD
    }
});




let mailOptions = {
    from: 'hasankayaverdi@gmail.com', 
    to: 'egecan18k@gmail.com',
    subject: 'Nodemailer - Test',
    text: 'Wooohooo it works!!'
};



transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
        return log('Error occurs', err);
    }
    return log('Email sent!!!');
});
