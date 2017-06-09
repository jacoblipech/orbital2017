//import sassMiddleware from 'node-sass-middleware';
//import path from 'path';

import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import passportLocal from 'passport-local';
import express from 'express';
const server = express();

// server.use(sassMiddleware({
//   // a src folder to get the sass file from 
//   src: path.join(__dirname, 'sass'),
//   dest: path.join(__dirname, 'public'),
//   // a destination to write the css file to
//   // if you write it to public, in header.ejs the href will
//   // simply be "style.css"
// }));

mongoose.connect("mongodb://localhost/nusgt");
server.use(bodyParser.urlencoded({extended: true}));
server.set('view engine', 'ejs');
server.use(express.static(__dirname + "/public"));

server.get('/', (req,res) => {
	  res.render('index');
});

// server.use('/api', apiRouter);
// server.use(express.static('public'));

server.get('/login', (req, res)=>{
	res.send('this is an login page');
});

server.listen(3000, () => {
  console.info('Status: Online');
});