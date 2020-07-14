

const express = require('express');
const path = require('path');
const app = express();
const expressLayouts = require('express-ejs-layouts')
const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose')
const flash = require('connect-flash');
const session = require('express-session');
const User = require('./models/user')
const nodemailer = require('nodemailer');
const Messages = require('./models/messages')




require('dotenv').config();

// Passport Config
require('./config/passport')(passport);

const log = console.log;

const port = process.env.PORT || 8000;


var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()




// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );

  // Passport middleware
app.use(passport.initialize());
app.use(passport.session());
// Connect flash
app.use(flash());


// Global variables 
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });
  




//db connection
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
    res.render('login',{ role: req.body.role}); 


    
})




// Login handle
app.post('/login', (req, res, next) => {

  const user = req.body

  console.log(user.email)
  console.log(user.role)


  if (user.role === "admin") {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/login',
      failureFlash: true
      
    })(req, res, next);
  }
  else{
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/login',
      failureFlash: true
      
    })(req, res, next);
  }



});
// Logout handle
app.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/login');
});

app.get('/register', (req, res) => {

    res.render('register'); 

    console.log(req.body)
    
});



app.post('/register', (req, res, next) => {
    const { name, email, password, password2, role } = req.body;
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
        password2,
        role
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
            password2,
            role
          });
        } else {
          const newUser = new User({
            name,
            email,
            password,
            role:req.body.role
          });
  
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => {
                    req.flash(
                        'success_msg',
                        'You are now registered and can log in'
                      );
                  res.redirect('/login');
                })
                .catch(err => console.log(err));
            });
          });
        }
      });
    }
  });

// to submit the form that on the contact page
app.post('/submitForm', async (req, res, next) => {
	const newMessage = new Messages({
		email: req.body.email,
		phone: req.body.phone,
    option: req.body.option,
    details: req.body.details
	});
	await newMessage.save();






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

req.flash('success_msg', 'Your message has been sent succesfully');

return res.redirect('/contact');


})


// Routes
app.use('/', require('./routes/index.js'));


app.listen(port, () => {

    console.log( 'server starting on PORT ', 8000);
    
} 

)















