

const express = require('express');
const path = require('path');
const app = express();
const expressLayouts = require('express-ejs-layouts')
const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose')


require('dotenv').config();

const nodemailer = require('nodemailer');
const log = console.log;
const User = require('./models/user')

const port = process.env.PORT || 8080;








var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()




mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to Mongo!');
    })
    .catch((err) => {
        console.error('Error connecting to Mongo', err);
    });
 
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }));
 
app.use(express.urlencoded({ extended: false }))


app.use(express.static(__dirname + '/public'));


// app.use(express.static(path.join(__dirname, "/")))

app.set('view engine', 'ejs'); 


app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname + '/index.html'));

    // return res.redirect('/');
    res.render('index'); 


    
})


app.get('/contact', (req, res) => {
    // res.sendFile(path.join(__dirname + '/index.html'));

    // return res.redirect('/');
    res.render('contact'); 


    
})

app.get('/mobileAppPrice', (req, res) => {
    // res.sendFile(path.join(__dirname + '/index.html'));

    // return res.redirect('/');
    res.render('mobileAppPrice'); 


    
})


app.get('/webdev', (req, res) => {
    // res.sendFile(path.join(__dirname + '/index.html'));

    // return res.redirect('/');
    res.render('webdev'); 


    
})

app.get('/login', (req, res) => {
    // res.sendFile(path.join(__dirname + '/index.html'));

    // return res.redirect('/');
    res.render('login'); 


    
})

app.get('/register', (req, res) => {
    // res.sendFile(path.join(__dirname + '/index.html'));

    // return res.redirect('/');
    res.render('register'); 

    console.log(req.body)
    
})

app.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];
  
    if (!name || !email || !password || !password2) {
      errors.push({ msg: 'Please enter all fields' });
    }
  
    if (password != password2) {
      errors.push({ msg: 'Passwords do not match' });
    }
  
    if (password.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' });
    }
  
    if (errors.length > 0) {
      res.render('register', {
        errors,
        name,
        email,
        password,
        password2
      });
    } else {
      User.findOne({ email: email }).then(user => {
        if (user) {
          errors.push({ msg: 'Email already exists' });
          res.render('register', {
            errors,
            name,
            email,
            password,
            password2
          });
        } else {
          const newUser = new User({
            name,
            email,
            password
          });
  
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => {
                 
                  res.redirect('/users/login');
                })
                .catch(err => console.log(err));
            });
          });
        }
      });
    }
  });


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
    from:'kiwiwebconsultancy@gmail.com',  
    to: 'kiwiwebconsultancy@gmail.com',
    subject: req.body.option ,
    text:'Sender address : '+ req.body.email +" Sender phone number: "+ req.body.phone +' Sender message : '+ req.body.details,

 

    

};



transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
        return log('Error occurs', err);
    }
    return log('Email sent!!!');
    
});


return res.redirect('/');

})





app.listen(port, () => {

    console.log( 'server starting on PORT ', 8080);
    
} 

)















